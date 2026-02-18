/**
 * Theme component standard library
 */

export interface ThemeConfig {
  primary?: string;
  background?: string;
  text?: string;
  cardBg?: string;
}

export const defaultTheme: ThemeConfig = {
  primary: '#6C5CE7',
  background: '#0B1020',
  text: '#EAF0FF',
  cardBg: '#1A2332',
};

export function parseTheme(properties: Array<{ key: string; value: string }>): ThemeConfig {
  const theme: ThemeConfig = {};

  properties.forEach((prop) => {
    if (prop.key === 'primary') theme.primary = prop.value;
    if (prop.key === 'background') theme.background = prop.value;
    if (prop.key === 'text') theme.text = prop.value;
    if (prop.key === 'cardBg') theme.cardBg = prop.value;
  });

  return theme;
}
