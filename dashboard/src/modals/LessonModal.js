import React from "react";
import LessonForm from "../forms/LessonForm";
import MyModal from "../components/MyModal";

export default class LessonModal extends React.Component {

    constructor(props){
        super(props);    
    }

    render(){   
        return(
            <MyModal title="Ajouter une leçon" closeModal={this.props.closeModal}>
                <LessonForm courseId={this.props.courseId}/>
            </MyModal>
        )
    }
}