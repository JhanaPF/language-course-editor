import './css/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Login from './views/Login';
import { post } from './api/apiRequests';
import CoursesOverview from './views/CoursesOverview';
import LessonsOverview from './views/LessonsOverview';
import QuestionsOverview from './views/QuestionsOverview';
import Layout from './components/wrappers/Layout';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        // Décommente et adapte cette logique selon besoin
        /*
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
          setLoggedIn(true);
          setLoading(false);
          return;
        }
    
        const isIdSaved = localStorage.getItem('keepConnection');
        if (isIdSaved) {
          const mail = localStorage.getItem('mail');
          const password = localStorage.getItem('password');
          signIn(mail, password);
          return;
        }
    
        post('auth/token',
          () => unlockApp(),
          () => setLoading(false)
        );
        */
    }, []);

    const signIn = (mail, password) => {
        post('auth/signin', { mail, password },
            (res) => {
                localStorage.setItem('userId', res.data.userId);
                unlockApp();
            },
            () => setLoading(false)
        );
    };

    const unlockApp = () => {
        setLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', true);
        navigate('/courses');
    };

    return (
        <Routes>
            <Route path="/" element={<Login signIn={signIn} />} />

            <Route element={<Layout />}>
                <Route path="/courses" element={<CoursesOverview />} />
                <Route path="/lessons/:courseId" element={<LessonsOverview />} />
                <Route path="/questions/:lessonId" element={<QuestionsOverview />} />
            </Route>
        </Routes>
    );
}

// Composant wrapper pour intégrer le Router (car `useNavigate` ne fonctionne qu'à l'intérieur d'un `<BrowserRouter>`)
function AppWithRouter() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}

export default AppWithRouter;
