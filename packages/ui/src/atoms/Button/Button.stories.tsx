import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Icon } from '../Icon';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A **button component** for user interactions.

#### Key Features:

- 🎨 **Multiple variants**: Primary, Secondary, and Gradient styles
- 📏 **Sizes**: Small (S) and Medium (M)
- 🔲 **Shapes**: Rounded and Square
- 📐 **Full width**: Option to span full container width
- ♿ **Accessible**: Proper ARIA attributes and keyboard support

#### Example Usage:

\`\`\`jsx
<Button variant="primary" size="M" shape="rounded">
  Click me
</Button>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'gradient'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: 'select',
      options: ['S', 'M'],
      description: 'Size of the button'
    },
    shape: {
      control: 'select',
      options: ['rounded', 'square'],
      description: 'Border radius shape'
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Make button span full width of container'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction'
    },
    children: {
      control: 'text',
      description: 'Button content'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};

export const Gradient: Story = {
  args: {
    children: 'Gradient Button',
    variant: 'gradient'
  }
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Icon name="drag_indicator" />
        <span>Button with Icon</span>
        <Icon name="drag_indicator" />
      </>
    ),
    variant: 'primary'
  }
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'S',
    variant: 'primary'
  }
};

export const Rounded: Story = {
  args: {
    children: 'Rounded Button',
    shape: 'rounded',
    variant: 'primary'
  }
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    isFullWidth: true,
    variant: 'primary'
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'primary'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button variant="gradient" disabled>
        Gradient Disabled
      </Button>
    </div>
  )
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="S" variant="primary">
        Small
      </Button>
      <Button size="M" variant="primary">
        Medium
      </Button>
    </div>
  )
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button shape="square" variant="primary">
        Square
      </Button>
      <Button shape="rounded" variant="primary">
        Rounded
      </Button>
    </div>
  )
};

