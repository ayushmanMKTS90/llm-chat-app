function showPromptModal(prompt, imageUrl, styleLabel) {
  if (document.getElementById('prompt-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'prompt-overlay';
  overlay.innerHTML = `
    <div class="prompt-modal">
      <div class="prompt-header">
        <h3>${styleLabel || 'Generated'} Prompt</h3>
        <button class="close-btn">&times;</button>
      </div>
      <div class="prompt-image-container">
        <img src="${imageUrl}" alt="Source image" class="prompt-source-image">
      </div>
      <textarea class="prompt-textarea" readonly>${prompt}</textarea>
      <div class="prompt-actions">
        <button class="copy-btn">Copy to Clipboard</button>
        <button class="save-btn">Save Prompt</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('.close-btn').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  overlay.querySelector('.copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(prompt);
    showToast('Copied to clipboard!');
  });

  overlay.querySelector('.save-btn').addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'savePrompt', prompt, imageUrl });
    showToast('Prompt saved!');
  });
}

function showToast(message) {
  const existing = document.querySelector('.prompt-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'prompt-toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}