import React from 'react'
import { Card, CardBody, CardSubtitle, CardTitle, Button, Row, Col } from 'reactstrap'
import LessonsOverview from './LessonsOverview'
import AddButton from '../components/AddButton'
import ReturnButton from '../components/ReturnButton'
import QuestionsOverview from './QuestionsOverview'
import CourseModal from '../modals/CourseModal'
import { get } from '../api/apiRequests'
import { capitalizeFirstLetter } from '../utils/stringUtils'

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

    lessonIndexChange(lessonId, index) {

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
                    <Card
                        key={index}
                        style={{ width: '18rem', cursor: 'pointer' }}
                        onClick={() => this.setCourse(course._id)}
                    >
                        <img
                            alt="flag"
                            crossOrigin="use-credentials"
                            src={`${process.env.REACT_APP_API_URL}pictures/courses/${course.file_name}`}
                        />
                        <CardBody>
                            <CardTitle tag="h5">
                                {capitalizeFirstLetter(course.language)}
                            </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                Depuis {course.pivot_language}
                            </CardSubtitle>
                            {/**this.state.courseId === undefined && (
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    this.setCourse(course._id);
                                }}>
                                    Modifier
                                </Button>
                            )*/}
                        </CardBody>
                    </Card>
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
