import React from "react";
import {fetch, put, post, del} from '../apiRequests';
import { Form, Button } from "reactstrap";


export default class MyForm extends React.Component{
    // parent class for all forms

    constructor(props, other){
        console.log(other)
        super(props);
        this.state = {fieldError: false};
        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
    }
    
    initState(inputNames){
        let state = {};
        inputNames.forEach(name => {
            state[name] = this.props.levelData ? this.props.levelData[name] : undefined;
        });
        this.setState({...state});
    }

    handleChange = (event) =>{
        const {name, value} = event.currentTarget;
        console.log('handle change', name, value)

        const files = event.target.files;
        if(files && files[0]) { // Input is a file input, make it more readable
            console.log(event.target)
            return  this.setState({ [name] : event.target.files[0] });
        }

        this.setState({ [name] : value });
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    getData(inputNames){   
        let data = {};
        inputNames.foreach(key => data[key] = this.state.levelData ? this.state.levelData[key] : undefined);
        return data;
    }
    
    update(url){
        const data = this.getData();
        post(url, data);
    }

    add (url, data, next){  
        put(url, data);        
    }

    handleSubmit (event) {
        console.log('form:', event)
    }

}