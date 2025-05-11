import './App.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Dashboard from './views/Dashboard'
import SignIn from './views/SignIn'
import { post } from './apiRequests'
import { Row, Spinner } from 'reactstrap'

class App extends React.Component {
    constructor () {
        super()
        this.state = {
            uId: '',
            loggedin: false,
            loading: true
        }
        localStorage.setItem('apiUrl', process.env.REACT_APP_API_URL || 'http://localhost:3001/')
    }

    componentDidMount () { // Starting application
        const isIdSaved = localStorage.getItem('keepConnection')
        const isLoggedIn = sessionStorage.getItem('isLoggedIn')

        if (isLoggedIn) {
            return this.setState({ loggedin: true, loading: false })
        }

        post('auth/token', {},
            () => this.unlockApp(), // Token still valid
            () => { // No token or not valid anymore
                if (isIdSaved) {
                    const mail = localStorage.getItem('mail')
                    const password = localStorage.getItem('password')
                    this.signIn(mail, password)
                } else { this.setState({ loading: false }) };
            }
        )
    }

    signIn = (mail, password) => {
        post('auth/signin', { mail, password },
            (res) => {
                localStorage.setItem('userId', res.data.userId)
                this.unlockApp()
            },
            () => this.setState({ loading: false })
        )
    }

    unlockApp () {
        this.setState({ loggedin: true, loading: false })
        sessionStorage.setItem('isLoggedIn', true)
    }

    render () {
        if (this.state.loading) {
            return (
                <Row className='h-100 m-auto'>
                    <Spinner className='m-auto' color="warning" />;
                </Row>
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
