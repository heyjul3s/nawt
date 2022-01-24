import styled from 'styled-components';
import { styledObject } from '../../styled/src';

import type { TStyledObject } from '../../styled/src';
import type { TTextProps } from './typings';

export const TextBase: TStyledObject = styledObject('p', {});

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
