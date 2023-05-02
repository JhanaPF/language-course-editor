import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Button, Row, Col, ButtonGroup} from 'reactstrap';
import QuestionModal from '../modals/QuestionModal';
import { get } from '../apiRequests';
import Overview from '../components/Overview';

export default class QuestionsOverview extends React.Component { // Show all questions of a lesson

    constructor(props){
        super(props);

        this.state = {
            lesson: this.props.lesson,
            questionModal: false,
        }

        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
    }

    fetchQuestions(){
        var initState=(fields)=>{this.setState({loading: false, questionModal: false, ...fields})};
        get("questions", {'lesson': this.props.lesson._id}, (res)=>initState({questions: res}), ()=>initState());
    }

    render() {

        return(<>

            <Overview objName="questions" filter={{'lesson': this.props.lesson._id}}>
            </Overview>


            {this.state.questionModal && 
               <QuestionModal closeModal={this.closeModal}/>
            }

        </>);
    }
}