import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Input, Label, Button, Col } from 'reactstrap'
import { validEmail, validPassword } from '../utils/regex'

/**
 * @param props: signIn()
 */
const Login = ({ signIn }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mailError, setMailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [keepConnection, setKeepConnection] = useState(false)

    useEffect(() => {
        const savedKeepConnection = localStorage.getItem('keepConnection') === 'true'
        setKeepConnection(savedKeepConnection)
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.currentTarget
        if (value.length > 150) return

        if (name === 'email') {
            setMailError(!validEmail.test(value))
            setEmail(value)
        }

        if (name === 'password') {
            setPasswordError(!validPassword.test(value))
            setPassword(value)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const emailInvalid = !validEmail.test(email)
        const passwordInvalid = !validPassword.test(password)

        if (emailInvalid || passwordInvalid) {
            setMailError(emailInvalid)
            setPasswordError(passwordInvalid)
            return
        }

        if (keepConnection) {
            localStorage.setItem('mail', email)
            localStorage.setItem('password', password)
        }

        localStorage.setItem('keepConnection', keepConnection)
        signIn(email, password)
    }

    const handleCheckbox = (event) => {
        setKeepConnection(event.currentTarget.checked)
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 pb-5'>
            <div className='border' style={{ borderRadius: 15, height: 275, width: 415 }}>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Col className='text-left mt-2' md="10">
                            <Label className='bg-white' for="email">
                                Mail :
                            </Label>
                        </Col>
                        <Col>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Adresse mail"
                                type="email"
                                className='bg-white'
                                value={email}
                                onChange={handleChange}
                                invalid={mailError}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col className='text-left'>
                            <Label className='mr-auto bg-white' for="password">
                                Mot de passe :
                            </Label>
                        </Col>
                        <Col>
                            <Input
                                id="password"
                                name="password"
                                placeholder="Mot de passe"
                                type="password"
                                className='bg-white'
                                value={password}
                                onChange={handleChange}
                                invalid={passwordError}
                                required
                            />
                        </Col>
                    </FormGroup>

                    {/* Restez connecté */}
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={keepConnection}
                                onChange={handleCheckbox}
                            />{' '}
                            Restez connecté
                        </Label>
                    </FormGroup>

                    <Col md="6" className='ml-auto'>
                        <Button type="submit" className='position-absoluto r-0 text-right ml-auto text-dark bg-white'>
                            Connexion
                        </Button>
                    </Col>
                </Form>
            </div>
        </div>
    )
}

export default Login