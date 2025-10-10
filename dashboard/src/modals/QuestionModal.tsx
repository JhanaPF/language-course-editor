import React from 'react'
import QuestionForm from '../forms/QuestionForm'
import MyModal from '../components/wrappers/MyModal'


type QuestionModalProps = {
  isOpen?: boolean; // optionnel
  closeModal: () => void;
  courseId: string;
  lessonId: string;
  fetchQuestions: () => void; // ou la vraie signature de ta fonction
};

/**
 * @param {boolean} isOpen - optionnal
 * @param {function} closeModal
 * @param {ObjectId} courseId
 * @param {ObjectId} lessonId
 * @param fetchLessons
 */
export default function QuestionModal(props: QuestionModalProps) {
    return (
        <MyModal isOpen={props.isOpen} title="Ajouter une question" closeModal={props.closeModal}>
            <QuestionForm fetchQuestions={props.fetchQuestions} courseId={props.courseId} lessonId={props.lessonId}/>
        </MyModal>
    );
}
