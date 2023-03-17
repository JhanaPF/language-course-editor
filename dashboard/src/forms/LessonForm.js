import React from 'react';
import {Form, FormText, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {validString} from '../rgx/regex'
import AudioRecorder from '../components/AudioRecorder';

export default class LessonForm extends React.Component {

    constructor(props){
        super(props);
        this.inputNames = ["dictionnary_id", "name", "description", "picture"];
        
        let state = {};
        this.inputNames.forEach(name => {
            state[name] = this.props.levelData ? this.props.levelData[name] : undefined;
        });
        state.fieldError = false;
        this.state = state;

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
    }
    
    formValidation () {
    }

    render() {
        return (
            <Form>
                <FormGroup className='mx-2'>
                    <Label className='text-left mr-4' for="language">
                        Langage à apprendre:
                    </Label>
                    <Input
                        id="language"
                        name="language"
                        value={this.state.language}
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