import type { Meta, StoryObj } from '@storybook/react';
import { DocumentPreview } from './DocumentPreview';

const meta: Meta<typeof DocumentPreview> = {
  title: 'Molecules/DocumentPreview',
  component: DocumentPreview,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A **DocumentPreview component** for displaying document previews with actions.

#### Key Features:

- 📝 **Editable title**: Optional edit button for the title
- ➕ **New button**: Create new documents
- 👁️ **Preview area**: Display document preview
- 🔘 **Action buttons**: Multiple actions (Edit, Download, etc.)

#### Example Usage:

\`\`\`jsx
<DocumentPreview
  title="My Resume"
  isEditable={true}
  onEdit={() => console.log('Edit')}
  onNew={() => console.log('New')}
  preview={<div>Preview content</div>}
  actions={[
    { label: 'Edit', icon: '✏️', onClick: () => {} },
    { label: 'Download', icon: '⬇️', onClick: () => {} }
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
      description: 'Document title'
    },
    isEditable: {
      control: 'boolean',
      description: 'Show edit button for title'
    },
    onEdit: {
      action: 'edit clicked',
      description: 'Callback when edit button is clicked'
    },
    onNew: {
      action: 'new clicked',
      description: 'Callback when new button is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DocumentPreview>;

export const WithDocument: Story = {
  args: {
    title: 'My Professional CV',
    isEditable: true,
    preview: (
      <div style={{ padding: '1rem', background: '#fff', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 1rem 0', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem' }}>
          John Doe
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ margin: 0, fontWeight: 600, color: '#333', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem' }}>
            CONTACT
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: '#333', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem' }}>
            SUMMARY
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: '#333', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem' }}>
            EXPERIENCE
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: '#333', borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem' }}>
            EDUCATION
          </p>
        </div>
      </div>
    ),
    actions: [
      { label: 'Edit', icon: '✏️', onClick: () => console.log('Edit') },
      { label: 'Download', icon: '⬇️', onClick: () => console.log('Download') },
      { label: 'Online resume', icon: '🌐', onClick: () => console.log('Online') }
    ]
  }
};

export const EmptyDocument: Story = {
  args: {
    title: 'Document untitled',
    isEditable: false,
    preview: (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '300px', 
        color: '#999', 
        textAlign: 'center' 
      }}>
        <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>No documents yet</p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.875rem' }}>Create your first resume to get started</p>
      </div>
    ),
    actions: []
  }
};

export const WithNewButton: Story = {
  args: {
    title: 'My CV',
    isEditable: true,
    preview: (
      <div style={{ padding: '1rem', background: '#f9f9f9', minHeight: '300px' }}>
        <p>Document preview content</p>
      </div>
    ),
    actions: [
      { label: 'Edit', icon: '✏️', onClick: () => console.log('Edit') },
      { label: 'Download', icon: '⬇️', onClick: () => console.log('Download') }
    ]
  }
};

export const MinimalActions: Story = {
  args: {
    title: 'Quick Document',
    isEditable: false,
    preview: (
      <div style={{ padding: '2rem', background: '#fff', textAlign: 'center' }}>
        <p>Minimal document preview</p>
      </div>
    ),
    actions: [
      { label: 'View', icon: '👁️', onClick: () => console.log('View') }
    ]
  }
};

