import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A **Card component** for grouping related content.

#### Key Features:

- 🎨 **Multiple variants**: Default, Action, and Document styles
- 🔲 **Flexible**: Can be rendered as div, article, or section
- 🎯 **Clickable**: Optional onClick handler
- ♿ **Accessible**: Proper semantic HTML

#### Example Usage:

\`\`\`jsx
<Card variant="default">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'action', 'document'],
      description: 'Visual style variant of the card'
    },
    as: {
      control: 'select',
      options: ['div', 'article', 'section'],
      description: 'HTML element to render as'
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <h2>Card Title</h2>
        <p>This is a default card with some content inside.</p>
      </>
    )
  }
};

export const Action: Story = {
  args: {
    variant: 'action',
    children: (
      <>
        <h2>Action Card</h2>
        <p>This card is styled for action items.</p>
      </>
    )
  }
};

export const Document: Story = {
  args: {
    variant: 'document',
    children: (
      <>
        <h2>Document Card</h2>
        <p>This card is styled for document previews.</p>
      </>
    )
  }
};

export const Clickable: Story = {
  args: {
    variant: 'default',
    onClick: () => alert('Card clicked!'),
    children: (
      <>
        <h2>Clickable Card</h2>
        <p>Click anywhere on this card to trigger an action.</p>
      </>
    )
  }
};

export const AsArticle: Story = {
  args: {
    variant: 'default',
    as: 'article',
    children: (
      <>
        <h2>Article Card</h2>
        <p>This card renders as an article element for semantic HTML.</p>
      </>
    )
  }
};

