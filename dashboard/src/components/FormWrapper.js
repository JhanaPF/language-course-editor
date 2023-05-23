import React from "react";
import { Form, Button, Row } from "reactstrap";

/**
 * 
 * @param {*} props children, isValid
 * @returns 
 */
export default function FormWrapper (props) {
    // Wrapper for forms

    const submit=(e)=>{
        //console.log(e)
        e.preventDefault();
        props.submit();
    }

    return (
        <Form className="mx-4" onSubmit={(e)=>submit(e)}>
            {props.children}
            <Row className="m-3">
                <Button type="submit" color={props.isValid && "success"} className="mx-2 ml-auto" outline>Valider</Button>
            </Row>
        </Form>
    );
}