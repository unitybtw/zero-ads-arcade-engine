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

## 🛠️ Getting Started
```bash
npm install @unitybtw/arcade-engine
```
