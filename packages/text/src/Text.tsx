import styled from 'styled-components'
import { styledObject } from '@artefakt/styled';

import type { Config } from 'styled-system';
import type { TStyledObject } from '@artefakt/styled';
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

export const TextBase: TStyledObject<TTypographyProps> = styledObject( 'p', {}, { system: typographyStyleProps });

export const Text = styled(TextBase)<TTextProps>((props) => {
  const textOverflow = props?.textOverflow || 'ellipsis';

  return {
    ...(!!props.trim && {
      textOverflow: textOverflow,
      overflow: 'hidden'
    }),
    ...(!!props.noOfLines && {
      display: '-webkit-box',
      lineClamp: props.noOfLines,
      boxOrient: 'vertical',
      whiteSpace: 'normal',
      textOverflow: textOverflow,
      overflow: 'hidden'
    })
  }
});