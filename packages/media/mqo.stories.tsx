import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { mqo } from './src';

const MediaStyledObject = styled('div')(() => ({
  display: 'block',
  width: '400px',
  height: '400px',
  background: 'orange',
  ...mqo('width >= 768px', {
    background: 'purple'
  })
}));

export default {
  title: 'Media/mqo',
  component: MediaStyledObject
} as ComponentMeta<any>;

const Template: ComponentStory<any> = args => <MediaStyledObject {...args} />;

export const Primary = Template.bind({});
