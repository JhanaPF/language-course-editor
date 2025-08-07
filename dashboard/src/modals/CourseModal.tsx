import React from 'react'
import MyModal from '../components/wrappers/MyModal'
import { ModalBody } from 'reactstrap'
import CourseForm from '../forms/CourseForm'

/**
 * @param {boolean} isOpen - optionnal
 * @param {string} title
 * @param {function} closeModal
 * @param {function} fetchCourses
 */
export default function CourseModal (props) {
    return (
        <MyModal isOpen={props.isOpen} title="Ajouter un cours" closeModal={props.closeModal}>
            <ModalBody>
                <CourseForm close={props.closeModal} fetchCourses={props.fetchCourses}/>
            </ModalBody>
        </MyModal>
    )
}
