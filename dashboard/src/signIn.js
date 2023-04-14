import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {  Form, FormGroup, Input, Label, Button, Col} from 'reactstrap';
import {validEmail, validPassword} from './rgx/regex';
import TextFormGroup from './components/TextFormGroup';
import { post } from './apiRequests';

/**
 * @param props: signIn()
 */
class SignIn extends React.Component {

    constructor(){
        super();

        const keepConnection = localStorage.getItem("keepConnection");

        this.state={
            email: '',
            password: '',
            mailError: false,
            passwordError: false,
            mailValid: false,
            passwordValid: false,
            keepConnection,
        }   

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange = (event) => {
        const {name, value} = event.currentTarget;
        if(value.length > 150) return;
        
        if(name === "email") this.setState({ mailError: !validEmail.test(value)}); 

        if(name === "password") this.setState({passwordError: !validPassword.test(value)});

        this.setState({ [name] : value });
    }

    handleSubtmit(){
        const mailError= !validEmail.test(this.state.email);
        const passwordError= !validPassword.test(this.state.password);

        if(mailError || passwordError) return this.setState({mailError, passwordError});
        
        if(this.state.keepConnection){        
            localStorage.setItem('mail', this.state.email);
            localStorage.setItem('password', this.state.password);
            localStorage.setItem('keepConnection', this.state.keepConnection);
        }

        this.props.signIn(this.state.email, this.state.password);
    }

    handleChekbox(event){
        const checked = event.currentTarget.checked;
        this.setState({keepConnection: checked});
    }

    render() {        
        return (                
            <div className='border mx-auto mt-5' style={{borderRadius: 15, height:275, width:415 }}>
            <Form>
                <FormGroup >
                    <Col className='text-left mt-2' md="10">
                        <Label className='bg-white' for="email">
                            Courriel :
                        </Label>  
                    </Col>                         
                    <Col>             
                        <Input
                            id="email"
                            name="email"
                            placeholder="Adresse mail"
                            type="email"
                            className='bg-white'
                            value={this.state.email}
                            onChange={this.handleChange}
                            invalid={this.state.mailError}
                            required                                    
                        />
                    </Col>   
                </FormGroup>
                {' '}
                <FormGroup>
                    <Col className='text-left'>
                        <Label className=' mr-auto bg-white' for="Password">
                            Mot de passe :
                        </Label> 
                    </Col>  
                    <Col>           
                        <Input
                            id=" Password"
                            name="password"
                            placeholder="Mot de passe"
                            type="password"
                            className='bg-white'
                            value={this.state.password}
                            onChange={this.handleChange}
                            invalid={this.state.passwordError}
                            required
                        />
                    </Col>   
                </FormGroup>
                <TextFormGroup type="checkbox" id="keepConnection" value={this.state.keepConnection} handleChange={this.handleChekbox.bind(this)} text="Restez connecté"/>
                
                <Col md="6" className='ml-auto'>
                    <Button className=' position-absoluto r-0 text-right ml-auto text-dark bg-white' onClick={this.handleSubtmit.bind(this)}>
                        Connexion
                    </Button>                        
                </Col>
            </Form>    
            </div>
   
        );
    }
}

export default SignIn;