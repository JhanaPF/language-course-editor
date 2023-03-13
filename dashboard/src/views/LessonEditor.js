import './App.css';
import React from 'react';
import {Modal, ModalBody, ModalFooter, Form, FormText, FormGroup, Input, Label, Button, Row, Col, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import {validString} from './rgx/regex';

class LessonEditor extends React.Component {

    constructor(props){
        super(props);
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    isValid(){
        if(!this.state.word) return false;
        else return true;
    }

    getData(){
        
    }
    
    update(){
        if(!this.isValid()) return; 

        const data = this.getData();
        //console.log(save.word, this.state.translated_definition)
        axios.post(
            this.apiUrl + 'lesson-questions',
            data, 
            { headers: { 'Authorization': this.props.token,  'Content-Type': 'multipart/form-data' } }
        )
        .then( () => this.props.toggleModal())
        .catch(function (error) {console.log(error)});     
    }

    save = (next) =>{  
        if(this.isValid() === false) return; 
        
        const data = this.getData();
        const formData = new FormData();
        formData.append("audio-file", this.state.vocalFile);
        axios.put(
            this.apiUrl + 'dictionaries/word', 
            formData,
            { 
                headers: { 
                    'Authorization': this.props.token,
                    'Accept' : 'application/json'
                    //'Content-Type': 'multipart/form-data'
                },
            },
        )
        .then( () => {
            console.log(formData)
            if(next)
                this.props.reloadModal();
            else 
                this.props.toggleModal();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    saveAudio (file) {
        this.setState({audioFile: file});
    }

    formValidation () {

    }

    render() {

    }

}

export default LessonEditor;