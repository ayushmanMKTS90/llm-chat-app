---
name: image-prompt-enhancer
description: Turns a short, low-detail image description into a rich, professional prompt for text-to-image generators (Midjourney, DALL-E 3, Stable Diffusion, and any LLM-based generator). Use when the user asks to enhance, expand, flesh out, or "make a better prompt" for an image idea, or to write image prompts for hero visuals, illustrations, or mockups. Output is tool-agnostic descriptive language — never generator-specific flags.
---

# Image Prompt Enhancer

Take a simple, low-detail image description and expand it into a rich,
professional prompt that works across different AI image generators (Midjourney,
DALL-E 3, Stable Diffusion, etc.) by focusing on **descriptive language** rather
than tool-specific syntax.

Stay engine-agnostic. The output must be interpretable by any LLM-based image
generator.

## The Enhancement Framework

Transform a basic idea into a professional prompt by layering detail across
five dimensions.

### 1. Core Subject & Action
Refine the main subject. Instead of "a dog," use "a regal Golden Retriever
sitting poised." Define the action, expression, and specific characteristics.

### 2. Environment & Setting
Build the world around the subject.
- **Location:** Where is it? (e.g., "in a neon-lit cyberpunk alleyway,"
  "amidst a swirling cosmic nebula," "inside a minimalist Scandinavian living
  room").
- **Atmosphere:** What is the air like? (e.g., "misty morning fog,"
  "golden hour sunlight," "electric tension").

### 3. Style, Medium & Artistry
Define the visual language.
- **Medium:** (e.g., "Hyper-realistic digital art," "Oil painting on canvas,"
  "Analog 35mm photography," "Detailed 3D render in Unreal Engine 5,"
  "Charcoal sketch").
- **Artistic Influence:** (e.g., "In the style of Wes Anderson,"
  "Cyberpunk aesthetic," "Baroque lighting").

### 4. Lighting & Color Palette
Control the mood through light and color.
- **Lighting:** (e.g., "Volumetric lighting," "Soft rim lighting,"
  "Cinematic chiaroscuro," "Harsh midday sun").
- **Palette:** (e.g., "Monochromatic blue tones," "Vibrant complementary
  colors," "Muted earthy pastels").

### 5. Composition & Camera
Direct the "shot."
- **Perspective:** (e.g., "Low-angle shot looking up," "Wide-angle panoramic
  view," "Macro close-up," "Bird's-eye view").
- **Lens/Focus:** (e.g., "Shallow depth of field with a blurred background,"
  "Sharp focus throughout," "Fisheye distortion").

## 🚀 Execution Process

When a user provides a basic description, work through these steps in order.

1. **Analyze the Intent** — determine the mood and primary goal of the image.
2. **Apply the Layers** — systematically add the 5 layers of detail above.
3. **Maintain Agnosticism**:
   - **DO NOT** use tool-specific flags (e.g., no `--ar 16:9`, no `--v 6`, no
     `(masterpiece:1.2)`).
   - **DO** use descriptive adjectives and nouns that any LLM-based image
     generator can interpret.
4. **Generate Options** — provide 2–3 variations based on different artistic
   directions (e.g., one hyper-realistic, one stylized/artistic).

## 📝 Example Transformation

**User Input:** "A futuristic city with cars."

**Enhanced Prompt — Cinematic / Realistic:**
> A wide-angle cinematic shot of a sprawling cyberpunk metropolis at dusk.
> Sleek, iridescent hover-cars weave through towering skyscrapers clad in
> massive holographic advertisements. The streets are wet from a recent rain,
> reflecting the vibrant neon pinks and electric blues of the city lights.
> Volumetric fog clings to the lower levels, with soft rim lighting
> highlighting the architectural edges. Hyper-realistic digital art, 8k
> resolution, sharp focus, intricate mechanical detail.

**Enhanced Prompt — Stylized / Artistic:**
> A whimsical digital illustration of a futuristic floating city. Rounded,
> organic architecture in pearlescent white and gold, surrounded by floating
> gardens and cascading waterfalls. Small, bubble-shaped transport pods drift
> lazily through a clear, golden-hour sky. Soft, ethereal lighting with a
> pastel color palette of mint green and soft apricot. Dreamy atmosphere, clean
> lines, Studio Ghibli-inspired aesthetic.