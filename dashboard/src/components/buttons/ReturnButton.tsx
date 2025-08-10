import React from 'react';
import { Button } from 'reactstrap';
import { CSSProperties } from "react";

interface ReturnButtonProps {
  goBack: () => void;
}

export default function ReturnButton(props: ReturnButtonProps) {
    const style: CSSProperties = {
        position: 'absolute',
        top: '20px',
        left: '20px',
    };

    return (
        <Button style={style} onClick={props.goBack}>
            <i style={{ fontSize: 25 }} className="bi bi-arrow-left-circle text-center m-auto"></i>
        </Button>
    );
}
