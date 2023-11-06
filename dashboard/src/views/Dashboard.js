import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { Row } from 'reactstrap';
import CoursesOverview from './CoursesOverview';

function Dashboard() {

    return (
        <Row>
            <CoursesOverview />
        </Row>
    );
}

export default Dashboard;