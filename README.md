# Gravity Rift

Gravity Rift is a pixel arcade shooter set in an asteroid field. You pilot a small spaceship, destroy incoming asteroids and try to survive for as long as possible. Black holes pull nearby objects off course and make each wave harder to navigate. Your score grows as you clear asteroids, while the current wave and remaining lives are shown in the HUD.

## Controls

Use `A` and `D` or the left and right arrow keys to rotate the ship. Press `W` or the up arrow key to thrust. Fire with `Space` or the left mouse button. The game can be paused with `Escape` or the pause button in the HUD.

## Built with

The game is written in TypeScript with React 19 and PixiJS 8. It uses Vite for development and production builds, Zustand for application state and Emotion for interface styles.

## Setup

To run the project with Docker, clone the repository, open its directory and use:

```sh
docker compose up --build
```

Open [http://localhost:5175](http://localhost:5175) in a browser. The development server reloads when files in the project change. Stop it with `Ctrl+C`.

To run the project without Docker, install Node.js 24 and use:

```sh
npm ci
npm run dev
```

Vite will print the local address in the terminal.
