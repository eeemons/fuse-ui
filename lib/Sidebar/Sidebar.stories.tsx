import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar";
import { useState } from "react";

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const NotificationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A versatile sidebar component with support for custom icons, links, headers, and themes.",
      },
    },
  },
  decorators: [
    (Story, context) => {
      const [isOpen, setIsOpen] = useState(context.args.isOpen || false);
      const darkMode = context.args.darkMode || false;
      
      const args = {
        ...context.args,
        isOpen,
        onClose: () => setIsOpen(false),
        onToggle: () => setIsOpen(!isOpen),
      };

      return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          <Story args={args} />
          <div className={`ml-16 ${args.position === "right" ? "mr-16" : ""}`}>
            <main className="max-w-4xl mx-auto p-4">
              <div className={`rounded-lg p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
                <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Click the hamburger menu icon to toggle the sidebar.
                  {args.showCloseButton && " You can also use the close button in the sidebar header."}
                </p>
              </div>
            </main>
          </div>
        </div>
      );
    },
  ],
  argTypes: {
    links: {
      description: 'Array of links to be displayed in the sidebar',
      control: 'object',
    },
    header: {
      description: 'Header configuration for the sidebar',
      control: 'object',
    },
    position: {
      description: 'Position of the sidebar',
      control: 'radio',
      options: ['left', 'right'],
      defaultValue: 'left',
    },
    width: {
      description: 'Width of the sidebar',
      control: 'text',
      defaultValue: 'w-64',
    },
    darkMode: {
      description: 'Enable dark theme',
      control: 'boolean',
      defaultValue: false,
    },
    iconSize: {
      description: 'Size of the toggle and close icons',
      control: 'radio',
      options: ['small', 'medium', 'large'],
      defaultValue: 'small',
    },
    showCloseButton: {
      description: 'Show/hide the close button',
      control: 'boolean',
      defaultValue: true,
    },
    isOpen: {
      description: 'Controls the open/closed state of the sidebar',
      control: 'boolean',
      defaultValue: false,
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onToggle: () => {},
    links: [
      {
        label: "Dashboard",
        href: "#",
        icon: <DashboardIcon />,
      },
      {
        label: "Profile",
        href: "#",
        icon: <UserIcon />,
      },
      {
        label: "Notifications",
        onClick: () => alert("You have no new notifications"),
        icon: <NotificationIcon />,
      },
      {
        label: "Settings",
        href: "#",
        icon: <SettingsIcon />,
      },
      {
        label: "Documentation",
        href: "https://example.com/docs",
        isExternal: true,
      },
    ],
    header: {
      title: "My App",
      subtitle: "Navigation",
    },
  },
};

export const RightAligned: Story = {
  args: {
    ...Default.args,
    position: "right",
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    darkMode: true,
    className: "border-gray-700",
    header: {
      title: "Dark Theme",
      subtitle: "With dark mode enabled",
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const WideCustomStyle: Story = {
  args: {
    ...Default.args,
    width: "w-80",
    className: "border-r border-gray-200",
    header: {
      title: "Wide Sidebar",
      subtitle: "With custom width",
    },
  },
};

export const SmallIcon: Story = {
  args: {
    ...Default.args,
    iconSize: "small",
    header: {
      title: "Small Icon",
      subtitle: "Default size (16x16)",
    },
  },
};

export const MediumIcon: Story = {
  args: {
    ...Default.args,
    iconSize: "medium",
    header: {
      title: "Medium Icon",
      subtitle: "20x20 pixels",
    },
  },
};

export const LargeIcon: Story = {
  args: {
    ...Default.args,
    iconSize: "large",
    header: {
      title: "Large Icon",
      subtitle: "24x24 pixels",
    },
  },
};

export const WithoutCloseButton: Story = {
  args: {
    ...Default.args,
    showCloseButton: false,
    header: {
      title: "No Close Button",
      subtitle: "Using only toggle and click-outside",
    },
  },
};
