import type { Meta, StoryObj } from "@storybook/react";
import Tree from "./Tree";
import { TreeData } from "./Tree";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tree>;

const sampleData: TreeData = [
  {
    id: "1",
    label: "Root",
    children: [
      {
        id: "1-1",
        label: "Branch 1",
        children: [
          { id: "1-1-1", label: "Leaf 1" },
          { id: "1-1-2", label: "Leaf 2" },
        ],
      },
      {
        id: "1-2",
        label: "Branch 2",
        children: [
          { id: "1-2-1", label: "Leaf 3" },
          { id: "1-2-2", label: "Leaf 4" },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    draggable: false,
    showLines: true,
    defaultExpandAll: false,
    selectable: true,
    selectedKeys: [],
  },
};

export const DraggableTree: Story = {
  args: {
    ...Default.args,
    draggable: true,
  },
};

export const ExpandedTree: Story = {
  args: {
    ...Default.args,
    defaultExpandAll: true,
  },
};

export const WithoutLines: Story = {
  args: {
    ...Default.args,
    showLines: false,
  },
};

export const PreselectedNodes: Story = {
  args: {
    ...Default.args,
    selectedKeys: ["1-1-1", "1-2-2"],
  },
};

export const DisabledNodes: Story = {
  args: {
    ...Default.args,
    data: [
      {
        id: "1",
        label: "Root",
        children: [
          {
            id: "1-1",
            label: "Disabled Branch",
            disabled: true,
            children: [{ id: "1-1-1", label: "Leaf 1" }],
          },
          {
            id: "1-2",
            label: "Active Branch",
            children: [{ id: "1-2-1", label: "Leaf 2" }],
          },
        ],
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    ...Default.args,
    data: [
      {
        id: "1",
        label: "Root",
        icon: "📁",
        children: [
          {
            id: "1-1",
            label: "Documents",
            icon: "📂",
            children: [{ id: "1-1-1", label: "Report", icon: "📄" }],
          },
          {
            id: "1-2",
            label: "Images",
            icon: "🖼️",
            children: [{ id: "1-2-1", label: "Photo", icon: "📸" }],
          },
        ],
      },
    ],
  },
};
