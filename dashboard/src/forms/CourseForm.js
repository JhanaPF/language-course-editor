import React from 'react';
import {Form, FormText, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {validString} from '../rgx/regex';
import AudioRecorder from '../components/AudioRecorder';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import TextFormGroup from '../components/TextFormGroup';


export default class LessonForm extends MyForm {
    
    constructor(props){
        super(props, "other props");
        this.inputNames = ["dictionnary_id", "name", "description", "picture"];
    }

    componentDidMount(){
        super.initState(this.inputNames);
    }
    
    formValidation () {
    }

    submit(event){
        event.stopPropagation()
        console.log(event)
        super.add("course")
    }

    render() {
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <TextFormGroup text="Langage à apprendre" id="language" value={this.state.language} handleChange={this.handleChange} />
                <TextFormGroup text="Langue pivot" id="pivotLanguage" value={this.state.pivotLanguage} handleChange={this.handleChange} />
                <FormGroup className='mx-2 mb-3'>
                    <Label for="flagFile">
                        Drapeau:
                    </Label>
                    <Input id="flagFile" name="flagFile" type="file" onChange={this.handleChange}/>
                    <FormText>
                        Ajouter un drapeau
                    </FormText>
                </FormGroup>
                <TextFormGroup 
                    text="Nom du dictionnaire en brut (en anglais: language_from_pivotlanguage)" 
                    id="rawName" 
                    value={this.state.rawName} 
                    handleChange={this.handleChange} />
            </FormWrapper>
        )
    }
}