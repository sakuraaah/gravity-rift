import { Dialog } from '@base-ui/react/dialog';

import {
  DialogBackdrop,
  DialogDescription,
  DialogPopup,
  DialogTitle,
  DialogViewport,
} from './GameDialog.styles';

export const GameDialog = {
  Backdrop: DialogBackdrop,
  Close: Dialog.Close,
  Description: DialogDescription,
  Popup: DialogPopup,
  Portal: Dialog.Portal,
  Root: Dialog.Root,
  Title: DialogTitle,
  Trigger: Dialog.Trigger,
  Viewport: DialogViewport,
} as const;
