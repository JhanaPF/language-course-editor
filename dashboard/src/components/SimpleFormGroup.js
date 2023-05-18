import React from "react";
import { Input } from "reactstrap";
import MyFormGroup from "./MyFormGroup";
import { capitalizeFirstLetter } from "../utils/stringUtils";

/**
 * 
 * @param {ObjectId} id 
 * @param {*} value 
 * @param {Function} handleChange 
 * @param {string} text 
 * @param {boolean} required 

 * @returns Formfroup with label and input
 */
export default function SimpleFormGroup (props) {
    return (
        <MyFormGroup text={capitalizeFirstLetter(props.text)} inputId={props.id}>
            <Input
                type={props.type ? props.type : null}
                id={props.id}
                name={props.id}
                value={props.value}
                onChange={props.handleChange} 
                maxLength={100}
                required={props.required}/>
        </MyFormGroup>
    )
}