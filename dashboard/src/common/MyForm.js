import React from "react";
import {fetch, put, post, del} from '../apiRequests';
import { Form, Button } from "reactstrap";
const log = console.log;

export default class MyForm extends React.Component{
    // parent class for all forms

    constructor(props, other){
        //console.log(other)
        super(props);
        this.state = {fieldError: false};
        
        this.handleChange = this.handleChange.bind(this);
        this.type = this.props.addModal ? 'addModal' : 'editModal';
    }
    
    initState(inputNames){
        let state = {};
        inputNames.forEach(name => {
            state[name] = this.props.levelData ? this.props.levelData[name] : undefined;
        });
        state.fieldError=false;
        this.setState({...state});
    }

    handleChange = (event) =>{
        const {name, value} = event.currentTarget;
        //console.log('handle change', name, value)

        const files = event.target.files;
        if(files && files[0]) { // Input is a file input, make it more readable
            //console.log(event.target)
            return  this.setState({ [name] : event.target.files[0] });
        }

        this.setState({ [name] : value });
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    getData(){   
        let data = {};
        let formData = new FormData();
 
        // Set data and formdata objects
        for (let i = 0; i < this.inputNames.length; i++) {
            const key = this.inputNames[i];
            const stateField = this.state[key];
            data[key] = stateField ? stateField : undefined;
            formData.append(key, stateField)
            log(key, stateField)
        }
        console.log(data, formData);        
        return {data, formData};
    } 
    
    update(url){
        const data = this.getData();
        post(url, data);
    }

    add (url, data, next){  
        put(url, data);        
    }

    handleSubmit (event) {
        event.stopPropagation();
        console.log('form:', event)
    }

    formValidation(form){

    }

}