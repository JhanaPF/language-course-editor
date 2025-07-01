import React from 'react'
import { Button } from 'reactstrap'

export default function ReturnButton(props) {
    const style= {
        position: 'absolute',
        top: '20px',
        left: '20px',
    }

    return (
        <Button style={style} onClick={props.goBack}>
            <i style={{ fontSize: 25 }} className="bi bi-arrow-left-circle text-center m-auto"></i>
        </Button>
    )
}
