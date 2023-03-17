import React from 'react';
import {Modal, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {validString} from '../rgx/regex'
import AudioRecorder from '../components/AudioRecorder';

export default class QuestionForm extends React.Component {

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

        this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/';
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.type = this.props.addModal ? 'addModal' : 'editModal';
    }



    isValid(){
        return true;
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