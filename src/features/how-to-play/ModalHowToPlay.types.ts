import type { RefObject } from 'react';

import type { ModalProps } from '@/shared/ui';

export type ModalHowToPlayProps = Pick<
  ModalProps,
  'open' | 'onOpenChange' | 'onOpenChangeComplete'
> & {
  gameSurfaceRef: RefObject<HTMLElement | null>;
  onConfirm: () => void;
};
