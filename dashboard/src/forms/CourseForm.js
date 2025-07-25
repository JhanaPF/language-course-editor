import React from 'react';
import useForm from '../common/useForm';
import FormWrapper from '../components/forms/FormWrapper';
import SimpleFormGroup from '../components/forms/SimpleFormGroup';
import PictureInputGroup from '../components/forms/PictureInputGroup';

const CourseForm = ({ fetchCourses }) => {
    const {
        handleChange,
        add,
        formState
    } = useForm({inputNames: ['language', 'pivot_language', 'file', 'raw_name']})

    const submit = (event) => {
        event.preventDefault()
        const callback = () => fetchCourses()
        add('courses', callback, callback)
    }

    return (
        <FormWrapper submit={submit}>
            <SimpleFormGroup text="Langage à apprendre" id="language" value={formState.language} handleChange={handleChange} required />
            <SimpleFormGroup text="Langue pivot" id="pivot_language" value={formState.pivot_language} handleChange={handleChange} required />
            <PictureInputGroup text="Drapeau" description="Ajouter un drapeau" name="file" onChange={handleChange} />
            <SimpleFormGroup
                text="Nom du dictionnaire en anglais au format suivant: language_from_pivotlanguage"
                id="raw_name"
                value={formState.raw_name}
                handleChange={handleChange}
                required />
        </FormWrapper>
    )
}

export default CourseForm