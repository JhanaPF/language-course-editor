import React from "react";
import { Form, Button, Row } from "reactstrap";

export default function FormWrapper (props) {
    // Wrapper for forms

    const submit=(e)=>{
        console.log(e)
        e.preventDefault();
        props.submit();
    }

    return (
        <Form onSubmit={(e)=>submit(e)}>
            {props.children}
            <Row className="m-3">
                <Button type="submit" color="success" className="mx-2 ml-auto" outline>Valider</Button>
            </Row>
        </Form>
    )
}