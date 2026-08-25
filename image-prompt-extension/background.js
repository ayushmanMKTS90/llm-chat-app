chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'generatePrompt',
    title: 'Generate Prompt for This Image',
    contexts: ['image']
  });
});

const STYLE_PRESETS = {
  photorealistic: {
    label: 'Photorealistic',
    models: ['meta/llama-3.2-90b-vision-instruct', 'meta/llama-3.2-11b-vision-instruct'],
    prompt: 'You are a prompt engineer. Given an image, output ONLY a single dense paragraph that would recreate it in Midjourney/DALL-E/Stable Diffusion. CRITICAL: Do NOT describe what you see. Do NOT say "the image shows" or "this is a". Just output the prompt. Include: camera specs (lens, aperture, focal length, ISO), lighting (key/fill/rim, color temp, modifiers), subject details (appearance, expression, pose, clothing), composition, color palette, depth of field, texture, mood. Start directly with the subject.'
  },
  cinematic: {
    label: 'Cinematic / Film',
    models: ['meta/llama-3.2-11b-vision-instruct', 'meta/llama-3.2-90b-vision-instruct'],
    prompt: 'You are a prompt engineer. Given an image, output ONLY a single dense paragraph that would recreate it in Midjourney/DALL-E/Stable Diffusion. CRITICAL: Do NOT describe what you see. Do NOT say "the image shows" or "this is a". Just output the prompt. Include: film stock/grade, color grading (teal-orange, bleach bypass, etc.), anamorphic lens flare/vignette, aspect ratio, framing/composition rules, lighting mood (chiaroscuro, noir, golden hour), atmosphere, depth cues, subject details. Start directly with the scene.'
  },
  anime: {
    label: 'Anime / Manga',
    models: ['meta/llama-3.2-11b-vision-instruct', 'nvidia/llama-3.1-nemotron-nano-vl-8b-v1'],
    prompt: 'You are a prompt engineer. Given an image, output ONLY a single dense paragraph that would recreate it in Midjourney/DALL-E/Stable Diffusion. CRITICAL: Do NOT describe what you see. Do NOT say "the image shows" or "this is a". Just output the prompt. Include: line art quality/thickness, cel shading style, color palette (flat vs gradient), character proportions, eye style, hair rendering, background style, screen tones/hatching, studio aesthetic (Ghibli, Shinkai, etc.), frame composition. Start directly with the character/scene.'
  },
  oilpainting: {
    label: 'Oil Painting',
    models: ['meta/llama-3.2-11b-vision-instruct', 'google/paligemma'],
    prompt: 'You are a prompt engineer. Given an image, output ONLY a single dense paragraph that would recreate it in Midjourney/DALL-E/Stable Diffusion. CRITICAL: Do NOT describe what you see. Do NOT say "the image shows" or "this is a". Just output the prompt. Include: brush stroke technique (impasto, glazing, scumbling), canvas texture, paint thickness, color mixing, underpainting, chiaroscuro, period/style (Renaissance, Impressionist, Baroque, Modern), varnish, subject details. Start directly with the subject.'
  },
  digitalart: {
    label: 'Digital Art / Concept',
    models: ['nvidia/llama-3.1-nemotron-nano-vl-8b-v1', 'meta/llama-4-maverick-17b-128e-instruct'],
    prompt: 'You are a prompt engineer. Given an image, output ONLY a single dense paragraph that would recreate it in Midjourney/DALL-E/Stable Diffusion. CRITICAL: Do NOT describe what you see. Do NOT say "the image shows" or "this is a". Just output the prompt. Include: rendering style (smooth, painterly, stylized), layer usage, blending, brush types, texturing, lighting, composition, color harmony, detail level, software techniques, subject details. Start directly with the subject.'
  },
  minimalist: {
    label: 'Minimalist / Vector',
    models: ['nvidia/llama-3.1-nemotron-nano-vl-8b-v1', 'meta/llama-3.2-11b-vision-instruct'],
    prompt: 'You are a prompt engineer. Given an image, output ONLY a single dense paragraph that would recreate it in Midjourney/DALL-E/Stable Diffusion. CRITICAL: Do NOT describe what you see. Do NOT say "the image shows" or "this is a". Just output the prompt. Include: geometric precision, limited color palette, flat colors, negative space, typography, line weight, symmetry/asymmetry, grid alignment, simplicity of forms, design principles. Start directly with the subject.'
  }
};

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== 'generatePrompt' || !info.srcUrl) return;

  const { apiKey, style } = await chrome.storage.sync.get(['apiKey', 'style']);
  if (!apiKey) {
    showNotification('Set your NVIDIA API key in the extension popup.');
    return;
  }

  const preset = STYLE_PRESETS[style || 'photorealistic'];
  const models = preset.models;

  showNotification('Analyzing...');

  try {
    const base64Image = await fetchImageAsBase64(info.srcUrl);
    const prompt = await generateWithModels(apiKey, models, base64Image, preset.prompt);

    savePrompt(prompt, info.srcUrl);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showPromptModal,
      args: [prompt, info.srcUrl, preset.label]
    });

    chrome.notifications.clear('');

  } catch (error) {
    console.error('Error:', error);
    showNotification(`Error: ${error.message}`);
  }
});

async function fetchImageAsBase64(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch image');
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function generateWithModels(apiKey, models, base64Image, systemPrompt) {
  let lastError = null;
  for (const model of models) {
    try {
      return await callNvidiaApi(apiKey, model, base64Image, systemPrompt);
    } catch (e) {
      lastError = e;
      console.log(`Model ${model} failed: ${e.message}`);
      const skip = e.message.includes('quota') || e.message.includes('rate limit') || e.message.includes('not found');
      if (!skip) throw e;
    }
  }
  throw lastError || new Error('All models failed');
}

async function callNvidiaApi(apiKey, model, base64Image, systemPrompt) {
  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a prompt engineering assistant. Your ONLY job is to output a single, dense, ready-to-use prompt for AI image generators (Midjourney, DALL-E, Stable Diffusion). Never describe the image. Never say "the image shows" or "this is" or "I can see". Just output the raw prompt text directly.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64Image}` }
            },
            { type: 'text', text: systemPrompt }
          ]
        }
      ],
      max_tokens: 4096,
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || error.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  let text = data.choices?.[0]?.message?.content?.trim() || 'Failed to generate prompt';
  text = text.replace(/^(the image shows|this is|i can see|the picture depicts|in this image|the photo shows|we see|here is|here's|this image depicts|the scene shows|the artwork depicts)\s*/i, '');
  return text;
}

function savePrompt(prompt, imageUrl) {
  chrome.storage.sync.get('savedPrompts', (result) => {
    const prompts = result.savedPrompts || [];
    prompts.unshift({ prompt, imageUrl, date: Date.now() });
    if (prompts.length > 50) prompts.pop();
    chrome.storage.sync.set({ savedPrompts: prompts });
  });
}

function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: chrome.runtime.getURL('icons/icon48.png'),
    title: 'Image Prompt Generator',
    message: message
  }, () => chrome.runtime.lastError);
}

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

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'savePrompt') {
    savePrompt(message.prompt, message.imageUrl);
  }
});