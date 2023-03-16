import React from "react";
import {fetch, put, del} from '../apiRequests';

export default class Form extends React.Component{
    constructor(props){
        super(props);

        this.inputNames = props.inputNames;
        
        let state = {};
        this.inputNames.forEach(name => {
            state[name] = this.props.levelData ? this.props.levelData[name] : undefined;
        });
        state.fieldError = false;
        this.state = state;

        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this)
    }



    handleChange = (event) =>{
        const {name, value} = event.currentTarget;
        //console.log(name, value)

        if(name === "vocalFile") {
            console.log(event.target.files)
            return  this.setState({ [name] : event.target.files[0] });
        }

        this.setState({ [name] : value });
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    isValid(){
        if(!this.state.word) return false;
        else return true;
    }

    getData(){
        
        let data = {};

        this.inputNames.foreach(key => save[key] = this.state.levelData ? this.state.levelData[key] : undefined);

        //console.log(save)
        return data;
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
}