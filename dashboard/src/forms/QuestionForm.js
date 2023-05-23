import React from 'react';
import {FormText, FormGroup, Input, Label, Col, Row} from 'reactstrap';
import {validString} from '../rgx/regex'
import AudioRecorder from '../components/AudioRecorder';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import SimpleFormGroup from '../components/SimpleFormGroup';
import PictureInputGroup from '../components/PictureInputGroup';
import { setUrlParams } from '../utils/stringUtils';
import { readFormData } from '../utils/utils';

/**
 * @param courseId
 * @param lessonId
 */
export default class QuestionForm extends MyForm {

    constructor(props){
        super(props);
        
        // La question:
        // Une photo
        // Un ou PLUSIEURS enregistrements audio avec enregistrement de fichier ou enregistrement vocal à travers l'ordinateur
        // Enregistrer la phrase sous forme d'array
        
        // La réponse:
        // Un champs pour le type de réponse

        // Index de la question dans la leçon

        this.inputNames = ["picture", "sentence", "sentence_audio", "translation", "picture_choice", "text_choice", "answer_index", "course_id", "lesson_id"];        
        this.requiredInputs = ["sentence", "translation"];
    }

    componentDidMount(){
        this.initState(this.inputNames, {course_id: this.props.courseId, lesson_id: this.props.lessonId});
    }

    submit(){
        if(!this.state.sentence || !this.state.translation) return;
        const {formData} = this.getData();
        readFormData(formData);
        super.add("questions", this.props.fetchQuestions);
    }

    render() {
        return (
            <FormWrapper isValid={this.state.formValid} submit={this.submit.bind(this)}>

                <SectionTitle>Question:</SectionTitle>
                <PictureInputGroup text="Image" description="Ajouter une image" name="picture" onChange={this.handleChange}/>
                <SimpleFormGroup text="Phrase ou mot" id="sentence" value={this.state.sentence} handleChange={this.handleChange}/>
                <SimpleFormGroup text="Enregistrement audio" formText="Ajouter un fichier vocal" type="file" name="sentence_audio" value={this.state.sentence_audio} handleChange={this.handleChange}/>
                
                <SectionTitle>Réponse:</SectionTitle>
                <SimpleFormGroup text="Traduction/Réponse" id="translation" value={this.state.translation} handleChange={this.handleChange}/>
                <FormGroup className='mx-2 mb-3'>
                    <Label className='text-left'>Choix de réponses:</Label>
                    <Row>{[1,2,3,4].map((e, i) => <Col key={i} md="6"><Input className='mb-2' name={"answerChoices" + e} onChange={this.handleChange}/></Col>)}</Row>
                </FormGroup>
                <FormGroup className='mx-2 mb-3' >
                    <Label>Choix d'images:</Label>
                    <Col sm="10">
                        {[1,2,3,4].map((e, i) => <Input key={i} className='mb-2' name={"pictureChoices" + e} type="file" onChange={this.handleChange}/>)}
                        <FormText>Ajouter un fichier vocal</FormText>
                    </Col>
                </FormGroup> 
                <SimpleFormGroup text="Index de la réponse dans la phrase" type="number" name="indexAnswer" value={this.state.indexAnswer} handleChange={this.handleChange}/>
            
            </FormWrapper>
        );
    }
}

const SectionTitle = (props) => <Row className='mx-3 my-2 border-bottom'><strong>{props.children}</strong></Row>