import React from 'react';
import {Form, FormText, FormGroup, Input, Label, Button, Row, Col} from 'reactstrap';
import MyForm from '../common/MyForm';
import FormWrapper from '../components/FormWrapper';
import TextFormGroup from '../components/TextFormGroup';
import PictureInputGroup from '../components/PictureInputGroup';
export default class LessonForm extends MyForm {

    constructor(props){
        super(props);

        this.inputNames = ["name", "description", "picture"];        
        this.state = {dictionnary_id: this.props.dictionnary_id};

      //  this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        super.initState(this.inputNames);
    }
    
    submit(event){
        event.stopPropagation();
        console.log(event)
        super.add("lesson");
    }

    render() {
        return (
            <FormWrapper submit={this.submit.bind(this)}>
                <TextFormGroup text="Initulé du cours" id="name" value={this.state.name} handleChange={this.handleChange}/>
                <TextFormGroup text="Description" id="description" value={this.state.description} handleChange={this.handleChange}/>
                <PictureInputGroup text="Image de couverture" name="picture" onChange={this.handleChange}/>
            </FormWrapper>
        );
    }

}