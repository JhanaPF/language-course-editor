import React from 'react'
import { Button } from 'reactstrap'

export default function AddButton (props) {
    return (
        <Button className="ml-5" onClick={props.goBack}>
            <i style={{ fontSize: 25 }} className="bi bi-arrow-left-circle text-center m-auto"></i>
        </Button>
    )
}
