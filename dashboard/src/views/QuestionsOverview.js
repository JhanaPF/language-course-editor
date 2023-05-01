import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Button, Row, Col, ButtonGroup} from 'reactstrap';
import QuestionModal from '../modals/QuestionModal';
import { get } from '../apiRequests';


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
        this.fetchQuestions();
    }

    fetchQuestions(){
        var initState=(fields)=>{this.setState({loading: false, questionModal: false, ...fields})};
        get("questions", {'lesson': this.props.lesson._id}, (res)=>initState({questions: res}), ()=>initState());
    }

    questionIndexChange(lessonId, index) {
        
    }

    closeModal(){
        this.setState({lessonModal: false})
    }

    render() {
        return(<>

            {this.questions.map((question) => 
                <Card style={{ width: '18rem' }}>
                    {this.props.course.flag_url &&
                        <img src={this.props.course.flag_url} />
                    }

                    <CardBody>
                        <CardTitle tag="h5">
                            {question.name}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6" >
                            {question.sentence}
                        </CardSubtitle>
                        <CardText>
                            Détail
                        </CardText>
                        <Button>
                            Modifier
                        </Button>
                        <ButtonGroup>
                            <Button onClick={this.questionIndexChange.bind(this, question._id, -1)}>
                                {"<"}
                            </Button>
                            <Button onClick={this.questionIndexChange.bind(this, question._id, 1)}>
                                {">"}
                            </Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            )}

            {this.state.questionModal && 
               <QuestionModal closeModal={this.closeModal}/>
            }

        </>);
    }
}