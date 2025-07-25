import React from 'react'
import QuestionModal from '../modals/QuestionModal'
import OverviewWrapper from '../components/wrappers/OverviewWrapper'
import useOverview from '../common/Overview';

/**
 * @param lesson
 * @param courseId
 */
export default QuestionsOverview = ({ lesson, courseId }) => {
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