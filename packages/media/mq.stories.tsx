import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mq } from './src';

const MediaStyled = styled.div`
  display: block;
  width: 400px;
  height: 400px;
  background orange;

  ${mq('width >= 768px')`
    background: red;
  `}
`;

export default {
  title: 'Media/mq',
  component: MediaStyled
} as ComponentMeta<any>;

const Template: ComponentStory<any> = args => <MediaStyled {...args} />;

export const Primary = Template.bind({});
