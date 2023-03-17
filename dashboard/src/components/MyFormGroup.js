import React from "react";
import { FormGroup, Label,  } from "reactstrap";

export default function MyFormGroup (props) {
    return (
        <FormGroup className='mx-2 mb-3'>
            <Label className='text-left' for="pivotLanguage">
                {props.text}:
            </Label>
            {props.children}
        </FormGroup>)
}