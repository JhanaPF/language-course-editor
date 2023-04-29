import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Button, ButtonGroup} from 'reactstrap';
import LessonModal from '../modals/LessonModal';
import AddButton from '../components/AddButton';

/**
 * @props {object} course
 */
export default class LessonsOverview extends React.Component { // Show all lessons of a course

    constructor(props){
        super(props);
        console.log(this.props.course)
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
        this.openLessonModal = this.openLessonModal.bind(this);
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    lessonIndexChange(lessonId, index) {
        console.log("update lesson index");
    }

    closeModal(){
        this.setState({lessonModal: false});
    }

    openLessonModal(){
        this.setState({lessonModal: true});
    }

    render() {
        return(<>

            <AddButton addFunction={this.openLessonModal}>Ajouter une leçon</AddButton>

    
            {this.lessons.map((lesson, i) => 
                <Card key={i} style={{ width: '18rem' }}>
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
                        <Button onClick={this.openLessonModal}>
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
               <LessonModal courseId={this.props.course._id} closeModal={this.closeModal}/>
            }

        </>);
    }

}