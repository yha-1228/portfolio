'use client';

import { useEffect, useState } from 'react';
import isTouchDevice from '@/utils/device/is-touch-device';
import splitNode from './split-node';

interface AvoidTelLinkProps {
  children: string;
}

/**
 * `<meta name="format-detection" .. />`を指定してもiOSのChromeで電話番号リンクが付いてしまうため、
 * それを強制的に阻止するためのコンポーネント。
 */
export default function AvoidTelLink({ children }: AvoidTelLinkProps) {
  const [splitDisabled, setSplitDisabled] = useState(false);

  useEffect(() => {
    const touchDevice = isTouchDevice();
    setSplitDisabled(!touchDevice);
  }, []);

  if (splitDisabled) {
    return <>{children}</>;
  }

  return splitNode(children.split(''), <>&zwnj;</>);
}
