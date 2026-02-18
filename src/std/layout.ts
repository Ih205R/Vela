/**
 * Layout component standard library
 */

export interface LayoutProps {
  maxWidth?: string;
  padding?: string;
  centered?: boolean;
}

export const defaultLayout: LayoutProps = {
  maxWidth: '1200px',
  padding: '2rem',
  centered: true,
};
