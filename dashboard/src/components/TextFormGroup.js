


import React from "react";
import { Input } from "reactstrap";
import MyFormGroup from "./MyFormGroup";

export default function TextFormGroup (props) {
    return (
        <MyFormGroup text={props.text}>
            <Input
                id={props.value}
                name={props.value}
                value={props.value}
                onChange={props.handleChange} />
        </MyFormGroup>
    )
}