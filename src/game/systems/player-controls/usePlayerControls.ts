import { useCallback, useEffect, useRef } from 'react';

import {
  DEFAULT_PLAYER_ACTIONS,
  PLAYER_CONTROL_BY_KEY,
  PLAYER_CONTROL_BY_MOUSE_BUTTON,
} from './playerControls.constants';
import type {
  ActiveInputIdsByAction,
  PlayerActions,
  UsePlayerControlsOptions,
} from './playerControls.types';
import {
  createActiveInputIdsByAction,
  isGameCanvas,
  isInteractiveElement,
} from './playerControls.utils';

export function usePlayerControls({ disabled }: UsePlayerControlsOptions) {
  const controlsRef = useRef<PlayerActions>({ ...DEFAULT_PLAYER_ACTIONS });
  const activeInputIdsByActionRef = useRef<ActiveInputIdsByAction>(
    createActiveInputIdsByAction()
  );

  const resetControls = useCallback(() => {
    activeInputIdsByActionRef.current = createActiveInputIdsByAction();
    controlsRef.current = { ...DEFAULT_PLAYER_ACTIONS };
  }, []);

  const setControlInputState = useCallback(
    (inputId: string, control: keyof PlayerActions, isPressed: boolean) => {
      const activeInputIds = activeInputIdsByActionRef.current[control];

      if (isPressed) {
        if (!activeInputIds.has(inputId)) {
          activeInputIds.add(inputId);
          controlsRef.current = {
            ...controlsRef.current,
            [control]: true,
          };
        }

        return true;
      }

      if (!activeInputIds.delete(inputId)) {
        return false;
      }

      controlsRef.current = {
        ...controlsRef.current,
        [control]: activeInputIds.size > 0,
      };

      return true;
    },
    []
  );

  const setKeyboardControlState = useCallback(
    (event: KeyboardEvent, isPressed: boolean) => {
      const inputId = `keyboard:${event.code}`;
      const control = PLAYER_CONTROL_BY_KEY[event.code];

      if (!control) {
        return;
      }

      if (isPressed && isInteractiveElement(event.target)) {
        return;
      }

      const isHandled = setControlInputState(inputId, control, isPressed);

      if (isHandled) {
        event.preventDefault();
      }
    },
    [setControlInputState]
  );

  const setMouseControlState = useCallback(
    (event: MouseEvent, isPressed: boolean) => {
      const inputId = `mouse:${event.button}`;
      const control = PLAYER_CONTROL_BY_MOUSE_BUTTON[event.button];

      if (!control) {
        return;
      }

      if (isPressed && !isGameCanvas(event.target)) {
        return;
      }

      const isHandled = setControlInputState(inputId, control, isPressed);

      if (isHandled) {
        event.preventDefault();
      }
    },
    [setControlInputState]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      setKeyboardControlState(event, true);
    },
    [setKeyboardControlState]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      setKeyboardControlState(event, false);
    },
    [setKeyboardControlState]
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      setMouseControlState(event, true);
    },
    [setMouseControlState]
  );

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      setMouseControlState(event, false);
    },
    [setMouseControlState]
  );

  const handleContextMenu = useCallback((event: MouseEvent) => {
    if (
      isGameCanvas(event.target) &&
      PLAYER_CONTROL_BY_MOUSE_BUTTON[event.button]
    ) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    resetControls();

    if (disabled) {
      return;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('blur', resetControls);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('blur', resetControls);
      resetControls();
    };
  }, [
    disabled,
    handleContextMenu,
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseUp,
    resetControls,
  ]);

  return controlsRef;
}
