import React from 'react';
import { styledObject, styledSet } from './src';

export function styledObjectBasicUsage() {
  const Button = styledObject('button', {
    display: 'flex'
  });

  const ButtonText = styledObject('p', {
    color: 'red'
  });

  return (
    <>
      <Button>
        <ButtonText>Hello World</ButtonText>
      </Button>
    </>
  );
}

export function styledSetUsage() {
  const { P, H1 } = styledSet({
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
      H1: {
        lineHeight: '1.3',
        as: 'h1'
      }
    }
  });

  return (
    <>
      <P>Hello Paragraph!</P>
      <H1>Hello Large Paragraph</H1>
    </>
  );
}

export default {
  title: 'Components/Styled'
};
