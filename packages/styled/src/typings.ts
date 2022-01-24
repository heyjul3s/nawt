import * as CSS from 'csstype';
import type { CSSObject, StyledComponent } from 'styled-components';

import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  Config,
  DisplayProps,
  FlexProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ResponsiveValue,
  RequiredTheme,
  Scale,
  ShadowProps,
  SpaceProps,
  styleFn,
  Theme,
  TypographyProps,
  VariantArgs
} from 'styled-system';

export type TCSSObjectWithScale = CSS.Properties<string | number | Scale>;
export type TCSSPseudos = { [K in CSS.Pseudos]?: TCSSObjectWithScale };
export type TScalableCSSObject = TCSSObjectWithScale & TCSSPseudos;

export type TBaseProps = BackgroundProps &
  BorderProps &
  ColorProps &
  DisplayProps &
  FlexProps &
  GridProps &
  LayoutProps &
  PositionProps &
  ShadowProps &
  SpaceProps &
  TypographyProps &
  TTypographyProps;

export type TStyledElement =
  | keyof JSX.IntrinsicElements
  | StyledComponent<keyof JSX.IntrinsicElements, any, any, keyof any>;

export type TStyledObjectProps = {
  attrs: any;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
};

export type TStyledObject<Props = void, ThemeType = void> = StyledComponent<
  keyof JSX.IntrinsicElements,
  ThemeType | any,
  Props | TBaseProps | any,
  keyof any
>;

export type TStyledSetConfig = {
  base: {
    styles: CSSObject;
    element: keyof JSX.IntrinsicElements;
  };
  components: Record<string, TStyledSetComponent>;
  attrs?: any;
  compose?: styleFn[];
  variants?: VariantArgs;
  system?: Config;
};

export type TStyledSetComponent = Partial<{
  attrs: any;
  as: keyof JSX.IntrinsicElements;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
}> &
  CSSObject;

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
