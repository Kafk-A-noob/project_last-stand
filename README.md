# Project Last-Stand: The Digital Ark

> "We capture the soul of the end times."

## Overview

A cutting-edge Web3D Portfolio built with **Next.js 15+ (App Router)** and **React Three Fiber**.
This project bridges the gap between Unity/VRChat experiences and modern web standards, demonstrating advanced techniques like **Optimistic UI** and **Hybrid State Management**.

## Tech Stack

- **Framework:** Next.js (App Router)
- **3D Engine:** Three.js / React Three Fiber (R3F)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Testing:** Vitest (CI Integration)

## Key Features

- **Optimistic UI Navigation:** Instant page transitions by decoupling UI updates from asset loading (`store.ts`).
- **Hybrid State Management:** Efficiently separates high-frequency 3D state (Canvas) from global application state (UI).
- **Asset Manifest System:** Centralized static data management for zero-latency metadata access.
- **Draco Compression:** High-performance 3D asset delivery.

## Documentation

Comprehensive documentation for recruiters and developers:

- **[Specifications](Docs/00_Specs/):** System architecture and project roadmap.
- **[Technical Reports](Docs/03_Technical/):** Deep dives into implementation details (Optimistic UI, etc.).
- **[Development Logs](Docs/02_Logs/):** Daily work history.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:3000
```

## Project Structure

```plaintext
src/
├── app/
│   ├── components/
│   │   ├── canvas/    # 3D Logic (R3F)
│   │   ├── ui/        # 2D Overlay UI
│   │   └── layout/    # Composition Layer
│   └── (pages)/       # Next.js Routes
├── lib/               # Utilities & Stores
└── public/            # Static Assets
```

---

_Created by KafkA (25R1116 = Kafk-A-noob) | Powered by Next.js & R3F_
