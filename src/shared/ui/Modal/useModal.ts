import { useCallback, useState } from 'react';

import type { UseModalOptions, UseModalResult } from './Modal.types';

export function useModal({
  defaultOpen = false,
  onOpenChange,
  open: controlledOpen,
}: UseModalOptions = {}): UseModalResult {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (open: boolean) => {
      if (open === isOpen) {
        return;
      }

      if (!isControlled) {
        setUncontrolledOpen(open);
      }

      onOpenChange?.(open);
    },
    [isControlled, isOpen, onOpenChange]
  );

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  return {
    close,
    isOpen,
    open,
    setOpen,
    toggle,
  };
}
