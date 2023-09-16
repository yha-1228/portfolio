import Split from './split';

type AvildTelLinkProps = {
  children: string;
};

/**
 * `<meta name="format-detection" .. />`を指定してもiOSのChromeで電話番号リンクが付いてしまうため、
 * それを強制的に阻止するためのコンポーネント。
 */
export default function AvoidTelLink({ children }: AvildTelLinkProps) {
  return <Split separator={<>&zwnj;</>}>{children.toString().split('')}</Split>;
}
