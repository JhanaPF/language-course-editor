import React from 'react'
import LessonForm from '../forms/LessonForm'
import MyModal from '../components/wrappers/MyModal'

/**
 * @param {boolean} isOpen - optionnal
 * @param {function} closeModal
 * @param {ObjectId} courseId
 * @param fetchLessons
 */
export default function LessonModal (props) {
    return (
        <MyModal isOpen={props.isOpen} title="Ajouter une leçon" closeModal={props.closeModal}>
            <LessonForm close={props.closeModal} fetchLessons={props.fetchLessons} courseId={props.courseId}/>
        </MyModal>
    )
}
