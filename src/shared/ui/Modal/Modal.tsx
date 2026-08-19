import { Dialog } from '@base-ui/react/dialog';

import { PixelIconButton } from '@/shared/ui/PixelButton';

import { ModalHeaderTone } from './Modal.enums';
import {
  ModalBackdrop,
  ModalClosePosition,
  ModalContent,
  ModalDivider,
  ModalHeader,
  ModalPopup,
  ModalSubtitle,
  ModalTitle,
  ModalViewport,
} from './Modal.styles';
import type { ModalProps } from './Modal.types';
import { ModalCloseIcon } from './ModalCloseIcon';

export function Modal({
  title,
  subtitle,
  headerTone = ModalHeaderTone.Default,
  backdropStrength = 'default',
  children,
  closable = true,
  closeLabel = 'Close modal',
  finalFocus,
  initialFocus,
  maxWidth = '440px',
  portalContainer,
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

            <ModalHeader $tone={headerTone}>
              {subtitle ? <ModalSubtitle>{subtitle}</ModalSubtitle> : null}
              <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalDivider />
            <ModalContent>{children}</ModalContent>
          </ModalPopup>
        </ModalViewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
