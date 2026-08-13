export const BlackHoleAnimation = {
  Spawn: 'spawn',
  SpawnToIdleA: 'spawn-to-idle-a',
  SpawnToIdleB: 'spawn-to-idle-b',
  Idle: 'idle',
  IdleToActiveA: 'idle-to-active-a',
  IdleToActiveB: 'idle-to-active-b',
  Active: 'active',
  ActiveToDangerA: 'active-to-danger-a',
  ActiveToDangerB: 'active-to-danger-b',
  Danger: 'danger',
  IdleToCollapseA: 'idle-to-collapse-a',
  IdleToCollapseB: 'idle-to-collapse-b',
  Collapse: 'collapse',
} as const;

export type BlackHoleAnimation =
  (typeof BlackHoleAnimation)[keyof typeof BlackHoleAnimation];
