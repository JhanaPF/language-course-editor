import './App.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Dashboard from './views/Dashboard'
import SignIn from './views/SignIn'
import { post } from './apiRequests'
import { Spinner } from 'reactstrap'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            uId: '',
            loggedin: false,
            loading: true
        }

        if (!process.env.REACT_APP_API_URL) {
            throw new Error("REACT_APP_API_URL is not defined in your environment variables.");
        }

        localStorage.setItem('apiUrl', process.env.REACT_APP_API_URL)
    }

    componentDidMount() { // Starting application

        const isIdSaved = localStorage.getItem('keepConnection')
        const isLoggedIn = sessionStorage.getItem('isLoggedIn')

        if (isLoggedIn) {
            return this.setState({ loggedin: true, loading: false })
        }


        if (isIdSaved) {
            const mail = localStorage.getItem('mail')
            const password = localStorage.getItem('password')
            this.signIn(mail, password)
            return
        }

        const headers = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        post('auth/token', headers,
            () => this.unlockApp(), // Token still valid
            () => { // No token or not valid anymore
                console.log("No token")
                this.setState({ loading: false })
            }
        )
    }

    signIn = (mail, password) => {
        const headers = {
            headers: {
                'Content-Type': 'application/json',
            },
        }


        post('auth/signin', { mail, password }, headers,
            (res) => {
                console.log(res)
                localStorage.setItem('userId', res.data.userId)
                this.unlockApp()
            },
            () => this.setState({ loading: false })
        )
    }

    unlockApp() {
        this.setState({ loggedin: true, loading: false })
        sessionStorage.setItem('isLoggedIn', true)
    }

    render() {
        if (this.state.loading) {
            return (
                <div className='d-flex justify-content-center align-items-center vh-100'>
                    <Spinner className='m-auto' color="warning">
                        .
                    </Spinner>
                </div>
            )
        }

        return (
            <div className="App">
                {this.state.loggedin
                    ? <Dashboard userId={this.state.userId} />
                    : <SignIn signIn={this.signIn.bind(this)} />
                }
            </div>
        )
    }
}

export default App
