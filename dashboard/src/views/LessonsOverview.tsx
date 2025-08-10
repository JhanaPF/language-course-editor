import React, { useEffect } from 'react';
import LessonModal from '../modals/LessonModal';
import OverviewWrapper from '../components/wrappers/OverviewWrapper';
import QuestionsOverview from './QuestionsOverview';
import useOverview from '../common/useOverview';

type Props = {
    course: {_id: string};
};

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
    } = useOverview('lessons', {params: { course_id: course._id }})

    const selectedElement = getElement(elemId, elements);

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

            {selectedElement !== null && (
                <QuestionsOverview
                    courseId={course._id}
                    lesson={selectedElement}
                />
            )}
        </>
    )
}
