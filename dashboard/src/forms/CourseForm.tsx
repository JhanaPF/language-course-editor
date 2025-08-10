import React, { FormEvent } from "react";
import useForm from '../common/useForm';
import FormWrapper from '../components/forms/FormWrapper';
import SimpleFormGroup from '../components/forms/SimpleFormGroup';
import PictureInputGroup from '../components/forms/PictureInputGroup';


interface CourseFormProps {
  fetchCourses: () => void; // ou le type exact de la fonction si elle prend des paramètres
  close: () => void;        // idem pour close
}
/**
 * @param {Function} close 
 * @param {Function} fetchCourses
 */
const CourseForm: React.FC<CourseFormProps> = ({ fetchCourses, close }) => {
    const {
        handleChange,
        add,
        formState
    } = useForm({inputNames: ['language', 'pivot_language', 'file', 'raw_name']})

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        add('courses', fetchCourses)
        close()
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