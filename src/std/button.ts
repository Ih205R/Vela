/**
 * Button component standard library
 */

export interface ButtonProps {
  text: string;
  link?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const defaultButton: Partial<ButtonProps> = {
  variant: 'primary',
  size: 'medium',
};
