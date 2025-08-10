import React from 'react';
import { Button } from 'reactstrap';

interface AddButtonProps {
    addFunction: () => void;
    className?: string;
    children?: React.ReactNode;
}

export default function AddButton(props: AddButtonProps) {
    return (
        <Button className={'mt-1 ' + (props.className || '')} onClick={props.addFunction}>
            {props.children ? props.children : '+'}
        </Button>
    );
}
