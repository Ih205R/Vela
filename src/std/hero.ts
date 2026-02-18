/**
 * Hero component standard library
 */

export interface HeroProps {
  title?: string;
  subtitle?: string;
  button?: {
    text: string;
    link?: string;
  };
}

export function parseHero(properties: Array<{ key: string; value: string }>): HeroProps {
  const hero: HeroProps = {};

  properties.forEach((prop) => {
    if (prop.key === 'title') hero.title = prop.value;
    if (prop.key === 'subtitle') hero.subtitle = prop.value;
    if (prop.key === 'button') {
      try {
        hero.button = JSON.parse(prop.value);
      } catch (e) {
        // Ignore malformed button
      }
    }
  });

  return hero;
}
