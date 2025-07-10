import React from 'react'
import { Row, Col } from 'reactstrap'
import LessonsOverview from './LessonsOverview'
import AddButton from '../components/buttons/AddButton'
import ReturnButton from '../components/buttons/ReturnButton'
import QuestionsOverview from './QuestionsOverview'
import CourseModal from '../modals/CourseModal'
import { get } from '../api/apiRequests'
import ClickableCard from '../components/cards/ClickableCard'

class CoursesOverview extends React.Component { // Show all courses
    
    constructor(props) {
        super(props)

        this.state = {
            course: undefined,
            loading: true
        }

        this.toggleCourseModal = this.toggleCourseModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.fetchCourses()
    }

    fetchCourses() {
        get('courses', {}, (res) => this.initState(res), () => this.setState({ loading: false, courseModal: false }))
    }

    initState(res) {
        this.setState({ courses: res.data.courses, loading: false, courseModal: false })
    }

    handleSelectChange = (param, e) => {
        this.setState({ [param]: e })
    }

    handleChange(event) {
        const { name, value } = event.currentTarget
        this.setState({ [name]: value })
    }

    toggleCourseModal() {
        this.setState({ courseModal: !this.state.courseModal })
    }

    setCourse(id) {
        this.setState({ courseId: id })
    }

    getCourse(id) {
        return this.state.courses.find(course => course._id === id)
    }

    render() {
        if (!this.state.courses) return null

        const courses = this.state.courseId ? this.state.courses.filter(course => course._id === this.state.courseId) : this.state.courses

        return (<>
            {!this.state.courseId &&
                <Row className='w-100 mt-5'>
                    <Col className='text-right ml-auto'>
                        <AddButton addFunction={this.toggleCourseModal.bind(this)}>Ajouter un cours</AddButton>
                    </Col>
                </Row>
            }

            {this.state.courseId !== undefined &&
                <Row>
                    <ReturnButton goBack={function () { this.setCourse(undefined) }.bind(this)} />
                </Row>
            }

            <div className='mt-3 d-flex w-100 justify-content-center'>
                {courses.map((course, index) =>
                    <ClickableCard key={index} type="course" item={course} onClick={this.setCourse.bind(this)}/>
                )}
            </div>

            {this.state.courseModal &&
                <CourseModal closeModal={this.toggleCourseModal} fetchCourses={this.fetchCourses.bind(this)} />
            }

            {this.state.courseId &&
                <LessonsOverview course={this.getCourse(this.state.courseId)} />
            }

            {this.state.lesson &&
                <QuestionsOverview />
            }
        </>)
    }
}

export default CoursesOverview
