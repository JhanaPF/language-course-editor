import React from 'react';
import {Modal, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import Select from 'react-select';
import {validString} from '../rgx/regex'
import AudioRecorder from '../components/AudioRecorder';
import MyForm from '../common/MyForm';

export default class QuestionForm extends MyForm {

    constructor(props){
        super(props);
        
        // La question:
        // Une photo
        // Une phrase/ un mot
        // Un ou PLUSIEURS enregistrements audio
        // Enregistrer la phrase sous forme d'array
        
        // La réponse:
        // Une traduction
        // Choix de quatre phrases/mots
        // Choix de quatre images
        // Un champs pour le type de réponse
        // L'index du mot à sélectionner pour les phrases à compléter

        // Index de la question dans la leçon

        this.inputNames = ["picture", "sentence", "sentence_audio", "translation", "picture_choice", "text_choice", "answer_index"];        

        this.state = {course_id: this.props.lessonId};


        this.handleChange = super.handleChange.bind(this);
    }

    componentDidMount(){
        super.initState(this.inputNames);
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