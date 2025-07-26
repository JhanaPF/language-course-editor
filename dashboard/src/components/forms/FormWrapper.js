import React from 'react'
import { Form, Button, Row } from 'reactstrap'

/**
 * @param {function} submit
 * @param {jsx} children
 * @param {boolean} isValid
 */
export default function FormWrapper (props) {

    const submit = (e) => {
        // console.log(e)
        e.preventDefault()
        props.submit(e)
    }

    return (
        <Form className="mx-4" onSubmit={(e) => submit(e)}>
            {props.children}
            <Row className="m-3">
                <Button type="submit" color={props.isValid && 'success'} className="mx-2 ml-auto" outline>Valider</Button>
            </Row>
        </Form>
    )
}
