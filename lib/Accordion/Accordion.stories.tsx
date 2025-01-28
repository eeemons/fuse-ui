import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="item-1">
        <AccordionTrigger id="item-1">What is Fuse UI?</AccordionTrigger>
        <AccordionContent id="item-1">
          Fuse UI is a modern React component library built with TypeScript and
          Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="section-1">
        <AccordionTrigger id="section-1">First Section</AccordionTrigger>
        <AccordionContent id="section-1">
          Content for the first section goes here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="section-2">
        <AccordionTrigger id="section-2">Second Section</AccordionTrigger>
        <AccordionContent id="section-2">
          Content for the second section goes here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="section-3">
        <AccordionTrigger id="section-3">Third Section</AccordionTrigger>
        <AccordionContent id="section-3">
          Content for the third section goes here.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion defaultIndex="section-1">
      <AccordionItem id="section-1">
        <AccordionTrigger id="section-1">Open by Default</AccordionTrigger>
        <AccordionContent id="section-1">
          This section is open by default using the defaultIndex prop.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="section-2">
        <AccordionTrigger id="section-2">Another Section</AccordionTrigger>
        <AccordionContent id="section-2">
          This is another section that starts closed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItem: Story = {
  render: () => (
    <Accordion>
      <AccordionItem id="enabled">
        <AccordionTrigger id="enabled">Enabled Section</AccordionTrigger>
        <AccordionContent id="enabled">
          This section can be toggled normally.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem id="disabled" disabled>
        <AccordionTrigger id="disabled">Disabled Section</AccordionTrigger>
        <AccordionContent id="disabled">
          This section cannot be toggled because it's disabled.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Accordion className="border rounded-lg">
      <AccordionItem id="styled" className="p-2">
        <AccordionTrigger id="styled" className="text-blue-600">
          Custom Styled Section
        </AccordionTrigger>
        <AccordionContent id="styled" className="bg-gray-50">
          This section has custom styles applied using className props.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
