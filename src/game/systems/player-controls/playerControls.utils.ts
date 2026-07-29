import type { ActiveInputIdsByAction } from './playerControls.types';

export function createActiveInputIdsByAction(): ActiveInputIdsByAction {
  return {
    fire: new Set(),
    left: new Set(),
    right: new Set(),
    up: new Set(),
  };
}

export function isInteractiveElement(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      [
        'a[href]',
        'button',
        'input',
        'select',
        'textarea',
        '[contenteditable]:not([contenteditable="false"])',
        '[role="button"]',
        '[role="slider"]',
        '[role="switch"]',
      ].join(',')
    )
  );
}

export function isGameCanvas(target: EventTarget | null) {
  return (
    target instanceof HTMLCanvasElement &&
    target.classList.contains('game-canvas')
  );
}
