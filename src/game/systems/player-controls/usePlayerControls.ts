import { useEffect, useRef } from 'react';

import {
  PlayerControlByKey,
  PlayerControlByMouseButton,
} from './playerControls.constants';
import type {
  PlayerControlCounts,
  PlayerControls,
} from './playerControls.types';

function createDefaultPlayerControls(): PlayerControls {
  return {
    fire: false,
    left: false,
    right: false,
    up: false,
  };
}

function createDefaultPlayerControlCounts(): PlayerControlCounts {
  return {
    fire: 0,
    left: 0,
    right: 0,
    up: 0,
  };
}

function createPlayerControlsFromCounts(
  controlCounts: PlayerControlCounts
): PlayerControls {
  return {
    fire: controlCounts.fire > 0,
    left: controlCounts.left > 0,
    right: controlCounts.right > 0,
    up: controlCounts.up > 0,
  };
}

export function usePlayerControls() {
  const controlsRef = useRef<PlayerControls>(createDefaultPlayerControls());
  const controlCountsRef = useRef<PlayerControlCounts>(
    createDefaultPlayerControlCounts()
  );
  const activeInputControlsRef = useRef(
    new Map<string, keyof PlayerControls>()
  );

  useEffect(() => {
    function setControlInputState(
      inputId: string,
      control: keyof PlayerControls,
      isPressed: boolean
    ) {
      if (isPressed) {
        if (activeInputControlsRef.current.has(inputId)) {
          return;
        }

        activeInputControlsRef.current.set(inputId, control);
        controlCountsRef.current[control] += 1;
      } else {
        const activeControl = activeInputControlsRef.current.get(inputId);

        if (!activeControl) {
          return;
        }

        activeInputControlsRef.current.delete(inputId);
        controlCountsRef.current[activeControl] = Math.max(
          0,
          controlCountsRef.current[activeControl] - 1
        );
      }

      controlsRef.current = createPlayerControlsFromCounts(
        controlCountsRef.current
      );
    }

    function setKeyboardControlState(event: KeyboardEvent, isPressed: boolean) {
      const control = PlayerControlByKey[event.code];

      if (!control) {
        return;
      }

      event.preventDefault();
      setControlInputState(`keyboard:${event.code}`, control, isPressed);
    }

    function setMouseControlState(event: MouseEvent, isPressed: boolean) {
      const control = PlayerControlByMouseButton[event.button];

      if (!control) {
        return;
      }

      event.preventDefault();
      setControlInputState(`mouse:${event.button}`, control, isPressed);
    }

    function handleKeyDown(event: KeyboardEvent) {
      setKeyboardControlState(event, true);
    }

    function handleKeyUp(event: KeyboardEvent) {
      setKeyboardControlState(event, false);
    }

    function handleMouseDown(event: MouseEvent) {
      setMouseControlState(event, true);
    }

    function handleMouseUp(event: MouseEvent) {
      setMouseControlState(event, false);
    }

    function handleContextMenu(event: MouseEvent) {
      if (PlayerControlByMouseButton[event.button]) {
        event.preventDefault();
      }
    }

    function handleWindowBlur() {
      activeInputControlsRef.current.clear();
      controlCountsRef.current = createDefaultPlayerControlCounts();
      controlsRef.current = createDefaultPlayerControls();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);

  return controlsRef;
}
