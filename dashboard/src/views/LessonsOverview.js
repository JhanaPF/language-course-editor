import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Input, Label, Button, Row, Col, ButtonGroup, Modal, FormGroup} from 'reactstrap';
import axios from 'axios';
import LessonModal from '../modals/LessonModal';

export default class LessonsOverview extends React.Component { // Show all lessons of a course

    constructor(props){
        super(props);

        this.lessons = [
            {
                _id: "fdslkj67575",
                name: "Se présenter",
                description: "Se présenter à quelqu'un"
            },
            {
                _id: "fd77hhdgdgd75",
                name: "Réserver un hôtel",
                description: "Dialogue avec un receptionniste pour louer un chambre"
            },
            {
                _id: "fd77hsfzehdgdgd75",
                name: "Les verbes",
                description: ""
            },
        ]


        this.state = {
            course: this.props.course
        }

        this.closeModal = this.closeModal.bind(this);
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    update(){
        if(!this.isValid()) return; 

        const data = this.getData();
        //console.log(save.word, this.state.translated_definition)
        axios.post(
            this.apiUrl + 'lesson-questions',
            data, 
            { headers: { 'Authorization': this.props.token,  'Content-Type': 'multipart/form-data' } }
        )
        .then( () => this.props.toggleModal())
        .catch(function (error) {console.log(error)});     
    }

    formValidation () {
        
    }

    lessonIndexChange(lessonId, index) {
        
    }

    closeModal(){
        this.setState({lessonModal: false})
    }

    render() {
        return(<>
    
            {this.lessons.map((lesson) => 
                <Card style={{ width: '18rem' }}>
                    {this.props.course.flag_url &&
                        <img src={this.props.course.flag_url} />
                    }

                    <CardBody>
                        <CardTitle tag="h5">
                            {lesson.name}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6" >
                            {lesson.sentence}
                        </CardSubtitle>
                        <CardText>
                            Détail
                        </CardText>
                        <Button>
                            Modifier
                        </Button>
                        <ButtonGroup>
                            <Button onClick={this.lessonIndexChange.bind(this, lesson._id, -1)}>
                                {"<"}
                            </Button>
                            <Button onClick={this.lessonIndexChange.bind(this, lesson._id, 1)}>
                                {">"}
                            </Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            )}

            {this.state.lessonModal && 
               <LessonModal closeModal={this.closeModal}/>
            }

        </>);
    }

}