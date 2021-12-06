import * as CSS from 'csstype';
import { Scale } from 'styled-system';

export type CSSObjectWithScale = CSS.Properties<string | number | Scale>;
export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObjectWithScale };
export type ScalableCSSObject = CSSObjectWithScale & CSSPseudos;
