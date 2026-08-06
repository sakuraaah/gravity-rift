import type { CSSProperties, ComponentProps, ReactNode } from 'react';

import type { Dialog } from '@base-ui/react/dialog';

type DialogRootProps = ComponentProps<typeof Dialog.Root>;
type DialogPopupProps = ComponentProps<typeof Dialog.Popup>;
type DialogPortalProps = ComponentProps<typeof Dialog.Portal>;

export type ModalBackdropStrength = 'default' | 'strong';

export type ModalProps = Omit<DialogRootProps, 'children' | 'modal'> & {
  backdropStrength?: ModalBackdropStrength;
  children: ReactNode;
  closable?: boolean;
  closeLabel?: string;
  description?: ReactNode;
  finalFocus?: DialogPopupProps['finalFocus'];
  initialFocus?: DialogPopupProps['initialFocus'];
  maxWidth?: CSSProperties['maxWidth'];
  portalContainer?: DialogPortalProps['container'];
  title: ReactNode;
};

export type UseModalOptions = {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

export type UseModalResult = {
  close: () => void;
  isOpen: boolean;
  open: () => void;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};
