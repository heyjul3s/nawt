import * as CSS from 'csstype';
import type { CSSObject, StyledComponent } from 'styled-components';
import type { Scale, Config, VariantArgs, styleFn } from 'styled-system';

import type {
  BackgroundProps,
  BorderProps,
  ColorProps,
  DisplayProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
} from 'styled-system'

export type TCSSObjectWithScale = CSS.Properties<string | number | Scale>;
export type TCSSPseudos = { [K in CSS.Pseudos]?: TCSSObjectWithScale };
export type TScalableCSSObject = TCSSObjectWithScale & TCSSPseudos;

export type TBaseProps = BackgroundProps & BorderProps & ColorProps & DisplayProps & LayoutProps & PositionProps & ShadowProps & SpaceProps & TypographyProps;

export type TStyledElement = keyof JSX.IntrinsicElements | StyledComponent<keyof JSX.IntrinsicElements, any, any, keyof any>

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
>

export type TStyledSetConfig = {
  base: {
    styles: CSSObject;
    element: keyof JSX.IntrinsicElements
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
}> & CSSObject;