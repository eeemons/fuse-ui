import { Accordion, Button } from "fuse-ui";
import { Sidebar } from "fuse-ui";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../lib/Accordion/Accordion";
import Tree, { TreeItem } from "../lib/Tree/Tree";

function App() {
  const sampleData: TreeItem[] = [
    {
      id: "1",
      label: "Root",
      children: [
        {
          id: "1-1",
          label: "Child 1",
          children: [
            {
              id: "1-1-1",
              label: "Grandchild 1",
              children: [
                {
                  id: "1-1-1-1",
                  label: "Grand Grandchild 1",
                },
                {
                  id: "1-1-1-2",
                  label: "Grand Grandchild 2",
                },
              ],
            },
          ],
        },
        {
          id: "1-2",
          label: "Child 2",
          children: [
            {
              id: "1-2-1",
              label: "Grandchild 1",
            },
            {
              id: "1-2-2",
              label: "Grandchild 2",
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <div className="text-xl">
        <Button>Test</Button>
        <Sidebar
          header={{
            subtitle: "Navigation",
            title: "My App",
          }}
          links={[
            {
              href: "#",
              label: "Dashboard",
            },
            {
              href: "#",
              label: "Profile",
            },
            {
              label: "Notifications",
              onClick: () => {},
            },
            {
              href: "#",
              label: "Settings",
            },
            {
              href: "https://example.com/docs",
              isExternal: true,
              label: "Documentation",
            },
          ]}
        />
        <Accordion>
          <AccordionItem id="item-1">
            <AccordionTrigger id="item-1">What is Fuse UI?</AccordionTrigger>
            <AccordionContent id="item-1">
              Fuse UI is a modern React component library built with TypeScript
              and Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Usage example */}
        <Tree
          data={sampleData}
          draggable={true}
          showLines
          defaultExpandAll
          selectable
          selectedKeys={[]}
          onNodeClick={(node) => console.log("Clicked:", node)}
          onSelect={(selectedKeys, node) =>
            console.log("Selected:", selectedKeys, node)
          }
          onNodeDrop={(draggedId, targetId) => {
            console.log(`Moved node ${draggedId} to ${targetId}`);
          }}
        />
      </div>
    </>
  );
}
export default App;
