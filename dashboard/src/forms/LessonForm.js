import React from 'react';
import {Form, FormText, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {validString} from '../rgx/regex'
import AudioRecorder from '../components/AudioRecorder';
import MyForm from '../common/MyForm';

export default class LessonForm extends MyForm {

    constructor(props){
        super(props);

        this.inputNames = ["name", "description", "picture"];        
        this.state = {dictionnary_id: this.props.dictionnary_id};

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        super.initState(this.inputNames);
    }
    
    formValidation () {
    }

    render() {
        return (
            <Form>
                <FormGroup className='mx-2'>
                    <Label className='text-left mr-4' for="name">
                        Nom:
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required />
                </FormGroup>
                <FormGroup className='mx-2 mb-3'>
                    <Label className='text-left' for="pivotLanguage">
                        Langue pivot:
                    </Label>
                    <Input
                        id="pivotLanguage"
                        name="pivotLanguage"
                        value={this.state.pivotLanguage}
                        onChange={this.handleChange}
                        required />
                </FormGroup>
                <FormGroup className='mx-2 mb-3' >
                    <Label for="flagFile">
                        Drapeau
                    </Label>
                    <Col>
                        <Input id="flagFile" name="flagFile" type="file" onChange={this.handleChange}/>
                        <FormText>
                            Ajouter un drapeau
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup className='mx-2 mb-3'>
                    <Label className='text-left' for="rawName">
                        Nom du dictionnaire en brut (en anglais: language_from_pivotlanguage):
                    </Label>                  
                    <Input
                        id="rawName"
                        name="rawName"
                        value={this.state.rawName}
                        onChange={this.handleChange}
                        required />
                </FormGroup>
            </Form>             
        );
    }

}