import React from "react";
import { Input } from "reactstrap";
import MyFormGroup from "./MyFormGroup";

/**
 * 
 * @param {*} props id, value, handleChange, text
 * @returns Formfroup with label and input
 */
export default function TextFormGroup (props) {
    return (
        <MyFormGroup text={props.text}>
            <Input
                type={props.type ? props.type : null}
                id={props.id}
                name={props.id}
                value={props.value}
                onChange={props.handleChange} 
                maxLength={100}/>
        </MyFormGroup>
    )
}