import type { ModalProps } from '@/shared/ui';

export type ModalGamePauseProps = Pick<
  ModalProps,
  'open' | 'onOpenChange' | 'onOpenChangeComplete' | 'portalContainer'
> & {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
};
