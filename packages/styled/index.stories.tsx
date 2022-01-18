import React from 'react';
import { styledObject, styledSet } from './src';

export function styledObjectBasicUsage() {
  const Button = styledObject('button', {
    display: 'flex'
  });

  return (
    <>
      <Button>hello</Button>
    </>
  );
}

export function styledSetUsage() {
  const { P, LargeP } = styledSet({
    base: {
      styles: {
        color: 'black'
      },
      element: 'p'
    },
    components: {
      P: {
        lineHeight: '1.2',
        as: 'p'
      },
      LargeP: {
        lineHeight: '1.3',
        as: 'p'
      }
    }
  });

  return (
    <>
      <P>Hello Paragraph!</P>
      <LargeP>Hello Large Paragraph</LargeP>
    </>
  );
}

export default {
  title: 'Components/Styled'
};
