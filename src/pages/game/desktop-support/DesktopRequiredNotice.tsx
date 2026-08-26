import { TypographyVariant } from '@/shared/ui/Typography';

import {
  DesktopRequiredNoticeContent,
  DesktopRequiredNoticeDescription,
  DesktopRequiredNoticeDivider,
  DesktopRequiredNoticeEyebrow,
  DesktopRequiredNoticeRoot,
  DesktopRequiredNoticeTitle,
} from './DesktopRequiredNotice.styles';

export function DesktopRequiredNotice() {
  return (
    <DesktopRequiredNoticeRoot
      aria-describedby="desktop-required-description"
      aria-labelledby="desktop-required-title"
    >
      <DesktopRequiredNoticeContent>
        <DesktopRequiredNoticeEyebrow
          component="p"
          variant={TypographyVariant.MainMenuSubtitle}
        >
          Touch controls unavailable
        </DesktopRequiredNoticeEyebrow>

        <DesktopRequiredNoticeTitle
          id="desktop-required-title"
          component="h1"
          variant={TypographyVariant.ModalTitle}
        >
          Keyboard and mouse required
        </DesktopRequiredNoticeTitle>

        <DesktopRequiredNoticeDivider aria-hidden />

        <DesktopRequiredNoticeDescription
          id="desktop-required-description"
          component="p"
          variant={TypographyVariant.Body}
        >
          Open Gravity Rift on a desktop or laptop to play.
        </DesktopRequiredNoticeDescription>
      </DesktopRequiredNoticeContent>
    </DesktopRequiredNoticeRoot>
  );
}
