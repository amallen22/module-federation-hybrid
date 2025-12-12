import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from './ActionCard';

const meta: Meta<typeof ActionCard> = {
  title: 'Molecules/ActionCard',
  component: ActionCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A **ActionCard component** for displaying actionable content with badges.

#### Key Features:

- 🏷️ **Badge variants**: next-step, recommended, essential
- 🎯 **Action button**: Optional call-to-action
- 🎨 **Gradient badges**: Eye-catching color gradients
- 📦 **Flexible content**: Support for custom children

#### Example Usage:

\`\`\`jsx
<ActionCard
  badge="NEXT STEP"
  badgeVariant="next-step"
  title="Get your resume reviewed"
  description="Professional feedback in seconds"
  actionText="Request review"
  onAction={() => console.log('Action!')}
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    badge: {
      control: 'text',
      description: 'Badge text displayed at the top'
    },
    badgeVariant: {
      control: 'select',
      options: ['next-step', 'recommended', 'essential'],
      description: 'Badge color variant'
    },
    title: {
      control: 'text',
      description: 'Card title'
    },
    description: {
      control: 'text',
      description: 'Card description text'
    },
    actionText: {
      control: 'text',
      description: 'Text for the action button'
    },
    onAction: {
      action: 'action clicked',
      description: 'Callback when action button is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

export const NextStep: Story = {
  args: {
    badge: 'NEXT STEP',
    badgeVariant: 'next-step',
    title: 'Get your resume reviewed by experts',
    description: 'Receive professional feedback in seconds, then apply to your dream job.',
    actionText: 'Request resume review'
  }
};

export const Recommended: Story = {
  args: {
    badge: 'RECOMMENDED',
    badgeVariant: 'recommended',
    title: 'Every resume needs a cover letter',
    description: 'Double your chances with a customized cover letter.',
    actionText: 'Create cover letter'
  }
};

export const Essential: Story = {
  args: {
    badge: 'ESSENTIAL',
    badgeVariant: 'essential',
    title: 'Discover your online resume',
    description: 'Copy and paste a unique URL for easy sharing and keep track of views.',
    actionText: 'View my online resume'
  }
};

export const WithoutBadge: Story = {
  args: {
    title: 'Simple Action Card',
    description: 'This card has no badge at the top.',
    actionText: 'Take action'
  }
};

export const WithCustomContent: Story = {
  args: {
    badge: 'NEXT STEP',
    badgeVariant: 'next-step',
    title: 'Card with custom content',
    description: 'This card includes additional custom children.',
    actionText: 'Get started',
    children: (
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>Custom content can be added here</p>
      </div>
    )
  }
};

