/**
 * AST Node Type Definitions for Vela Language
 * Defines the complete Abstract Syntax Tree structure
 */

export interface Position {
  line: number;
  column: number;
}

export interface SourceLocation {
  start: Position;
  end: Position;
}

export interface ASTNode {
  type: string;
  loc?: SourceLocation;
}

// Root node
export interface SiteNode extends ASTNode {
  type: 'Site';
  name: string;
  theme?: ThemeNode;
  pages: PageNode[];
}

// Theme configuration
export interface ThemeNode extends ASTNode {
  type: 'Theme';
  properties: ThemeProperty[];
}

export interface ThemeProperty extends ASTNode {
  type: 'ThemeProperty';
  key: string;
  value: string;
}

// Page
export interface PageNode extends ASTNode {
  type: 'Page';
  route: string;
  children: ComponentNode[];
}

// Components
export type ComponentNode =
  | HeroNode
  | SectionNode
  | CardNode
  | ButtonNode
  | FooterNode
  | ImageNode
  | TextNode;

export interface HeroNode extends ASTNode {
  type: 'Hero';
  properties: PropertyNode[];
}

export interface SectionNode extends ASTNode {
  type: 'Section';
  title?: string;
  children: ComponentNode[];
}

export interface CardNode extends ASTNode {
  type: 'Card';
  properties: PropertyNode[];
}

export interface ButtonNode extends ASTNode {
  type: 'Button';
  text: string;
  link?: string;
}

export interface FooterNode extends ASTNode {
  type: 'Footer';
  properties: PropertyNode[];
}

export interface ImageNode extends ASTNode {
  type: 'Image';
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

export interface TextNode extends ASTNode {
  type: 'Text';
  content: string;
}

// Property node
export interface PropertyNode extends ASTNode {
  type: 'Property';
  key: string;
  value: string;
}
