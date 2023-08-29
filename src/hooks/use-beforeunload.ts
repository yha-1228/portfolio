import useWindowEvent from './use-window-event';

type UseBeforeUnloadOptions = {
  enabled: boolean;
};

export default function useBeforeUnload({ enabled }: UseBeforeUnloadOptions) {
  return useWindowEvent('beforeunload', (e) => {
    if (enabled) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
}
