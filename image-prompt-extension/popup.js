document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveApiKey');
  const statusEl = document.getElementById('apiStatus');
  const styleSelect = document.getElementById('styleSelect');
  const savedPromptsEl = document.getElementById('savedPrompts');
  const clearBtn = document.getElementById('clearAll');
  const testBtn = document.getElementById('testApi');
  const testResult = document.getElementById('testResult');

  chrome.storage.sync.get(['apiKey', 'style'], (result) => {
    if (result.apiKey) apiKeyInput.value = result.apiKey;
    if (result.style) styleSelect.value = result.style;
  });

  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    const style = styleSelect.value;
    if (!apiKey) { showStatus('Enter an API key', 'error'); return; }
    chrome.storage.sync.set({ apiKey, style }, () => showStatus('Saved', 'success'));
  });

  styleSelect.addEventListener('change', () => {
    chrome.storage.sync.set({ style: styleSelect.value });
  });

  testBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim() || (await getApiKey());
    if (!apiKey) { showTestResult('No API key', true); return; }
    testBtn.disabled = true;
    testBtn.textContent = 'Testing...';
    try {
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'meta/llama-3.2-11b-vision-instruct',
          messages: [{ role: 'user', content: [{ type: 'text', text: 'reply ok' }] }],
          max_tokens: 10
        })
      });
      if (response.ok) showTestResult('API key valid!', false);
      else {
        const err = await response.json().catch(() => ({}));
        showTestResult(`Error: ${err.error?.message || err.message || response.status}`, true);
      }
    } catch (e) {
      showTestResult(`Network error: ${e.message}`, true);
    }
    testBtn.disabled = false;
    testBtn.textContent = 'Test API Connection';
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Delete all saved prompts?'))
      chrome.storage.sync.set({ savedPrompts: [] }, loadSavedPrompts);
  });

  loadSavedPrompts();

  function getApiKey() { return new Promise(r => chrome.storage.sync.get('apiKey', result => r(result.apiKey))); }

  function loadSavedPrompts() {
    chrome.storage.sync.get('savedPrompts', (result) => {
      const prompts = result.savedPrompts || [];
      if (!prompts.length) { savedPromptsEl.innerHTML = '<p class="empty">No saved prompts yet</p>'; return; }
      savedPromptsEl.innerHTML = prompts.map((item, index) => `
        <div class="prompt-item">
          <img src="${item.imageUrl}" alt="" class="prompt-thumb">
          <div class="prompt-content">
            <textarea readonly>${item.prompt}</textarea>
            <div class="prompt-actions">
              <button class="copy-btn" data-index="${index}">Copy</button>
              <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
            <span class="prompt-date">${new Date(item.date).toLocaleDateString()}</span>
          </div>
        </div>
      `).join('');
      savedPromptsEl.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          navigator.clipboard.writeText(prompts[parseInt(e.target.dataset.index)].prompt);
          showToast('Copied!');
        });
      });
      savedPromptsEl.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.dataset.index);
          prompts.splice(idx, 1);
          chrome.storage.sync.set({ savedPrompts: prompts }, loadSavedPrompts);
        });
      });
    });
  }

  function showStatus(m, t) { statusEl.textContent = m; statusEl.className = 'status ' + t; }
  function showTestResult(m, isError) {
    testResult.textContent = m;
    testResult.className = 'test-result' + (isError ? ' error' : ' success');
  }
  function showToast(m) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = m;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1500);
  }
});