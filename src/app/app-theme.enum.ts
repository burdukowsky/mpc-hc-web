export enum AppTheme {
  Default = 'default-theme',
  Dark = 'dark-theme'
}

export function isAppTheme(arg: string): arg is AppTheme {
  return arg === 'default-theme' || arg === 'dark-theme';
}
