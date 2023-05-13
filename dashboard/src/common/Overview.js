import React from "react";
import {get} from '../apiRequests';

/**
 * Call componentDidMount with super.onFetch(filter)
 * In render add OverviewWrapper with nested modal
 */
export default class Overview extends React.Component{
    // parent class for all overviews views

    constructor(props){
        super(props);
        this.filter = props.filter;
        this.objName = props.objName;
        this.state = {modal: false};
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModalAfterRequest = this.closeModalAfterRequest.bind(this);
    }

    componentDidMount(){
        this.onFetch();
    }

    onFetch(){
        var initState=(fields)=>{this.setState({loading: false, modal: false, ...fields})};
        get(this.objName, this.filter, (res)=>initState({elements: res}), ()=>initState());
    }

    toggleModal=()=>this.setState({modal: !this.state.modal});

    closeModalAfterRequest(){
        this.onFetch();
    }

    closeModal(){
        this.setState({modal: false});
    }

    openModal(){
        this.setState({modal: true});
    }
}