export enum Layout {
  Classic = 'classic',
  Stretch = 'stretch'
}

export function isLayout(arg: string): arg is Layout {
  return arg === 'classic' || arg === 'stretch';
}
