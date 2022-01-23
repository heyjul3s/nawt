import * as CSS from 'csstype';
import { Theme, RequiredTheme, ResponsiveValue } from 'styled-system';

export interface ITextDecorationProps<ThemeType extends Theme = RequiredTheme> {
  textDecoration?: ResponsiveValue<CSS.Property.TextDecoration, ThemeType>;
}

export interface ITextIndentProps<ThemeType extends Theme = RequiredTheme> {
  textIndent?: ResponsiveValue<CSS.Property.TextIndent, ThemeType>;
}

export interface ITextTransformProps<ThemeType extends Theme = RequiredTheme> {
  textTransform?: ResponsiveValue<CSS.Property.TextTransform, ThemeType>;
}

export interface ITextOverflowProps<ThemeType extends Theme = RequiredTheme> {
  textOverflow?: ResponsiveValue<CSS.Property.TextOverflow, ThemeType>;
}

export interface IWhiteSpaceProps<ThemeType extends Theme = RequiredTheme> {
  whiteSpace?: ResponsiveValue<CSS.Property.WhiteSpace, ThemeType>;
}

export interface IWordBreakProps<ThemeType extends Theme = RequiredTheme> {
  wordBreak?: ResponsiveValue<CSS.Property.WordBreak, ThemeType>;
}

export interface IWordSpacingProps<ThemeType extends Theme = RequiredTheme> {
  wordSpacing?: ResponsiveValue<CSS.Property.WordSpacing, ThemeType>;
}

export type TTypographyProps =
  | ITextDecorationProps
  | ITextIndentProps
  | ITextTransformProps
  | ITextOverflowProps
  | IWhiteSpaceProps
  | IWordBreakProps
  | IWordSpacingProps;
