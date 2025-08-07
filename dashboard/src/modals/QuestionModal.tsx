import React from 'react'
import QuestionForm from '../forms/QuestionForm'
import MyModal from '../components/wrappers/MyModal'

/**
 * @param {boolean} isOpen - optionnal
 * @param {function} closeModal
 * @param {ObjectId} courseId
 * @param {ObjectId} lessonId
 * @param fetchLessons
 */
export default function QuestionModal (props) {
    return (
        <MyModal isOpen={props.isOpen} title="Ajouter une question" closeModal={props.closeModal}>
            <QuestionForm close={props.closeModal} fetchQuestions={props.fetchQuestions} courseId={props.courseId} lessonId={props.lessonId}/>
        </MyModal>
    )
}
