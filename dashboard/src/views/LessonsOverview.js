import React from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText, Button, ButtonGroup} from 'reactstrap';
import LessonModal from '../modals/LessonModal';
import AddButton from '../components/AddButton';
import { get } from '../apiRequests';
import Overview from '../components/Overview';


/**
 * @props {object} course
 */
export default class LessonsOverview extends React.Component { // Show all lessons of a course

    constructor(props){
        super(props);
        //console.log(this.props.course)

        this.state = {
            course: this.props.course,
            lessonModal: false,
        }

        this.closeModal = this.closeModal.bind(this);
        this.openLessonModal = this.openLessonModal.bind(this);
    }

    componentDidMount(){
        this.fetchLessons();
    }

    fetchLessons(){
        var initState=(fields)=>{this.setState({loading: false, lessonModal: false, ...fields})};
        get("lessons", {'course': this.props.course._id}, (res)=>initState({lessons: res}), ()=>initState());
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
        if(!this.state.lessons) return null;
        let lessons = this.state.lessonId ? this.state.lessons.find(lesson => lesson._id === this.state.lessonId) : this.state.lessons;

        return(<>

            <Overview objName="lessons" filter={{'course': this.props.course._id}}>

            </Overview>


            <LessonModal 
                isOpen={this.state.lessonModal} 
                fetchLessons={this.fetchLessons.bind(this)} 
                courseId={this.props.course._id} 
                closeModal={this.closeModal}/>

        </>);
    }

}