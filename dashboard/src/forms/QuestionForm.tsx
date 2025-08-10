import React, { useEffect } from 'react';
import { ReactNode } from "react";

type SectionTitleProps = {
    children: ReactNode;
};

import { FormText, FormGroup, Input, Label, Col, Row } from 'reactstrap';
// import { validString } from '../rgx/regex'
// import AudioRecorder from '../components/AudioRecorder'
import useForm from '../common/useForm';
import FormWrapper from '../components/forms/FormWrapper';
import SimpleFormGroup from '../components/forms/SimpleFormGroup';
import PictureInputGroup from '../components/forms/PictureInputGroup';
// import { setUrlParams } from '../utils/stringUtils'
// import { readFormData } from '../utils/utils';

type QuestionFormProps = {
    courseId: string;
    lessonId: string;
    fetchQuestions: () => void;
};

/**
 * @param courseId
 * @param lessonId
 * @param fetchQuestions
 */
const QuestionForm: React.FC<QuestionFormProps> = ({ courseId, lessonId, fetchQuestions }) => {
    const inputNames = [
        'picture', 'sentence', 'sentence_audio',
        'translation', 'picture_choice', 'text_choice',
        'answer_index', 'course_id', 'lesson_id', 'indexAnswer'
    ];

    const requiredInputs = ['sentence', 'translation'];

    const {
        formState,
        setFormState,
        handleChange,
        add,
        formValid
    } = useForm({ inputNames, requiredInputs });

    useEffect(() => {
        setFormState((prev: any) => ({
            ...prev,
            course_id: courseId,
            lesson_id: lessonId
        }));
    }, [courseId, lessonId, setFormState])

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formState.sentence || !formState.translation) return
        add('questions', fetchQuestions);
    };

    return (
        <FormWrapper isValid={formValid} submit={submit}>

            <SectionTitle>Question:</SectionTitle>
            <PictureInputGroup text="Image" description="Ajouter une image" name="picture" onChange={handleChange} />
            <SimpleFormGroup text="Phrase ou mot" id="sentence" value={formState.sentence} handleChange={handleChange} />
            <SimpleFormGroup text="Enregistrement audio" formText="Ajouter un fichier vocal" type="file" id="sentence_audio" value={formState.sentence_audio} handleChange={handleChange} />

            <SectionTitle>Réponse:</SectionTitle>
            <SimpleFormGroup text="Traduction/Réponse" id="translation" value={formState.translation} handleChange={handleChange} />
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
            <SimpleFormGroup text="Index de la réponse dans la phrase" type="number" id="indexAnswer" value={formState.indexAnswer} handleChange={handleChange} />

        </FormWrapper>
    )
}


const SectionTitle = ({ children }: SectionTitleProps) => (
    <Row className="mx-3 my-2 border-bottom">
        <strong>{children}</strong>
    </Row>
);

export default QuestionForm;
