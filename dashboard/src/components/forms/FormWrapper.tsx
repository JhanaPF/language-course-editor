import React from 'react';
import { Form, Button, Row } from 'reactstrap';

interface FormWrapperProps {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;                             
  isValid?: boolean;                                     
}

export default function FormWrapper({ submit, children, isValid = true }: FormWrapperProps) {

    const sub = (e: any) => {
        // console.log(e)
        e.preventDefault();
        submit(e);
    }

    return (
        <Form className="mx-4" onSubmit={(e) => sub(e)}>
            {children}
            <Row className="m-3">
                <Button type="submit" color={isValid ? 'success' : ''} className="mx-2 ml-auto" outline>Valider</Button>
            </Row>
        </Form>
    );
}
