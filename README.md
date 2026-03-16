# 🕹️ Zero-Ads Arcade Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source Love png1](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)

> A lightweight, open-source (MIT) engine for embedding ad-free games into any web application with built-in analytics, leaderboards, and mobile-ready controls.

## 🌟 Why this exists?
Most web games today are hidden behind intrusive ads and trackers. **Zero-Ads Arcade Engine** provide developers with a clean infrastructure to host high-quality web games while maintaining full control over the user experience.

## 🏗️ Technical Architecture
- **Core:** Vanilla TypeScript (No heavy framework dependencies)
- **State Management:** Secure local storage + Remote Firebase support
- **Input System:** Unified Gamepad / Keyboard / Touch-HUD mapping
- **Overlay:** Glassmorphic UI for pause menus, scoreboards, and settings

## 📂 Folder Structure
- `src/core`: Game loop, Asset loader, and State management.
- `src/hud`: Customizable touchscreen controls (Virtual Joysticks/Buttons).
- `src/bridge`: API for communication between the engine and the hosted game (iframe).
- `docs/`: Full documentation and integration guides.

## 🚀 Key Features
- **One-Click Integration:** Embed `<arcade-game src="game.html">` tags.
- **Zero Latency:** Optimized for low-end devices and university networks.
- **Privacy First:** No cookies, no trackers, no ads.
 
## 🚀 Quick Start
 
### 1. Host Integration (Main Site)
Add the engine bridge to your main page to start capturing events.
 
```html
<script type="module">
  import { EngineBridge } from './EngineBridge.js';
  const arcade = new EngineBridge('my-game-id');
  
  // Listen for scores
  arcade.on('SCORE_UPDATE', (score) => {
    console.log("New High Score:", score);
  });
</script>
```
 
### 2. Game Integration (Inside Iframe)
Send events from your game to the parent engine.
 
```javascript
window.parent.postMessage({
  source: 'ARCADE_ENGINE_GAME',
  payload: { type: 'SCORE_UPDATE', value: 100 }
}, '*');
```

## 🛠️ Installation
```bash
npm install @unitybtw/arcade-engine
```

## 🎨 Branding & Social Previews
To maintain a professional look, we recommend using the following assets for your repository:
- **Social Preview Image**: Use a 1280x640 image with the HUD aesthetic.
- **Repository Topics**: `game-engine`, `arcade`, `open-source`, `typescript`, `gamedev`.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
