# Project: Last Stand | The Digital Ark

> "We capture the soul of the end times."

## Overview

A Web3D Digital Archive built with **Next.js (App Router)** and **React Three Fiber**.
It serves as a final portfolio to demonstrate bridge technology between Unity/VRChat logic and Modern Web Standards.

## Core Stack

- **Framework:** Next.js 15+ (App Router)
- **3D Engine:** Three.js / React Three Fiber
- **State Management:** Zustand
- **Styling:** Tailwind CSS

## Architecture

- **`src/app/components/canvas`**: 3D Logic (R3F)
- **`src/app/components/ui`**: 2D Overlay UI (React)
- **`src/app/components/layout`**: Composition Layer

## Asset Management (Strict Rule)

- **Code:** Managed by Git.
- **Assets (`.glb`):** Managed LOCALLY (Google Drive).
  - Do NOT commit large `.glb` files to this repository.
  - Place them in `public/models/` manually after cloning.

## Development

```bash
npm run dev -- -p 3001
# Open http://localhost:3001
```
