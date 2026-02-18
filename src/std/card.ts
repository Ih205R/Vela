/**
 * Card component standard library
 */

export interface CardProps {
  title?: string;
  text?: string;
  image?: string;
  link?: string;
}

export function parseCard(properties: Array<{ key: string; value: string }>): CardProps {
  const card: CardProps = {};

  properties.forEach((prop) => {
    if (prop.key === 'title') card.title = prop.value;
    if (prop.key === 'text') card.text = prop.value;
    if (prop.key === 'image') card.image = prop.value;
    if (prop.key === 'link') card.link = prop.value;
  });

  return card;
}
