import React from 'react'
import MyForm from '../common/MyForm'
import FormWrapper from '../components/FormWrapper'
import SimpleFormGroup from '../components/SimpleFormGroup'
import PictureInputGroup from '../components/PictureInputGroup'

export default class CourseForm extends MyForm {
    constructor (props) {
        super(props, ['language', 'pivot_language', 'file', 'raw_name'])
    }

    submit (event) {
        const cbk = () => this.props.fetchCourses()
        super.add('courses', cbk, cbk)
    }

    render () {
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <SimpleFormGroup text="Langage à apprendre" id="language" value={this.state.language} handleChange={this.handleChange} required/>
                <SimpleFormGroup text="Langue pivot" id="pivot_language" value={this.state.pivot_language} handleChange={this.handleChange} required/>
                <PictureInputGroup text="Drapeau" description="Ajouter un drapeau" name="file" onChange={this.handleChange}/>
                <SimpleFormGroup
                    text="Nom du dictionnaire en anglais au format suivant: language_from_pivotlanguage"
                    id="raw_name"
                    value={this.state.raw_name}
                    handleChange={this.handleChange}
                    required />
            </FormWrapper>
        )
    }
}
