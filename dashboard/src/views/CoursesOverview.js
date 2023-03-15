import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Input, Label, Button, Row, Col, Form, FormGroup, FormText, ModalBody, ButtonGroup, Modal} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import LessonsOverview from './LessonOverview';
import AddButton from '../components/AddButton';
import ReturnButton from '../components/ReturnButton';

class CoursesOverview extends React.Component {

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
                language: "français",
                pivot_tongue: "le français",
                released: false,
                flag_url: frenchFlagUrl,
                pivot_tongue_flag_url: englishFlag
            },
            {
                _id:3,
                language: "italien",
                pivot_tongue: "le français",
                released: false,
                flag_url: italianFlag,
                pivot_tongue_flag_url: frenchFlagUrl
            },
            {
                _id:3,
                language: "italien",
                pivot_tongue: "le français",
                released: false,
                flag_url: italianFlag,
                pivot_tongue_flag_url: frenchFlagUrl
            },
            {
                _id:3,
                language: "italien",
                pivot_tongue: "le français",
                released: false,
                flag_url: italianFlag,
                pivot_tongue_flag_url: frenchFlagUrl
            },
            {
                _id:3,
                language: "italien",
                pivot_tongue: "le français",
                released: false,
                flag_url: italianFlag,
                pivot_tongue_flag_url: frenchFlagUrl
            },
            {
                _id:3,
                language: "italien",
                pivot_tongue: "le français",
                released: false,
                flag_url: italianFlag,
                pivot_tongue_flag_url: frenchFlagUrl
            },
        ]

        this.state = {
            course: undefined
        }
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
        console.log(index)
        this.setState({course: index})
    }
    
    addCourse(){
        this.setState({addCourseModal: true})
    }

    closeModal(){
        this.setState({addCourseModal: false});
    }

    closeCourse(){
        this.setState({course: undefined});
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
                    <AddButton addFunction={this.addCourse.bind(this)}>Ajouter un cours</AddButton>
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
                            <Button onClick={this.openCourse.bind(this, course._id)}>
                                Modifier
                            </Button>
                        </CardBody>
                    </Card> 
                )}
            </Row>


            {this.state.addCourseModal &&
                <Modal isOpen={true} size='lg' style={{ overflowY: 'auto'}}>
                    <ModalBody className=''>
                        <Row className='border-bottom pb-3'>
                            <Col md='10'>
                                <h4>
                                    Ajouter un cours                 
                                </h4>
                            </Col>
                            <Col className='text-right ml-auto'>
                                <button onClick={this.props.toggleModal.bind(this, this.type)} type="button" className="btn btn-outline-secondary text-right ml-auto">X</button>
                            </Col>                        
                        </Row>
                            <Form>
                                <FormGroup className='mx-2'>
                                    <Label className='text-left mr-4' for="word">
                                        Langage à apprendre:
                                    </Label>
                                    <Input
                                        id="language"
                                        name="language"
                                        value={this.state.language}
                                        onChange={this.handleChange}
                                        invalid={!this.state.word} />
                                </FormGroup>
                                <FormGroup className='mx-2 mb-3'>
                                    <Label className='text-left'>
                                        Langue pivot:
                                    </Label>
                                    <Select
                                        name="class"
                                        value={this.state.class}
                                        onChange={this.handleSelectChange.bind(this, 'class')} 
                                        options={this.classOptions}  
                                        placeholder=""/>
                                </FormGroup>
                                <FormGroup className='mx-2 mb-3' >
                                    <Label for="vocalFile">
                                        Fichier vocal
                                    </Label>
                                    <Col sm={10}>
                                        <Input id="vocalFile" name="vocalFile" type="file" onChange={this.handleChange}/>
                                        <FormText>
                                            Ajouter un fichier vocal
                                        </FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup className='mx-2 mb-3'>
                                    <Label className='text-left' for="translated_definition">
                                        Définition (en langue pivot):
                                    </Label>                  
                                    <Input
                                        id="translated_definition"
                                        name="translated_definition"
                                        value={this.state.translated_definition}
                                        onChange={this.handleChange}  
                                        type='textarea'/>
                                </FormGroup>
                                <FormGroup className='mx-2 mb-3'>
                                    <Label className='text-left' for="definition">
                                        Définition:
                                    </Label>                  
                                    <Input
                                        id="definition"
                                        name="definition"
                                        value={this.state.definition}
                                        onChange={this.handleChange}
                                        type='textarea'/>
                                </FormGroup>


                                <FormGroup className='mx-2'>
                                    <Label className='text-left' for="story">
                                        Anecdote(s):
                                    </Label>                        
                                    <Input
                                        id={"story"}
                                        name="story"
                                        value={this.state.story}
                                        onChange={this.handleChange}
                                        type='textarea'/>                         
                                </FormGroup>

                                <FormGroup className='mx-2'>
                                    <Label className='text-left' for="level">
                                        Dictionnaire à lier:
                                    </Label>                  
                                    <Input
                                        id="level"
                                        name="level"
                                        type="select" 
                                        value={this.state.level}
                                        onChange={this.handleChange} 
                                        className="ml-1 mr-5">                                   
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                    </Input>
                                </FormGroup>
                                   
                                <FormGroup className='mx-2'>
                                    <Label className='text-left' for="source">
                                        Source:
                                    </Label>                  
                                    <Select 
                                        id="source"
                                        name="source"
                                        value={this.state.source}
                                        onChange={this.handleSelectChange.bind(this, 'source')} 
                                        options={this.sourceOptions} 
                                        placeholder="" />
                                </FormGroup>
                            </Form>
                    </ModalBody>
                </Modal>
            }

            {this.state.course &&
                <LessonsOverview course={this.state.course}/>
            }
        </>);
    }

}

export default CoursesOverview;