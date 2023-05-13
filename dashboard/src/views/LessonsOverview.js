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
        super({
            ...props, 
            filter: {'course': props.course._id},
            objName: "lessons"
        });
    }

    componentDidMount(){this.onFetch();}

    render() {
        return(<>
            <OverviewWrapper objName="lessons" toggleModal={this.toggleModal} elements={this.state.elements}>
                <LessonModal 
                    isOpen={this.state.modal}
                    fetchLessons={this.closeModalAfterRequest} 
                    courseId={this.props.course._id} 
                    closeModal={this.closeModal}/>
            </OverviewWrapper>

            {this.state.lesson &&
                <QuestionsOverview isOpen={this.state.elemId} lesson={null}/>
            }
        </>);
    }
}