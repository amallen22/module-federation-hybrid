import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      // Añadir configuraciones personalizadas de Vite si es necesario
    });
  }
};

export default config;