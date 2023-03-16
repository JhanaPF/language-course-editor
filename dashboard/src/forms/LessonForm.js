import React from 'react';
import {Form, FormText, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {validString} from '../rgx/regex'
import AudioRecorder from '../components/AudioRecorder';

export default class LessonForm extends React.Component {

    constructor(props){
        super(props);

        this.inputNames = ["picture", "sentence", "vocal", "translation", "answerChoices", "pictureChoices", "indexAnswer", "questionIndex"];
        
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

    componentDidMount(){
        //console.log(999)
    }

    componentDidUpdate(){
        //console.log(this.state)
    }

    handleChange = (event) =>{
        const {name, value} = event.currentTarget;
        //console.log(name, value)

        if(name === "vocalFile") {
            console.log(event.target.files)
            return  this.setState({ [name] : event.target.files[0] });
        }

        this.setState({ [name] : value });
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    isValid(){
        if(!this.state.word) return false;
        else return true;
    }

    getData(){
        
        let save = {};

        this.inputNames.foreach(key => save[key] = this.state.levelData ? this.state.levelData[key] : undefined);

        
        //console.log(save)
        return save;
    }
    
    update(){
        if(!this.isValid()) return; 

        const data = this.getData();
        //console.log(save.word, this.state.translated_definition)
        axios.post(
            this.apiUrl + 'lesson-questions',
            data, 
            { headers: { 'Authorization': this.props.token,  'Content-Type': 'multipart/form-data' } }
        )
        .then( () => this.props.toggleModal())
        .catch(function (error) {console.log(error)});     
    }

    save = (next) =>{  
        if(this.isValid() === false) return; 
        
        const data = this.getData();
        const formData = new FormData();
        formData.append("audio-file", this.state.vocalFile);
        axios.put(
            this.apiUrl + 'dictionaries/word', 
            formData,
            { 
                headers: { 
                    'Authorization': this.props.token,
                    'Accept' : 'application/json'
                    //'Content-Type': 'multipart/form-data'
                },
            },
        )
        .then( () => {
            console.log(formData)
            if(next)
                this.props.reloadModal();
            else 
                this.props.toggleModal();
        })
        .catch(function (error) {
            console.log(error);
        });
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