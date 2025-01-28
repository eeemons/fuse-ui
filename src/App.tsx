import { Accordion, Button } from "fuse-ui";
import { Sidebar } from "fuse-ui";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../lib/Accordion/Accordion";

function App() {
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
      </div>
    </>
  );
}

export default App;
