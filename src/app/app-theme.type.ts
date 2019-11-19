export type AppTheme = 'default-theme' | 'dark-theme';

export function isAppTheme(arg: string): arg is AppTheme {
  return arg === 'default-theme' || arg === 'dark-theme';
}
