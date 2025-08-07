import React from 'react'
import LessonForm from '../forms/LessonForm'
import MyModal from '../components/wrappers/MyModal'

type ObjectId = string; // ou: import { ObjectId } from 'mongodb';

interface LessonModalProps {
	isOpen?: boolean; // optionnel
	closeModal: () => void;
	courseId: ObjectId;
	fetchLessons: () => void;
}

/**
 * @param {boolean} isOpen - optionnal
 * @param {function} closeModal
 * @param {ObjectId} courseId
 * @param fetchLessons
 */
const LessonModal: React.FC<LessonModalProps> = (props) => {
	return (
		<MyModal isOpen={props.isOpen} title="Ajouter une leçon" closeModal={props.closeModal}>
			<LessonForm
				close={props.closeModal}
				fetchLessons={props.fetchLessons}
				courseId={props.courseId}
			/>
		</MyModal>
	);
};

export default LessonModal;