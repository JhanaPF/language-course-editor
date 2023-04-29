import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, Button, Row, Col} from 'reactstrap';
import LessonsOverview from './LessonsOverview';
import AddButton from '../components/AddButton';
import ReturnButton from '../components/ReturnButton';
import QuestionsOverview from './QuestionsOverview';
import CourseModal from '../modals/CourseModal';
import { get } from '../apiRequests';
import { capitalizeFirstLetter } from '../utils/stringUtils';

class CoursesOverview extends React.Component { // Show all courses

    constructor(props){
        super(props);

        this.apiUrl = localStorage.getItem("apiUrl");
       
        this.state = {
            course: undefined,
            loading: true,
        }

        this.toggleCourseModal = this.toggleCourseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.fetchCourses();
    }
    
    fetchCourses(){
        get("dictionaries", {}, (res)=>this.initState(res), ()=>this.setState({loading: false, courseModal: false}));
    }

    componentDidUpdate(){
        console.log("state: ",  this.state)
    }

    initState(data){
        //console.log("Courses fetched", data)
        this.setState({dictionaries: data, loading: false, courseModal: false})
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
    
    setCourse(id){
        this.setState({courseId: id})
    }

    getCourse(id){
        return this.state.dictionaries.find(course=>course._id === id);
    }

    render() {

        if(!this.state.dictionaries) return null;

        let courses = this.state.courseId ? this.state.dictionaries.filter(course => course._id === this.state.courseId) : this.state.dictionaries;

        return(<>
            <Row className='w-100 mt-5'>
                <Col></Col>
                <Col >
                    <h3 className='my-auto'>Liste des cours disponibles:</h3>
                </Col>
                <Col className='text-left m-auto'>
                    <AddButton addFunction={this.toggleCourseModal.bind(this)}>Ajouter un cours</AddButton>
                </Col>
            </Row>

            {this.state.courseId !== undefined && 
                <ReturnButton goBack={function(){this.setCourse(undefined)}.bind(this)}/>
            }

            <Row className='mt-3 mx-5 w-100 justify-content-center'>
                {courses.map((course, index) => 
                    <Card key={index} style={{ width: '18rem' }}>
                        <img alt="flag" crossOrigin='use-credentials' src={`${this.apiUrl}pictures/courses/${course.file_name}`}/>
                        <CardBody>
                            <CardTitle tag="h5">
                                {capitalizeFirstLetter(course.language)}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6" >
                                Depuis {course.pivot_language}
                            </CardSubtitle>
                            {this.state.courseId === undefined && 
                                <Button onClick={this.setCourse.bind(this, course._id)}> Modifier </Button>
                            }
                        </CardBody>
                    </Card> 
                )}
            </Row>
            

            {this.state.courseModal &&
                <CourseModal closeModal={this.toggleCourseModal} fetchCourses={this.fetchCourses.bind(this)}/>
            }

            {this.state.courseId &&
                <LessonsOverview course={this.getCourse(this.state.courseId)}/>
            }

            {this.state.lesson &&
                <QuestionsOverview/>
            }
        </>);
    }

}

export default CoursesOverview;