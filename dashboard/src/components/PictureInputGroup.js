import React from "react";
import {FormText, FormGroup, Input, Label, Col} from 'reactstrap';


export default function PictureInputGroup (props) {
    return (
        <FormGroup className='mx-2 mb-3' >
            <Label for={props.name}>
                {props.text}:
            </Label>
            <Col>
                <Input type="file" id={props.name} name={props.name} onChange={(event)=>props.onChange(event)}/>
                <FormText>{props.description}</FormText>
            </Col>
        </FormGroup>
    )
}