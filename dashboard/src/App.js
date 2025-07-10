import './css/App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Dashboard from './views/Dashboard'
import Login from './views/Login'
import ProtectedLayout from './components/wrappers/ProtectedLayout';
import { post } from './api/apiRequests'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            uId: '',
            loggedin: false,
        }
    }

    componentDidMount() {

        //const isIdSaved = localStorage.getItem('keepConnection')
        //const isLoggedIn = sessionStorage.getItem('isLoggedIn')

        //if (isLoggedIn) {
        //    return this.setState({ loggedin: true, loading: false })
        //}

        //if (isIdSaved) {
        //    const mail = localStorage.getItem('mail')
        //    const password = localStorage.getItem('password')
        //    this.signIn(mail, password)
        //    return
        //}

        //post('auth/token',
        //    () => this.unlockApp(), // Token still valid
        //    () => { // No token or not valid anymore
        //        console.log("No token")
        //        this.setState({ loading: false })
        //    }
        //)
    }

    signIn = (mail, password) => {

        post('auth/signin', { mail, password },
            (res) => {
                console.log(res)
                localStorage.setItem('userId', res.data.userId)
                this.unlockApp()
            },
            () => this.setState({ loading: false })
        )
    }

    unlockApp() {
        console.log("logged in")
        this.setState({ loggedin: true, loading: false })
        sessionStorage.setItem('isLoggedIn', true)
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    {/* Route login sans layout */}
                    <Route path="/" element={<Login signIn={this.signIn.bind(this)} />} />

                    {/* Routes protégées avec layout */}
                    <Route element={<ProtectedLayout />}>
                        <Route path="/dashboard" element={<Dashboard userId={this.state.userId} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App