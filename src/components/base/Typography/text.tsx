import { ReactNode } from 'react';

export interface TextProps {
    children: ReactNode;
    italic?: boolean;
    bold?: boolean;
    underline?: boolean;
}
const Text = (props: TextProps) => {
    let classNames = [];
    if (props.italic) classNames.push('italic');
    if (props.bold) classNames.push('font-bold');
    if (props.underline) classNames.push('underline');

    return <span className={classNames.join(' ')}>{props.children}</span>;
};

export default Text;
