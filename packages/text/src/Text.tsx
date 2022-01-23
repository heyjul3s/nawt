import styled from 'styled-components';
import { flexbox, grid } from 'styled-system';
import { styledObject } from '../../styled/src';

import type { Config } from 'styled-system';
import type { TStyledObject } from '../../styled/src';
import type { TTypographyProps, TTextProps } from './typings';

export const typographyStyleProps: Config = {
  textDecoration: true,
  textIndent: true,
  textTransform: true,
  textOverflow: true,
  whiteSpace: true,
  wordBreak: true,
  wordSpacing: true
};

export const TextBase: TStyledObject<TTypographyProps> = styledObject(
  'p',
  {},
  {
    compose: [flexbox, grid],
    system: typographyStyleProps
  }
);

export const Text = styled(TextBase)<TTextProps>((props) => {
  const textOverflow = props?.textOverflow || 'ellipsis';

  const noOfLines = !!props?.noOfLines
    ? String(props.noOfLines)?.match(/(\d+)/)?.[0]
    : void 0;

  return {
    ...(!!props.trim && {
      textOverflow: textOverflow,
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }),
    ...(!!noOfLines && {
      display: '-webkit-box',
      '-webkit-line-clamp': noOfLines,
      '-webkit-box-orient': 'vertical',
      whiteSpace: 'normal',
      textOverflow: textOverflow,
      overflow: 'hidden'
    })
  };
});
