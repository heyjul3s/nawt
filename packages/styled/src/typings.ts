import * as CSS from 'csstype';
import type { StyledComponent } from 'styled-components';
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

export type BaseProps = BackgroundProps & BorderProps & ColorProps & DisplayProps & LayoutProps & PositionProps & ShadowProps & SpaceProps & TypographyProps;

export type TStyledObjectProps = {
  attrs: any;
  compose: styleFn[];
  variants: VariantArgs;
  system: Config;
};

export type TStyledObject<Props extends BaseProps, ThemeType = void> = StyledComponent<
  keyof JSX.IntrinsicElements,
  ThemeType | any,
  Props | any,
  keyof any
>