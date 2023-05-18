import React from 'react';
import {FormText, FormGroup, Input, Label, Col, Row} from 'reactstrap';
import {validString} from '../rgx/regex'
import AudioRecorder from '../components/AudioRecorder';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import SimpleFormGroup from '../components/SimpleFormGroup';
import PictureInputGroup from '../components/PictureInputGroup';

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

        this.inputNames = ["picture", "sentence", "sentence_audio", "translation", "picture_choice", "text_choice", "answer_index", "course_id", "lesson_id"];        
    }

    componentDidMount(){
        this.initState(this.inputNames, {course_id: this.props.lessonId});
    }

    submit(event){
        super.add("questions", this.props.fetchQuestions);
    }

    render() {
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <SectionTitle>Question:</SectionTitle>
                
                <PictureInputGroup text="Image" description="Ajouter une image" name="picture" onChange={this.handleChange}/>
                <SimpleFormGroup text="Phrase correspondante" id="sentence" value={this.state.sentence} handleChange={this.handleChange}/>
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
                <SectionTitle>
                    Réponse:
                </SectionTitle>
                <SimpleFormGroup text="Traduction/Réponse" id="translation" value={this.state.translation} handleChange={this.handleChange}/>

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
                
                <SimpleFormGroup text="Index de la réponse dans la phrase" type="number" id="indexAnswer" value={this.state.indexAnswer} handleChange={this.handleChange}/>

            </FormWrapper>
        );
    }

}

const SectionTitle = (props) => <Row className='mx-3 my-2 border-bottom'><strong>{props.children}</strong></Row>