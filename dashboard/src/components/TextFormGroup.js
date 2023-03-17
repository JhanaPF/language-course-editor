


import React from "react";
import { Input } from "reactstrap";
import MyFormGroup from "./MyFormGroup";

export default function TextFormGroup (props) {
    return (
        <MyFormGroup text={props.text}>
            <Input
                id={props.id}
                name={props.id}
                value={props.value}
                onChange={props.handleChange} 
                maxLength={100}/>
        </MyFormGroup>
    )
}