export interface RemOption {
  px: number;
}

export function rem({ px }: RemOption): `${number}rem` {
  return `${px / 16}rem`;
}
