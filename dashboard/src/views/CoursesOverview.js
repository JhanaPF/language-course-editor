import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';

import LessonsOverview from './LessonsOverview';
import QuestionsOverview from './QuestionsOverview';
import AddButton from '../components/buttons/AddButton';
import ReturnButton from '../components/buttons/ReturnButton';
import CourseModal from '../modals/CourseModal';
import ClickableCard from '../components/cards/ClickableCard';

import { get } from '../api/apiRequests';

/**
 * @description 
 * @returns 
 */
function CoursesOverview() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courseId, setCourseId] = useState(undefined);
    const [courseModal, setCourseModal] = useState(false);

    useEffect(() => {
        fetchCourses();
    }, []);

    const initState = (res) => {
        setCourses(res.data.courses);
        setLoading(false);
    }

    const fetchCourses = () => {
        get('courses', {}, 
            (res) => initState(res), 
            () => {
                setLoading(false);
            }
        );
    };

    const toggleCourseModal = () => {
        setCourseModal(!courseModal);
    };

    const getCourse = (id) => {
        return courses.find((course) => course._id === id);
    };

    const displayedCourses = courseId
        ? courses.filter((course) => course._id === courseId)
        : courses;

    if (loading) return null;

    return (
        <>
            {!courseId && (
                <Row className="w-100 mt-5">
                    <Col className="text-right ml-auto">
                        <AddButton addFunction={toggleCourseModal}>Ajouter un cours</AddButton>
                    </Col>
                </Row>
            )}

            {courseId !== undefined && (
                <Row>
                    <ReturnButton goBack={() => setCourseId(undefined)} />
                </Row>
            )}

            <div className="clickable-card-group">
                {displayedCourses.map((course, index) => (
                    <ClickableCard key={index} type="course" item={course} onClick={setCourseId} />
                ))}
            </div>

            {courseModal && (
                <CourseModal closeModal={toggleCourseModal} fetchCourses={fetchCourses} />
            )}

            {courseId && <LessonsOverview course={getCourse(courseId)} />}

        </>
    );
}

export default CoursesOverview;