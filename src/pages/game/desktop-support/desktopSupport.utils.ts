import { DESKTOP_SUPPORT_MEDIA_QUERY } from './desktopSupport.constants';

let desktopSupportMediaQueryList: MediaQueryList | null = null;

function getDesktopSupportMediaQueryList() {
  if (typeof window === 'undefined') {
    return null;
  }

  desktopSupportMediaQueryList ??= window.matchMedia(
    DESKTOP_SUPPORT_MEDIA_QUERY
  );

  return desktopSupportMediaQueryList;
}

export function getIsDesktopSupportedSnapshot() {
  return getDesktopSupportMediaQueryList()?.matches ?? false;
}

export function subscribeToDesktopSupportChanges(onStoreChange: () => void) {
  const query = getDesktopSupportMediaQueryList();

  if (!query) {
    return () => undefined;
  }

  query.addEventListener('change', onStoreChange);

  return () => {
    query.removeEventListener('change', onStoreChange);
  };
}
