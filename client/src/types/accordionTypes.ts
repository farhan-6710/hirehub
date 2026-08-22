interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

export interface AccordionComponentProps {
  data: AccordionItem[];
  multipleOpen?: boolean;
}