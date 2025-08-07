import React, { useEffect } from 'react';
import LessonModal from '../modals/LessonModal';
import OverviewWrapper from '../components/wrappers/OverviewWrapper';
import QuestionsOverview from './QuestionsOverview';
import useOverview from '../common/useOverview';

type Props = {
    course: {_id: string};
};

/**
 * @param {object} course
 */
export default function LessonsOverview({ course }: Props) {
    const {
        modal,
        toggleModal,
        closeModal,
        closeModalAfterRequest,
        elements,
        elemId,
        setElement,
        getElement,
    } = useOverview('lessons', { course_id: course._id })

    const selectedElement = getElement(elemId);

    return (
        <>
            <OverviewWrapper
                objName="lessons"
                buttonObjName="une leçon"
                toggleModal={toggleModal}
                elemId={elemId}
                elements={elements}
                setElement={setElement}>
                <LessonModal
                    isOpen={modal}
                    fetchLessons={closeModalAfterRequest}
                    courseId={course._id}
                    closeModal={closeModal}
                />
            </OverviewWrapper>

            {selectedElement && (
                <QuestionsOverview
                    isOpen={elemId}
                    courseId={course._id}
                    lesson={selectedElement}
                />
            )}
        </>
    )
}
