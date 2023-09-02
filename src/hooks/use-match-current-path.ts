import { Url } from 'next/dist/shared/lib/router/router';
import { usePathname } from 'next/navigation';
import { isMatchFirstPath } from '@/utils/url/matching';

export default function useIsMatchCurrentPath(target: Url) {
  if (typeof target !== 'string') {
    if (target.pathname != null) {
      target = target.pathname;
    } else {
      throw new Error(`target.pathnameの値がないので判定できません`);
    }
  }

  const pathname = usePathname();
  return isMatchFirstPath(target, pathname);
}
