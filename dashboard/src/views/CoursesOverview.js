import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Input, Label, Button, Row, Col, Form, FormGroup, FormText, ModalBody, ButtonGroup, Modal} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import LessonsOverview from './LessonsOverview';
import AddButton from '../components/AddButton';
import ReturnButton from '../components/ReturnButton';
import QuestionsOverview from './QuestionsOverview';
import CourseModal from '../modals/CourseModal';

class CoursesOverview extends React.Component { // Show all courses

    constructor(props){
        super(props);

        const frenchFlagUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png";
        const spanishFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png";
        const englishFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1200px-Flag_of_the_United_Kingdom_%283-5%29.svg.png";
        const italianFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Italy_%282003%E2%80%932006%29.svg/220px-Flag_of_Italy_%282003%E2%80%932006%29.svg.png";
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
                pivot_tongue_flag_url: englishFlag
            },
            {
                _id:3,
                language: "Italien",
                pivot_tongue: "le français",
                released: false,
                flag_url: italianFlag,
                pivot_tongue_flag_url: frenchFlagUrl
            },
        ]

        this.state = {
            course: undefined
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSelectChange = (param, e) =>{
        this.setState({ [param] : e });
    }

    handleChange(event){
        const {name, value} = event.currentTarget;
        this.setState({[name]: value});
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

    save = (next) =>{  
        if(this.isValid() === false) return; 
        
        const data = this.getData();
        const formData = new FormData();
        formData.append("audio-file", this.state.vocalFile);
        axios.put(
            this.apiUrl + 'dictionaries/word', 
            formData,
            { 
                headers: { 
                    'Authorization': this.props.token,
                    'Accept' : 'application/json'
                    //'Content-Type': 'multipart/form-data'
                },
            },
        )
        .then( () => {
            console.log(formData)
            if(next)
                this.props.reloadModal();
            else 
                this.props.toggleModal();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    formValidation () {
    }

    lessonIndexChange(lessonId, index) {
        
    }

    openCourse(index){
        this.setState({course: index})
    }
    
    openCourseModal(){
        this.setState({courseModal: true})
    }
    
    closeModal(){
        this.setState({courseModal: false});
    }

    closeCourse(){
        this.setState({course: undefined});
    }

    addCourse(){
        const data = {
            language: this.state.language,
            raw_name: this.state.rawName, // spanish_from_french for example to link with the dictionnary word collection
            pivot_language: this.state.pivotLanguage,
            flagFile: this.state.flagFile, 
        }
    }

    addLesson(){

    }

    render() {

        let courses = this.courses;
        if(this.state.course !== undefined) courses = this.courses.filter(course => course._id === this.state.course);

        return(<>
            <Row className='w-100'>
                <Col>
                    <h3 className='text-right mt-4'>Liste des cours disponibles</h3>
                </Col>
                <Col className='text-left m-auto'>
                    <AddButton addFunction={this.openCourseModal.bind(this)}>Ajouter un cours</AddButton>
                </Col>
            </Row>

            {this.state.course !== undefined && 
                <ReturnButton goBack={this.closeCourse.bind(this)}/>
            }

            <Row className='mt-3 mx-5 w-100 justify-content-center'>
                {courses && courses.map((course) => 
                    <Card style={{ width: '18rem' }}>
                        <img alt="Sample" src={course.flag_url} />
                        <CardBody>
                            <CardTitle tag="h5">
                                {course.language}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6" >
                                Depuis {course.pivot_tongue}
                            </CardSubtitle>
                            {this.state.course === undefined && 
                                <Button onClick={this.openCourse.bind(this, course._id)}>
                                    Modifier
                                </Button>
                            }
                            {this.state.course &&
                                <AddButton addFunction={this.addLesson.bind(this)}>Ajouter une leçon</AddButton>
                            }
                        </CardBody>
                    </Card> 
                )}
            </Row>
            

            {this.state.courseModal &&
                <CourseModal closeModal={this.closeModal}/>
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