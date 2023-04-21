import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, Button, Row, Col} from 'reactstrap';
import LessonsOverview from './LessonsOverview';
import AddButton from '../components/AddButton';
import ReturnButton from '../components/ReturnButton';
import QuestionsOverview from './QuestionsOverview';
import CourseModal from '../modals/CourseModal';
import { get } from '../apiRequests';

class CoursesOverview extends React.Component { // Show all courses

    constructor(props){
        super(props);

        const frenchFlagUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png";
        const spanishFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png";
        const englishFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1200px-Flag_of_the_United_Kingdom_%283-5%29.svg.png";
        const italianFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Italy_%282003%E2%80%932006%29.svg/220px-Flag_of_Italy_%282003%E2%80%932006%29.svg.png";
       
        this.apiUrl = localStorage.getItem("apiUrl");
       
        this.courses = [
            {
                _id:1,
                language: "Espagnol",
                pivot_tongue: "le français",
                released: true,
                flag_url: spanishFlag
            },
            {
                _id:2,
                language: "Français",
                pivot_tongue: "le français",
                released: false,
                flag_url: frenchFlagUrl,
            },
            {
                _id:3,
                language: "Italien",
                pivot_tongue: "le français",
                released: false,
                flag_url: italianFlag,
            },
        ]

        this.state = {
            course: undefined,
            loading: true,
        }

        this.toggleCourseModal = this.toggleCourseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        get("dictionaries", {}, (res)=>this.initState(res), ()=>this.setState({loading: false}))
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    initState(data){
        console.log("Courses fetched", data)
        this.setState({dictionaries: data, loading: false})
    }
    
    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    handleChange(event){
        const {name, value} = event.currentTarget;
        this.setState({[name]: value});
    }

    lessonIndexChange(lessonId, index) {
        
    }

    toggleCourseModal(){
        this.setState({courseModal: !this.state.courseModal});
    }
    
    setCourse(index){
        this.setState({course: index})
    }

    render() {

        let courses = this.courses;
        if(this.state.course !== undefined) courses = this.courses.filter(course => course._id === this.state.course);

        return(<>
            <Row className='w-100'>
                <Col>
                    <h3 className='text-right my-auto'>Liste des cours disponibles:</h3>
                </Col>
                <Col className='text-left m-auto'>
                    <AddButton addFunction={this.toggleCourseModal.bind(this)}>Ajouter un cours</AddButton>
                </Col>
            </Row>

            {this.state.course !== undefined && 
                <ReturnButton goBack={function(){this.setCourse(undefined)}.bind(this)}/>
            }

            <Row className='mt-3 mx-5 w-100 justify-content-center'>
                {this.state.dictionaries && this.state.dictionaries.map((course, index) => 
                    <Card key={index} style={{ width: '18rem' }}>
                        <img src={`${this.apiUrl}pictures/courses/${course.file_name}`}/>
                        <CardBody>
                            <CardTitle tag="h5">
                                {course.language}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6" >
                                Depuis {course.pivot_language}
                            </CardSubtitle>
                            {this.state.course === undefined && 
                                <Button onClick={this.setCourse.bind(this, course._id)}> Modifier </Button>
                            }
                        </CardBody>
                    </Card> 
                )}
            </Row>
            

            {this.state.courseModal &&
                <CourseModal closeModal={this.toggleCourseModal}/>
            }

            {this.state.course &&
                <LessonsOverview course={this.state.course}/>
            }

            {this.state.lesson &&
                <QuestionsOverview/>
            }
        </>);
    }

}

export default CoursesOverview;