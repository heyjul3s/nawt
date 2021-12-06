import React from 'react';
import { GridItem } from '../src/GridItem';
import { render } from '@testing-library/react';

describe('GridItem', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<GridItem>Grid Item</GridItem>);
    expect(asFragment()).toMatchSnapshot();
  });
});
