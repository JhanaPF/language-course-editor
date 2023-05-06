import React from "react";
import {get} from '../apiRequests';

export default class Overview extends React.Component{
    // parent class for all overviews views

    constructor(props){
        super(props);
        this.state = {};
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModalAfterRequest = this.closeModalAfterRequest.bind(this);
    }

    componentDidMount(){
        this.onFetch();
    }

    onFetch(filter){
        var initState=(fields)=>{this.setState({loading: false, modal: false, ...fields})};
        get(this.props.objName, filter ? filter : this.props.filter, (res)=>initState({elements: res}), ()=>initState());
    }

    toggleModal=()=>this.setState({modal: !this.state.modal});

    closeModalAfterRequest(){
        this.onFetch();
        this.setState({modal: false});
    }

    closeModal(){
        this.setState({modal: false});
    }

    openModal(){
        this.setState({modal: true});
    }
}