import { ReactNode } from 'react';

export interface HeadingProps {
    children: ReactNode;
    level: 1 | 2 | 3 | 4 | 5;
}

const Heading = (props: HeadingProps) => {
    switch (props.level) {
        case 1:
            return <h1 className="text-4xl font-bold">{props.children}</h1>;
        case 2:
            return <h2 className="text-3xl font-bold">{props.children}</h2>;
        case 3:
            return <h3 className="text-2xl font-bold">{props.children}</h3>;
        case 4:
            return <h4 className="text-xl font-bold">{props.children}</h4>;
        case 5:
            return <h5 className="text-lgfont-bold">{props.children}</h5>;
    }
};

export default Heading;
