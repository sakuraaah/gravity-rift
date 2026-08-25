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
          Touch controls in development
        </DesktopRequiredNoticeEyebrow>

        <DesktopRequiredNoticeTitle
          id="desktop-required-title"
          component="h1"
          variant={TypographyVariant.ModalTitle}
        >
          Mobile play is coming soon
        </DesktopRequiredNoticeTitle>

        <DesktopRequiredNoticeDivider aria-hidden />

        <DesktopRequiredNoticeDescription
          id="desktop-required-description"
          component="p"
          variant={TypographyVariant.Body}
        >
          Gravity Rift currently requires a keyboard and mouse. Open this page
          on a desktop device to play.
        </DesktopRequiredNoticeDescription>
      </DesktopRequiredNoticeContent>
    </DesktopRequiredNoticeRoot>
  );
}
