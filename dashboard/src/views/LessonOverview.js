import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Input, Label, Button, Row, Col, ButtonGroup} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';

class LessonsOverview extends React.Component {

    constructor(props){
        super(props);

        this.questions = [
            {
                sentence: "Bonjour"
            },
            {
                sentence: "Comment allez-vous ?"
            },
        ]

        this.lessons = [
            {
                name: "Se présenter",
                description: "Se présenter à quelqu'un"
            },
            {
                name: "Réserver un hôtel",
                description: "Dialogue avec un receptionniste pour louer un chambre"
            },
        ]

        this.courses = [
            {
                language: "espanol",
                pivot_tongue: "français",
                released: true
            },
            {
                language: "français",
                pivot_tongue: "english",
                released: false
            },
        ]

        this.state = {
            course: this.props.course
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

    render() {
        return(
            this.lessons.map((lesson) => 
                <Card style={{ width: '18rem' }}>
                    <img alt="Sample" src={course.flag_url} />
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
            )
        );
    }

}

export default LessonsOverview;