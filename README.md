# Gravity Rift

Gravity Rift is a pixel arcade shooter set in an asteroid field. You pilot a small spaceship, destroy incoming asteroids and survive for as long as possible. Black holes disturb the playfield by pulling the ship, asteroids and bullets toward their center. Destroyed asteroids add to the score and advance the game through increasingly faster waves.

The project is a playable MVP. Its architecture separates the real-time PixiJS simulation from the React interface. The game scene runs inside a low-resolution pixel canvas while the menus, HUD and overlays remain regular DOM elements.

## Implementation

### Black hole gravity

Black holes are simulated gravity sources rather than scripted visual obstacles. Active holes apply inverse-square acceleration to every nearby moving object. The calculation has a limited influence radius and a minimum distance clamp, which keeps the force stable near the center. The danger phase uses a stronger gravity profile, so the same system naturally produces curved bullet trails, deflected asteroids and a ship that becomes harder to steer.

### Black hole lifecycle

Each black hole moves through spawn, idle, active, danger and collapse phases. Phase changes are selected from a weighted transition graph instead of a fixed animation sequence. A new hole begins with an 80 percent chance to move toward a stronger state. That chance is multiplied by 0.75 after every growth transition, which gradually makes returning to idle or collapsing more likely.

The idle, active and danger phases last about seven seconds with one second of random variation. Transitions use their own animation sequences and timings, including reversed sequences when a hole returns to a weaker state. New holes are placed inside reachable playfield bounds, kept apart from existing holes and limited to five active instances.

### Asteroid spawning and waves

Asteroids do not appear at a single random coordinate. Small, medium and large asteroids have separate schedules with different initial delays, average intervals, timing variation, movement speeds and safe spawn distances. A weighted side selection controls where they enter the field. The spawner samples several points beyond the screen border and prefers a point that is not clustered with active asteroids.

The selected asteroid is aimed roughly toward the center of the playfield, then given a size-specific random angular deviation. Asteroids generally cross the field instead of drifting along one edge, but they do not repeat the same trajectory. As the score reaches wave thresholds, the shared game-speed multiplier increases in small steps up to twice the initial speed.

### PixiJS and React split

The real-time scene is rendered with PixiJS through `@pixi/react` on a logical 240 by 135 pixel canvas. The background, black holes, asteroids, bullets, trails, spaceship and impact effects live in the Pixi scene graph. The ship uses 16 pre-rendered headings instead of freely rotating one texture, which keeps its pixel art sharp. The main menu, score, wave counter, lives, control hints, pause screen and game-over screen are React DOM components rendered above the canvas.

Frame-sensitive data stays in refs shared through `GameContext`. This includes the collision world, game time, current controls, spaceship position, active black holes and pending effect requests. Updating these values does not cause a React render on every frame. Zustand holds discrete application state such as the current game phase, score, wave and player health, which makes it suitable for the React interface.

### Runtime systems

The update loop uses explicit priorities. Game time and black hole lifecycle updates run first, followed by gravity, entity movement, collision resolution, effects, cleanup and background animation. A black hole therefore changes phase before gravity is calculated, while entity colliders are synchronized before collision checks run.

Collisions are handled through a shared `check2d` world with circle and polygon hitboxes. The collision layer tracks enter, stay and exit phases, then routes supported entity pairs through a handler registry. Frequently created objects such as asteroids, black holes, bullets, trails and one-shot effects use PixiJS pools instead of allocating a new object every time. The background is assembled from tiling layers with different parallax values and only moves while the game is running.

## Controls

Use `A` and `D` or the left and right arrow keys to rotate the ship. Press `W` or the up arrow key to thrust. Fire with `Space` or the left mouse button. The game can be paused with `Escape` or the pause button in the HUD.

## Built with

The game is written in TypeScript with React 19, PixiJS 8 and `@pixi/react`. It uses Vite for development and production builds, Zustand for application state, Emotion for interface styles and `check2d` for collision detection.

## Project status

The core game loop, scoring, waves, black hole lifecycle, collision detection, visual effects and interface are implemented. Planned work includes a How to Play screen, render-resolution and difficulty settings, physical asteroid-to-asteroid collision response, improved support for different screens and a scoreboard.

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
