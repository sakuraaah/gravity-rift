import { useEffect, useRef } from 'react';

import { PlayerControlByKey } from './playerControls.constants';
import type { PlayerControls } from './playerControls.types';

function createDefaultPlayerControls(): PlayerControls {
  return {
    left: false,
    right: false,
    up: false,
  };
}

export function usePlayerControls() {
  const controlsRef = useRef<PlayerControls>(createDefaultPlayerControls());

  useEffect(() => {
    function setControlState(event: KeyboardEvent, isPressed: boolean) {
      const control = PlayerControlByKey[event.code];

      if (!control) {
        return;
      }

      event.preventDefault();
      controlsRef.current[control] = isPressed;
    }

    function handleKeyDown(event: KeyboardEvent) {
      setControlState(event, true);
    }

    function handleKeyUp(event: KeyboardEvent) {
      setControlState(event, false);
    }

    function handleWindowBlur() {
      controlsRef.current = createDefaultPlayerControls();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return controlsRef;
}
