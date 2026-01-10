# WebGI Scroll-Based 3D Experience (React + GSAP)

A scroll-driven 3D web experience built with **WebGI**, **React**, and **GSAP ScrollTrigger**.  
The project features smooth camera transitions, section-based animations, responsive mobile/desktop behavior, and a transparent WebGL canvas layered with HTML content.

---

## ✨ Features

- 🎥 Scroll-based camera animation using GSAP ScrollTrigger
- 🧭 Synchronized camera position & target movement
- 🖼️ Transparent WebGL background (HTML overlays supported)
- 📱 Responsive camera paths (mobile vs desktop)
- ⚡ Optimized WebGI rendering pipeline
- 🎛️ Tweakpane UI for live parameter tweaking
- 📦 GLB model loading via WebGI Asset Manager
- 🧠 Clean separation of concerns (viewer logic vs animation logic)

---

## 🛠 Tech Stack

- React
- WebGI
- GSAP + ScrollTrigger
- Vite
- Three.js (via WebGI)

---

## 📁 Project Structure

src/
├── components/
│   └── WebgiViewer.jsx
├── lib/
│   └── scroll-animation.js
├── assets/
│   └── scene-black.glb
├── App.jsx
└── main.jsx

---

## 🚀 Getting Started

### Install dependencies
npm install

### Run development server
npm run dev

---

## 🎥 How It Works

- WebGI initializes a ViewerApp bound to a canvas
- Core rendering and post-processing plugins are added
- A GLB model is loaded using AssetManagerPlugin
- GSAP ScrollTrigger drives camera position and target
- camera.setDirty() ensures WebGI re-renders on scroll updates

---

## 📱 Mobile Support

Camera paths adjust automatically for mobile vs desktop screens to maintain composition and storytelling.

---

## ⚠️ Important Notes

- Always call camera.setDirty() inside GSAP onUpdate
- Use one ScrollTrigger per section
- Dispose the viewer on component unmount to avoid memory leaks

---

## 📌 Future Improvements

- Cinematic pinned sections
- Material & lighting animations
- Custom asset loader UI
- Camera path editor
- Transparent PNG exports

---

## 📜 License

For educational and portfolio use. Ensure proper licensing for 3D assets.
