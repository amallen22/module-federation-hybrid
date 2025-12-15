import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    menuItems: {
      description: 'Array de items del menú de navegación',
    },
    userName: {
      control: 'text',
      description: 'Nombre del usuario mostrado en el navbar',
    },
    userAvatar: {
      control: 'text',
      description: 'URL de la imagen del avatar del usuario',
    },
    language: {
      control: 'select',
      options: ['en', 'es', 'fr', 'de'],
      description: 'Idioma seleccionado (ISO code)',
    },
    showUpgrade: {
      control: 'boolean',
      description: 'Mostrar u ocultar el botón de upgrade',
    },
    onMenuItemClick: { action: 'menu item clicked' },
    onUpgradeClick: { action: 'upgrade clicked' },
    onLanguageClick: { action: 'language clicked' },
    onUserMenuClick: { action: 'user menu clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    menuItems: [
      { label: 'Dashboard', path: '/dashboard', isActive: true },
      { label: 'Documents', path: '/documents', badge: 3 },
      { label: 'Resume review', path: '/resume-review', hasNotification: true },
    ],
    userName: 'David Soriano',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    language: 'en',
    showUpgrade: true,
  },
};

export const WithoutUpgrade: Story = {
  args: {
    ...Default.args,
    showUpgrade: false,
  },
};

export const SpanishLanguage: Story = {
  args: {
    ...Default.args,
    menuItems: [
      { label: 'Panel', path: '/dashboard', isActive: true },
      { label: 'Documentos', path: '/documents', badge: 3 },
      { label: 'Revisión de CV', path: '/resume-review', hasNotification: true },
    ],
    userName: 'Juan Pérez',
    language: 'es',
  },
};

export const WithoutAvatar: Story = {
  args: {
    ...Default.args,
    userAvatar: undefined,
  },
};

export const LongUserName: Story = {
  args: {
    ...Default.args,
    userName: 'Christopher Alexander Johnson',
  },
};

export const ManyMenuItems: Story = {
  args: {
    ...Default.args,
    menuItems: [
      { label: 'Dashboard', path: '/dashboard', isActive: true },
      { label: 'Documents', path: '/documents', badge: 3 },
      { label: 'Resume review', path: '/resume-review', hasNotification: true },
      { label: 'Cover letters', path: '/cover-letters', badge: 1 },
      { label: 'Settings', path: '/settings' },
    ],
  },
};

export const WithCustomLogo: Story = {
  args: {
    ...Default.args,
    logoComponent: (
      <div style={{ padding: '8px 16px', background: '#26A0F4', borderRadius: '4px', color: 'white', fontWeight: 'bold' }}>
        MyBrand
      </div>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    menuItems: [],
    userName: 'New User',
    showUpgrade: false,
  },
};


