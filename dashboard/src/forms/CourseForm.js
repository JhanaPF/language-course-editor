import React from 'react';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import TextFormGroup from '../components/TextFormGroup';
import PictureInputGroup from '../components/PictureInputGroup';

export default class CourseForm extends MyForm {
    
    constructor(props){
        super(props, "other props");
        this.inputNames = ["language", "pivot_language", "file", "raw_name"];
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){ super.initState(this.inputNames); }

    handleChange (e) { super.handleChange(e); }

    submit(event){
        //event.stopPropagation();
        super.add("dictionaries/dictionary");
    }

    render() {
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <TextFormGroup text="Langage à apprendre" id="language" value={this.state.language} handleChange={this.handleChange} required/>
                <TextFormGroup text="Langue pivot" id="pivot_language" value={this.state.pivot_language} handleChange={this.handleChange} required/>
                <PictureInputGroup text="Drapeau" description="Ajouter un drapeau" name="file" onChange={this.handleChange}/>
                <TextFormGroup 
                    text="Nom du dictionnaire en anglais au format suivant: language_from_pivotlanguage)" 
                    id="raw_name" 
                    value={this.state.raw_name} 
                    handleChange={this.handleChange}
                    required />
            </FormWrapper>
        )
    }
}