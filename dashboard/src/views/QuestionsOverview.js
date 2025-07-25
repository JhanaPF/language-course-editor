import React from 'react'
import QuestionModal from '../modals/QuestionModal'
import OverviewWrapper from '../components/wrappers/OverviewWrapper'
import Overview from '../common/Overview'

/**
 * lesson, courseId
 */
export default class QuestionsOverview extends Overview { // Show all questions of a lesson
    constructor (props) {
        super(props, { lesson_id: props.lesson._id }, 'questions')
    }

    componentDidMount = () => this.onFetch()

    render () {
        return (this.props.lesson
            ? <>
                <OverviewWrapper
                    objName="questions"
                    buttonObjName="Une question"
                    toggleModal={this.toggleModal}
                    elemId={this.state.elemId}
                    elements={this.state.elements}
                    setElement={this.setElement}>
                    <QuestionModal
                        isOpen={this.state.modal}
                        fetchQuestions={this.closeModalAfterRequest}
                        lessonId={this.props.lesson._id}
                        courseId={this.props.courseId}
                        closeModal={this.closeModal}/>
                </OverviewWrapper>
            </>
            : null)
    }
}
