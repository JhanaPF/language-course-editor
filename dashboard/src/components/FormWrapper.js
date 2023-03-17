import React from "react";
import { Form, Button, Row } from "reactstrap";

export default function FormWrapper (props) {
    // Wrapper for forms

    return (
        <Form className="">
            {props.children}
            <Row className="m-3">
                <Button className="mx-2 ml-auto" onClick={props.submit}>Valider</Button>
            </Row>
        </Form>
    )
}