import { Button } from "fuse-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../lib/Accordion/Accordion";

function App() {
  return (
    <>
      <h1 className="text-xl">
        <Button>Test</Button>

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
      </h1>
    </>
  );
}

export default App;
