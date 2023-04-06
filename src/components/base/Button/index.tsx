import { ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
    fullWidth?: boolean;
}

const Button = (props: ButtonProps) => {
    let classNames = ['border', 'rounded', 'p-2'];
    if (props.fullWidth) classNames.push('w-full');

    return <button className={classNames.join(' ')}>{props.children}</button>;
};

export default Button;
