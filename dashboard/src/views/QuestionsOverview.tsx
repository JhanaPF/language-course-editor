import React from 'react'
import { useEffect } from 'react';

import QuestionModal from '../modals/QuestionModal'
import OverviewWrapper from '../components/wrappers/OverviewWrapper'
import useOverview from '../common/useOverview';

/**
 * @param lesson
 * @param courseId
 */
function QuestionsOverview ({ lesson, courseId }: { lesson: any; courseId: string }) {
    const {
        elements,
        elemId,
        modal,
        onFetch,
        toggleModal,
        closeModal,
        setElement,
        closeModalAfterRequest,
    } = useOverview('questions', { params: { lesson_id: lesson?._id } })

    useEffect(() => {
        if (lesson) {
            onFetch()
        }
    }, [lesson, onFetch])

    if (!lesson) return null


    return (lesson
        ? <>
            <OverviewWrapper
                objName="questions"
                buttonObjName="Une question"
                toggleModal={toggleModal}
                elemId={elemId}
                elements={elements}
                setElement={setElement}>
                <QuestionModal
                    isOpen={modal}
                    fetchQuestions={closeModalAfterRequest}
                    lessonId={lesson._id}
                    courseId={courseId}
                    closeModal={closeModal} />
            </OverviewWrapper>
        </>
        : null)

}

export default QuestionsOverview;