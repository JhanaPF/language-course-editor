import React from "react";
import MyModal from "../components/MyModal";
import { ModalBody, Row, Col } from "reactstrap";
import CourseForm from '../forms/CourseForm';

export default function CourseModal (props) {
    
    return(
        <MyModal isOpen={props.isOpen ? this.props.isOpen : true} title="Ajouter un cours" closeModal={props.closeModal}>
            <ModalBody>   
                <CourseForm/>
            </ModalBody>
        </MyModal>
    )
}