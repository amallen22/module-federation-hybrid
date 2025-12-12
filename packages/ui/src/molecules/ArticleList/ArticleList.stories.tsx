import type { Meta, StoryObj } from '@storybook/react';
import { ArticleList } from './ArticleList';

const meta: Meta<typeof ArticleList> = {
  title: 'Molecules/ArticleList',
  component: ArticleList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
An **ArticleList component** for displaying a list of articles with read times.

#### Key Features:

- 📄 **Icon support**: Each article has a document icon
- ⏱️ **Read time**: Display estimated reading time
- 🔗 **Clickable**: Each article can be clicked
- 📋 **List format**: Clean, organized list display

#### Example Usage:

\`\`\`jsx
<ArticleList
  title="TOP READS"
  articles={[
    { title: 'Article 1', readTime: '5 min', onClick: () => {} },
    { title: 'Article 2', readTime: '3 min', onClick: () => {} }
  ]}
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the article list section'
    },
    articles: {
      description: 'Array of articles to display'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ArticleList>;

export const TopReads: Story = {
  args: {
    title: 'TOP READS',
    articles: [
      { title: 'Most Common Interview Questions', readTime: '9 min' },
      { title: 'How to Write a Resume that Gets Results', readTime: '4 min' },
      { title: 'Are Cover Letters Still Useful?', readTime: '5 min' },
      { title: 'How to Get a Job Fast', readTime: '6 min' },
      { title: 'Level Up Your Resume Using AI', readTime: '5 min' }
    ]
  }
};

export const ShortList: Story = {
  args: {
    title: 'QUICK READS',
    articles: [
      { title: 'Quick Tips for Your CV', readTime: '2 min' },
      { title: 'One Minute Resume Hack', readTime: '1 min' }
    ]
  }
};

export const LongList: Story = {
  args: {
    title: 'IN-DEPTH GUIDES',
    articles: [
      { title: 'Complete Guide to Career Change', readTime: '20 min' },
      { title: 'Master Your Job Interview', readTime: '15 min' },
      { title: 'Salary Negotiation Strategies', readTime: '12 min' },
      { title: 'Building Your Personal Brand', readTime: '18 min' },
      { title: 'Networking for Introverts', readTime: '14 min' },
      { title: 'Remote Work Best Practices', readTime: '10 min' },
      { title: 'Portfolio Development Guide', readTime: '16 min' }
    ]
  }
};

export const EmptyList: Story = {
  args: {
    title: 'ARTICLES',
    articles: []
  }
};

export const WithClickHandlers: Story = {
  args: {
    title: 'CLICKABLE ARTICLES',
    articles: [
      { 
        title: 'Click me!', 
        readTime: '3 min', 
        onClick: () => alert('Article 1 clicked!') 
      },
      { 
        title: 'Or click me!', 
        readTime: '5 min', 
        onClick: () => alert('Article 2 clicked!') 
      }
    ]
  }
};

