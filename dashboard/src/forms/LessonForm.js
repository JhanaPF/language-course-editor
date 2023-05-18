import React from 'react';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import SimpleFormGroup from '../components/SimpleFormGroup';

export default class LessonForm extends MyForm {

    constructor(props){
        super(props);
        this.inputNames = ["name", "description", "dictionary_id"];        
    }

    componentDidMount(){
        this.initState(this.inputNames, {dictionary_id: this.props.courseId});
    }
    
    submit(event){
        if(!this.state.name || !this.state.description) return;
        super.add("lessons", this.props.fetchLessons);
    }

    render(){
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <SimpleFormGroup text="Intitulé du cours" id="name" value={this.state.name} handleChange={this.handleChange}/>
                <SimpleFormGroup text="Description" id="description" value={this.state.description} handleChange={this.handleChange}/>
            </FormWrapper>
        );
    }
}