import React, { useEffect } from 'react'
import useForm from '../common/useForm'
import FormWrapper from '../components/forms/FormWrapper'
import SimpleFormGroup from '../components/forms/SimpleFormGroup'

const LessonForm = ({ courseId, fetchLessons }) => {
    const inputNames = ['name', 'description', 'course_id']

    const {
        formState,
        setFormState,
        handleChange,
        add
    } = useForm({inputNames})

    useEffect(() => {
        setFormState(prev => ({
            ...prev,
            course_id: courseId
        }))
    }, [courseId, setFormState])

    const submit = (event) => {
        event.preventDefault()
        if (!formState.name || !formState.description) return
        add('lessons', fetchLessons)
    }

    return (
        <FormWrapper submit={submit}>
            <SimpleFormGroup text="Intitulé du cours" id="name" value={formState.name} handleChange={handleChange} />
            <SimpleFormGroup text="Description" id="description" value={formState.description} handleChange={handleChange} />
        </FormWrapper>
    )
}

export default LessonForm
