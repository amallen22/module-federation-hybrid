import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A **icon component** for displaying icons in your application.

#### Key Features:

- ♿ **Accessible**: Proper roles and states for screen readers.
- 🎨 **Customizable**: Customize the icon with simple CSS.
- 📦 **Extensive icon library**: Get the right icon for the right job via S3 bucket.
- 🔄 **Caching**: Icons are cached to improve performance.

#### Example Usage:

\`\`\`jsx
<Icon name="add" />
\`\`\`
        `
      }
    }
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the icon to display'
    },
    'data-qa': {
      control: 'text',
      description: 'Data attribute for testing'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label for the icon'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'add'
  }
};

export const CheckCircle: Story = {
  args: {
    name: 'check_circle'
  }
};

export const Close: Story = {
  args: {
    name: 'close'
  }
};

export const WithAriaLabel: Story = {
  args: {
    name: 'add',
    'aria-label': 'Add new item'
  }
};

export const IconLibrary: Story = {
  render: () => {
    const iconNames = [
      'add',
      'ai_stars',
      'align_justify',
      'align_left',
      'apps',
      'arrow_back',
      'arrow_back_ios',
      'arrow_downward',
      'arrow_drop_down',
      'arrow_drop_down_circle',
      'arrow_drop_up',
      'arrow_forward',
      'arrow_forward_ios',
      'arrow_left',
      'arrow_right',
      'arrow_upward',
      'bin',
      'bulleted',
      'calendar',
      'cancel',
      'check',
      'check_circle',
      'chevron_left',
      'chevron_right',
      'close',
      'color',
      'contact',
      'copy',
      'create',
      'delete',
      'drag_indicator',
      'education',
      'error',
      'expand_less',
      'expand_more',
      'experience',
      'filter_none',
      'first_page',
      'font_size_default',
      'font_size_small',
      'format_align_justify',
      'format_align_left',
      'format_bold',
      'format_italic',
      'format_list_bulleted',
      'format_list_numbered',
      'format_underlined',
      'fullscreen',
      'fullscreen_exit',
      'help',
      'info',
      'lang',
      'last_page',
      'launch',
      'link',
      'link_off',
      'list_alt',
      'lock',
      'menu',
      'more_horiz',
      'more_vert',
      'numbered',
      'objective',
      'pdf',
      'plane',
      'refresh',
      'remove',
      'save_alt',
      'search',
      'speak',
      'stars',
      'studies',
      'test',
      'text_fields',
      'title',
      'translate',
      'unfold_less',
      'unfold_more',
      'upload',
      'visibility'
    ];

    return (
      <div>
        <p style={{ fontFamily: 'Roboto', marginBottom: '24px', color: '#666', fontSize: '14px' }}>
          Click on any icon name to copy it to your clipboard. Total: {iconNames.length} icons
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '20px',
            padding: '20px 0'
          }}
        >
          {iconNames.map((iconName) => (
            <IconCard key={iconName} iconName={iconName} />
          ))}
        </div>
      </div>
    );
  }
};

const IconCard = ({ iconName }: { iconName: string }) => {
  const handleIconClick = (iconName: string) => {
    navigator.clipboard.writeText(iconName);
    const toast = document.getElementById(`copied-${iconName}`);
    if (toast) {
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, 1200);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#f0f0f0';
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#fafafa';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div
      key={iconName}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
      onClick={() => handleIconClick(iconName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Toast iconName={iconName} />
      <div
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '12px'
        }}
      >
        <Icon name={iconName} />
      </div>
      <span
        style={{
          fontSize: '12px',
          fontWeight: '500',
          color: '#333',
          textAlign: 'center',
          lineHeight: '1.2',
          fontFamily: 'monospace',
          overflowWrap: 'anywhere'
        }}
      >
        {iconName}
      </span>
    </div>
  );
};

const Toast = ({ iconName }: { iconName: string }) => (
  <div
    id={`copied-${iconName}`}
    style={{
      margin: '8px auto',
      background: 'black',
      fontSize: '14px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '18px',
      display: 'none',
      fontFamily: 'monospace'
    }}
  >
    Copied!
  </div>
);

