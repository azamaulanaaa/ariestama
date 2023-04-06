import { ReactNode } from 'react';

export interface ParagraphProps {
    children: ReactNode;
}
const Paragraph = (props: ParagraphProps) => {
    return <p>{props.children}</p>;
};

export default Paragraph;
