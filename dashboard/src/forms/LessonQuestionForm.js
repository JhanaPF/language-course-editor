import './App.css';
import React from 'react';
import {Modal, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label, Button, Row, Col, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {validString} from './rgx/regex'
import AudioRecorder from './components/audioRecorder';

class LessonQuestionForm extends React.Component {

    constructor(props){
        super(props);
        
        // Une photo
        // Une phrase/ un mot
        // Un enregistrement audio
        // Enregistrer la phrase sous forme d'array
        
        // La réponse:
        // Une traduction
        // Choix de quatre phrases/mots
        // Choix de quatre images
        // Un champs pour le type de réponse
        // L'index du mot à sélectionner pour les phrases à compléter

        // langage, ex french_to_french
        // Index de la question dans la leçon

        const inputNames = ["picture", "sentence", "vocal", "translation", "answerChoices", "pictureChoices", "indexAnswer", "questionIndex"];
        
        let state = {};
        inputNames.forEach(name => {
            state[name] = this.props.levelData ? this.props.levelData[name] : undefined;
        });
        state.fieldError = false;
        this.state = state;
        //console.log(this.state)

        this.apiUrl = process.env.API_URL || 'http://localhost:3001/';
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.type = this.props.addModal ? 'addModal' : 'editModal';
    }

    componentDidMount(){
        //console.log(999)
    }

    componentDidUpdate(){
        //console.log(this.state)
    }

    handleChange = (event) =>{
        const {name, value} = event.currentTarget;

        if(name !== 'level' && validString.test(value[value.length - 1])){
            this.setState({ [name] : value });
            // Si la chaîne de caractères contient des chiffres, ne pas enregistrer
        }
        else  this.setState({ [name] : null });

        if(name === 'level'){ return this.setState({ [name] : value });  }   
        
        console.log(name, value)

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
        
        const save = {
            picture: this.state.levelData ? this.state.levelData.picture : undefined,
            sentence: this.state.levelData ? this.state.levelData.sentence : undefined, 
            vocal: this.state.levelData ? this.state.levelData.vocal : undefined, 
            translation: this.state.levelData ? this.state.levelData.translation : undefined,
            answerChoices: this.state.levelData ? this.state.levelData.answerChoices : undefined,
            pictureChoices: this.state.levelData.level ? this.state.levelData.pictureChoices : undefined,
            indexAnswer: this.state.levelData ? this.state.levelData.indexAnswer : undefined, 
            lessonIndex: this.state.levelData ? this.state.levelData.lessonIndex : undefined, 
        }
        
        console.log(save)
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

    saveAudio (file) {
        this.setState({audioFile: file});
    }

    formValidation () {
    }

    render() {
        return (
            <Form>
                <FormGroup className='mx-2 mb-3' >
                    <Label for="picture">
                        Image:
                    </Label>
                    <Col sm={10}>
                        <Input id="picture" name="picture" type="file" onChange={this.handleChange}/>
                        <FormText>
                            Ajouter une image
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup className='mx-2'>
                    <Label className='text-left mr-4' for="picture">
                        Phrase correspondante:
                    </Label>
                    <Input
                        id="sentence"
                        name="sentence"
                        value={this.state.sentence}
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup className='mx-2 mb-3' >
                    <Label for="vocal">
                        Enregistrement audio:
                    </Label>
                    <Col sm={10}>
                        <Input id="vocal" name="vocal" type="file" onChange={this.handleChange}/>
                        <FormText>
                            Ajouter un fichier vocal
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup className='mx-2 mb-3'>
                    <Label className='text-left'>
                        Traduction (réponse):
                    </Label>
                    <Input
                        id="translation"
                        name="translation"
                        value={this.state.translation}
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup className='mx-2 mb-3'>
                    <Label className='text-left'>
                        Choix de réponses:
                    </Label>                  
                    <Input
                        id="answerChoices1"
                        name="answerChoices1"
                        value={this.state.answerChoices1}
                        onChange={this.handleChange}/>
                    <Input
                        id="answerChoices2"
                        name="answerChoices2"
                        value={this.state.answerChoices2}
                        onChange={this.handleChange}/>
                    <Input
                        id="answerChoices3"
                        name="answerChoices3"
                        value={this.state.answerChoices3}
                        onChange={this.handleChange}/>
                    <Input
                        id="answerChoices4"
                        name="answerChoices4"
                        value={this.state.answerChoices4}
                        onChange={this.handleChange}/>                 
                </FormGroup>
                <FormGroup className='mx-2 mb-3' >
                    <Label>
                        Choix d'images:
                    </Label>
                    <Col sm={10}>
                        <Input id="pictureChoices1" name="pictureChoices1" type="file" onChange={this.handleChange}/>
                        <Input id="pictureChoices2" name="pictureChoices2" type="file" onChange={this.handleChange}/>
                        <Input id="pictureChoices3" name="pictureChoices3" type="file" onChange={this.handleChange}/>
                        <Input id="pictureChoices4" name="pictureChoices4" type="file" onChange={this.handleChange}/>
                        <FormText>
                            Ajouter un fichier vocal
                        </FormText>
                    </Col>
                </FormGroup>
                <FormGroup className='mx-2'>
                    <Label className='text-left' for="indexAnswer">
                        Index de la réponse dans la phrase:
                    </Label>                        
                    <Input
                        id="indexAnswer"
                        name="indexAnswer"
                        value={this.state.indexAnswer}
                        onChange={this.handleChange}
                        type='number' />                         
                </FormGroup>
                <FormGroup className='mx-2'>
                    <Label className='text-left' for="indexAnswer">
                        Index de la réponse dans la phrase:
                    </Label>                        
                    <Input
                        id="indexAnswer"
                        name="indexAnswer"
                        value={this.state.indexAnswer}
                        onChange={this.handleChange}
                        type='number' />                         
                </FormGroup>
            </Form>             
        );
    }

}

export default LessonQuestionForm;