import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from "@fluentui/react-accordion";
import { FC, ReactNode } from "react";

interface Item {
  header: ReactNode;
  panel: ReactNode;
}

interface Props {
  items: Item[];
}

export const SurveyAccordion: FC<Props> = ({ items }) => {
  return (
    <Accordion collapsible>
      {items.map((item, i) => (
        <AccordionItem key={i} value={i}>
          <AccordionHeader>{item.header}</AccordionHeader>
          <AccordionPanel>{item.panel}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
