import { Dialog } from '@base-ui/react/dialog';

import { PixelIconButton } from '@/shared/ui/PixelButton';

import {
  ModalBackdrop,
  ModalClosePosition,
  ModalContent,
  ModalDescription,
  ModalPopup,
  ModalTitle,
  ModalViewport,
} from './Modal.styles';
import type { ModalProps } from './Modal.types';
import { ModalCloseIcon } from './ModalCloseIcon';

export function Modal({
  backdropStrength = 'default',
  children,
  closable = true,
  closeLabel = 'Close modal',
  description,
  finalFocus,
  initialFocus,
  maxWidth = '440px',
  portalContainer,
  title,
  ...rootProps
}: ModalProps) {
  const isContained = portalContainer !== undefined;

  return (
    <Dialog.Root {...rootProps} modal>
      <Dialog.Portal container={portalContainer}>
        <ModalBackdrop $contained={isContained} $strength={backdropStrength} />
        <ModalViewport $contained={isContained}>
          <ModalPopup
            $maxWidth={maxWidth}
            finalFocus={finalFocus}
            initialFocus={initialFocus}
          >
            {closable ? (
              <ModalClosePosition>
                <Dialog.Close
                  render={
                    <PixelIconButton
                      aria-label={closeLabel}
                      variant="secondary"
                    >
                      <ModalCloseIcon />
                    </PixelIconButton>
                  }
                />
              </ModalClosePosition>
            ) : null}

            <ModalTitle>{title}</ModalTitle>
            {description ? (
              <ModalDescription>{description}</ModalDescription>
            ) : null}
            <ModalContent>{children}</ModalContent>
          </ModalPopup>
        </ModalViewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
