'use client';

import { useEffect, useState } from 'react';
import isTouchDevice from '@/utils/device/is-touch-device';
import Split from './split';

interface AvildTelLinkProps {
  children: string;
}

/**
 * `<meta name="format-detection" .. />`を指定してもiOSのChromeで電話番号リンクが付いてしまうため、
 * それを強制的に阻止するためのコンポーネント。
 */
export default function AvoidTelLink({ children }: AvildTelLinkProps) {
  const [splitDisabled, setSplitDisabled] = useState(false);

  useEffect(() => {
    const touchDevice = isTouchDevice();
    setSplitDisabled(!touchDevice);
  }, []);

  if (splitDisabled) {
    return <>{children}</>;
  }

  return <Split separator={<>&zwnj;</>}>{children.split('')}</Split>;
}
