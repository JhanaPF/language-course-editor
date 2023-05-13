import React from 'react';
import QuestionModal from '../modals/QuestionModal';
import OverviewWrapper from '../components/OverviewWrapper';
import Overview from '../common/Overview';


export default class QuestionsOverview extends Overview { // Show all questions of a lesson

    constructor(props){
        super(props);
        this.filter = {'lesson': props.lesson._id};
        this.fetchQuestions = this.fetchQuestions.bind(this);
    }

    componentDidMount(){super.onFetch(this.filter);}

    render() {
        return(this.props.lesson ? <>
            <OverviewWrapper objName="questions" toggleModal={this.toggleModal} filter={this.filter}>
                <QuestionModal 
                    isOpen={this.state.modal}
                    fetchQuestions={this.closeModalAfterRequest} 
                    lessonId={this.props.lesson._id} 
                    closeModal={this.closeModal}/>  
            </OverviewWrapper>
        </> : null);
    }
}