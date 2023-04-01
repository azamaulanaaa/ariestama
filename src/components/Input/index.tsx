import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    forwardRef,
    MouseEventHandler,
    MouseEvent,
    useRef,
    useImperativeHandle,
} from 'react';

export interface InputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    sugestionitems?: SugestionItemData[];
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const handleClick = (value: string) => {
        if (!innerRef.current) return;

        innerRef.current.value = value;
    };

    return (
        <span className="relative inline-block">
            <input
                className="w-full border rounded p-2"
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
                ref={innerRef}
            />
            <Sugestion
                sugestionitems={props.sugestionitems}
                onClick={handleClick}
            />
        </span>
    );
});

interface SugestionProps {
    sugestionitems?: SugestionItemData[];
    onClick?: (value: string) => void;
}

const Sugestion = (props: SugestionProps) => {
    if (!props.sugestionitems) return null;

    const handleClick = (value: string) => (event: MouseEvent<HTMLElement>) => {
        if (!props.onClick) return;

        props.onClick(value);
    };

    return (
        <ul role="menu" className="absolute w-full z-10">
            {props.sugestionitems.map((data, index) => (
                <SugestionItem
                    key={index}
                    data={data}
                    onClick={handleClick(data.value)}
                />
            ))}
        </ul>
    );
};

interface SugestionItemProps {
    data: SugestionItemData;
    onClick?: MouseEventHandler<HTMLElement>;
}

const SugestionItem = (props: SugestionItemProps) => {
    return (
        <li role="menuitem" onClick={props.onClick}>
            <p className="font-bold">{props.data.value}</p>
            <p>{props.data.description}</p>
        </li>
    );
};

interface SugestionItemData {
    value: string;
    description?: string;
}

export default Input;
