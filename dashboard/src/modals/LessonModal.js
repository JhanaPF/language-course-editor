import React from "react";
import {Button, Row, Col, Modal} from 'reactstrap';
import {put} from '../apiRequests';
import LessonForm from "../forms/LessonForm";
import { MyModal } from "../components/MyModal";

export default class LessonModal extends React.Component {

    constructor(props){
        super(props);
        
        this.state={

        }
    }

    render(){
        return(
            <MyModal title="Ajouteer une leçon" closeModal={this.props.closeModal}>
                <LessonForm/>
            </MyModal>
        )
    }
}