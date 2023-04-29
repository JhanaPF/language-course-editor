import React from "react";
import MyModal from "../components/MyModal";
import { ModalBody } from "reactstrap";
import CourseForm from '../forms/CourseForm';

/**
 * @param {boolean} isOpen - optionnal 
 * @param {function} closeModal  
 */
export default function CourseModal (props) {
    
    return(
        <MyModal isOpen={props.isOpen ? props.isOpen : true} title="Ajouter un cours" closeModal={props.closeModal}>
            <ModalBody>   
                <CourseForm close={props.closeModal} fetchCourses={props.fetchCourses}/>
            </ModalBody>
        </MyModal>
    )
}