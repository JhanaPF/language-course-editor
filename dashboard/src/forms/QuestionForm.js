import React, { useEffect } from 'react'
import { FormText, FormGroup, Input, Label, Col, Row } from 'reactstrap'
// import { validString } from '../rgx/regex'
// import AudioRecorder from '../components/AudioRecorder'
import useForm from '../common/useForm'
import FormWrapper from '../components/forms/FormWrapper'
import SimpleFormGroup from '../components/forms/SimpleFormGroup'
import PictureInputGroup from '../components/forms/PictureInputGroup'
// import { setUrlParams } from '../utils/stringUtils'
// import { readFormData } from '../utils/utils';

/**
 * @param courseId
 * @param lessonId
 * @param fetchQuestions
 */
const QuestionForm = ({ courseId, lessonId, fetchQuestions }) => {
    const inputNames = [
        'picture', 'sentence', 'sentence_audio',
        'translation', 'picture_choice', 'text_choice',
        'answer_index', 'course_id', 'lesson_id'
    ]
    const requiredInputs = ['sentence', 'translation']

    const {
        formState,
        setFormState,
        handleChange,
        add,
        formValid
    } = useForm({ inputNames, requiredInputs })

    useEffect(() => {
        setFormState(prev => ({
            ...prev,
            course_id: courseId,
            lesson_id: lessonId
        }))
    }, [courseId, lessonId, setFormState])

    const submit = (event) => {
        event.preventDefault()
        if (!formState.sentence || !formState.translation) return
        add('questions', fetchQuestions)
    }

    return (
        <FormWrapper isValid={formValid} submit={submit}>

            <SectionTitle>Question:</SectionTitle>
            <PictureInputGroup text="Image" description="Ajouter une image" name="picture" onChange={handleChange} />
            <SimpleFormGroup text="Phrase ou mot" id="sentence" value={sentence} handleChange={handleChange} />
            <SimpleFormGroup text="Enregistrement audio" formText="Ajouter un fichier vocal" type="file" name="sentence_audio" value={sentence_audio} handleChange={handleChange} />

            <SectionTitle>Réponse:</SectionTitle>
            <SimpleFormGroup text="Traduction/Réponse" id="translation" value={translation} handleChange={handleChange} />
            <FormGroup className='mx-2 mb-3'>
                <Label className='text-left'>Choix de réponses:</Label>
                <Row>{[1, 2, 3, 4].map((e, i) => <Col key={i} md="6"><Input className='mb-2' name={'answerChoices' + e} onChange={handleChange} /></Col>)}</Row>
            </FormGroup>
            <FormGroup className='mx-2 mb-3' >
                <Label>Choix d'images:</Label>
                <Col sm="10">
                    {[1, 2, 3, 4].map((e, i) => <Input key={i} className='mb-2' name={'pictureChoices' + e} type="file" onChange={handleChange} />)}
                    <FormText>Ajouter un fichier vocal</FormText>
                </Col>
            </FormGroup>
            <SimpleFormGroup text="Index de la réponse dans la phrase" type="number" name="indexAnswer" value={indexAnswer} handleChange={handleChange} />

        </FormWrapper>
    )
}

const SectionTitle = ({ children }) => <Row className='mx-3 my-2 border-bottom'><strong>{children}</strong></Row>

export default QuestionForm
