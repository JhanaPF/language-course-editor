import React from 'react';
import LessonModal from '../modals/LessonModal';
import OverviewWrapper from '../components/OverviewWrapper';
import Overview from '../common/Overview';

/**
 * @param {object} course
 */
export default class LessonsOverview extends Overview { // Show all lessons of a course

    constructor(props){
        super(props);
        this.lessonFilter = {'course': this.props.course._id};
    }

    componentDidMount(){this.onFetch();}

    render() {
        return(<>
            <OverviewWrapper objName="lessons" toggleModal={this.toggleModal} filter={this.lessonFilter}>
                <LessonModal 
                    isOpen={this.state.modal}
                    fetchLessons={this.closeModalAfterRequest} 
                    courseId={this.props.course._id} 
                    closeModal={this.toggleModal}/>
            </OverviewWrapper>
        </>);
    }

}