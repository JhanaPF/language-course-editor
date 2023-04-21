import React from 'react';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import TextFormGroup from '../components/TextFormGroup';

export default class LessonForm extends MyForm {

    constructor(props){
        super(props);

        this.inputNames = ["name", "description"];        
        this.state = {dictionary_id: this.props.dictionary_id};
    }
    
    submit(event){
        event.stopPropagation();
        //console.log(event)
        super.add("lessons");
    }

    render(){
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <TextFormGroup text="Intitulé du cours" id="name" value={this.state.name} handleChange={this.handleChange}/>
                <TextFormGroup text="Description" id="description" value={this.state.description} handleChange={this.handleChange}/>
            </FormWrapper>
        );
    }
}