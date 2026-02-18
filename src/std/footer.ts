/**
 * Footer component standard library
 */

export interface FooterProps {
  text?: string;
  links?: Array<{ text: string; url: string }>;
  copyright?: string;
}

export function parseFooter(properties: Array<{ key: string; value: string }>): FooterProps {
  const footer: FooterProps = {};

  properties.forEach((prop) => {
    if (prop.key === 'text') footer.text = prop.value;
    if (prop.key === 'copyright') footer.copyright = prop.value;
  });

  return footer;
}
