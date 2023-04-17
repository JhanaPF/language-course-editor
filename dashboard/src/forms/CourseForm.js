import React from 'react';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import TextFormGroup from '../components/TextFormGroup';
import PictureInputGroup from '../components/PictureInputGroup';

export default class CourseForm extends MyForm {
    
    constructor(props){
        super(props, "other props");
        this.inputNames = ["language", "pivotLanguage", "flagFile", "rawName"];
    }

    componentDidMount(){
        super.initState(this.inputNames);
    }

    submit(event){
        event.stopPropagation();
        const {formData} = this.getData();
        super.add("dictionaries/dictionary", formData);
    }

    render() {
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <TextFormGroup text="Langage à apprendre" id="language" value={this.state.language} handleChange={this.handleChange} />
                <TextFormGroup text="Langue pivot" id="pivotLanguage" value={this.state.pivotLanguage} handleChange={this.handleChange} />
                <PictureInputGroup text="Drapeau" description="Ajouter un drapeau" name="flagFile" onChange={this.handleChange}/>
                <TextFormGroup 
                    text="Nom du dictionnaire en brut (en anglais: language_from_pivotlanguage)" 
                    id="rawName" 
                    value={this.state.rawName} 
                    handleChange={this.handleChange} />
            </FormWrapper>
        )
    }
}