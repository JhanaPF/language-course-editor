import React from "react";
import { FormText, Input } from "reactstrap";
import MyFormGroup from "./MyFormGroup";
import { capitalizeFirstLetter } from "../utils/stringUtils";

/**
 * 
 * @param {ObjectId} id 
 * @param {*} value 
 * @param {Function} handleChange 
 * @param {string} text 
 * @param {boolean} required 
 * @param {string} formText
 * @returns Formfroup with label and input
 */
export default function SimpleFormGroup (props) {
    return (
        <MyFormGroup text={capitalizeFirstLetter(props.text)} inputId={props.id}>
            <Input
                type={props.type ? props.type : "text"}
                id={props.id}
                name={props.id}
                value={props.value}
                onChange={props.handleChange} 
                maxLength={1000}
                required={props.required}/>
            {props.formText && <FormText>{props.formText}</FormText> }
        </MyFormGroup>
    )
}