import React from 'react'
import MyModal from '../components/wrappers/MyModal'
import { ModalBody } from 'reactstrap'
import CourseForm from '../forms/CourseForm'


type CourseModalProps = {
  isOpen?: boolean;
  title?: string;
  closeModal: () => void;
  fetchCourses: () => void;
};

export default function CourseModal({ isOpen = false, title = 'Ajouter un cours', closeModal, fetchCourses }: CourseModalProps) {
    return (
        <MyModal isOpen={isOpen} title={title} closeModal={closeModal}>
            <ModalBody>
                <CourseForm close={closeModal} fetchCourses={fetchCourses}/>
            </ModalBody>
        </MyModal>
    )
}
