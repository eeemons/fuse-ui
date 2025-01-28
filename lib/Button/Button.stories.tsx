import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",

      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "danger",
        "success",
      ],
      description: "Changes the visual style of the button",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Controls the size of the button",
    },
    tooltip: {
      control: "text",
      description:
        "Add tooltip - use boolean for button text or string for custom text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

export const Success: Story = {
  args: {
    children: "Success Button",
    variant: "success",
  },
};

export const WithIcons: Story = {
  args: {
    children: "Button with Icons",
    leftIcon: "←",
    rightIcon: "→",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Buttons can include icons on the left and right sides. Use the `leftIcon` and `rightIcon` props to add icons to the button. The icons can be any valid React node.",
      },
    },
  },
};

export const WithTooltipText: Story = {
  args: {
    children: "Hover me",
    tooltip: "Custom tooltip text",
  },
};

export const WithTooltipBoolean: Story = {
  args: {
    children: "This text becomes tooltip",
    tooltip: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading State",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
};

export const Active: Story = {
  args: {
    children: "Active Button",
    isActive: true,
  },
};
