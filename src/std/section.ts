/**
 * Section component standard library
 */

export interface SectionProps {
  title?: string;
  layout?: 'grid' | 'flex' | 'stack';
}

export const defaultSection: SectionProps = {
  layout: 'grid',
};
