import React from "react";
import { Button } from "reactstrap";

export default function AddButton (props) {
    return(
        <Button onClick={props.addFunction}>
            {props.children ? props.children : "+"}
        </Button>
    )
}