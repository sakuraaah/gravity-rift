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

export function isGameCanvas(
  target: EventTarget | null
): target is HTMLCanvasElement {
  return (
    target instanceof HTMLCanvasElement &&
    target.classList.contains('game-canvas')
  );
}

export function isGamePageSurface(
  target: EventTarget | null
): target is HTMLElement {
  return (
    target instanceof HTMLElement &&
    target.closest('.game-page-surface') !== null &&
    !isInteractiveElement(target)
  );
}
