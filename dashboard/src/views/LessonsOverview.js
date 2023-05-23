import React from 'react';
import LessonModal from '../modals/LessonModal';
import OverviewWrapper from '../components/OverviewWrapper';
import Overview from '../common/Overview';
import QuestionsOverview from './QuestionsOverview';

/**
 * @param {object} course
 */

export default class LessonsOverview extends Overview { // Show all lessons of a course

    constructor(props){
        super(props, {'course': props.course._id}, "lessons");
    }

    componentDidMount =()=> this.onFetch();

    render() {
        return(<>
            <OverviewWrapper 
                objName="lessons" 
                buttonObjName="une leçon"
                toggleModal={this.toggleModal} 
                elemId={this.state.elemId} 
                elements={this.state.elements} 
                setElement={this.setElement}>
                    <LessonModal 
                        isOpen={this.state.modal}
                        fetchLessons={this.closeModalAfterRequest} 
                        courseId={this.props.course._id} 
                        closeModal={this.closeModal}/>
            </OverviewWrapper>

            {this.state.element &&
                <QuestionsOverview isOpen={this.state.elemId} courseId={this.props.course._id} lesson={this.getElement(this.state.elemId)}/>
            }
        </>);
    }
}