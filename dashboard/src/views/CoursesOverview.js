import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Input, Label, Button, Row, Col, ButtonGroup} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';

class CoursesOverview extends React.Component {

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

        const frenchFlagUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/langfr-225px-Flag_of_France.svg.png";
        const spanishFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png";
        const englishFlag = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1200px-Flag_of_the_United_Kingdom_%283-5%29.svg.png";
        this.courses = [
            {
                language: "espanol",
                pivot_tongue: "français",
                released: true,
                flag_url: spanishFlag
            },
            {
                language: "français",
                pivot_tongue: "english",
                released: false,
                flag_url: frenchFlagUrl,
                pivot_tongue_flag_url: englishFlag
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
            this.courses.map((course) => 
                <Card style={{ width: '18rem' }}>
                    <img alt="Sample" src={course.flag_url} />
                    <CardBody>
                        <CardTitle tag="h5">
                            {course.language}
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6" >
                            Depuis {course.pivot_tongue}
                        </CardSubtitle>
                        <CardText>
                            Détail
                        </CardText>
                        <Button>
                            Modifier
                        </Button>
                    </CardBody>
                </Card>
            )
        );
    }

}

export default CoursesOverview;