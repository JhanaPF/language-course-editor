import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Dashboard from './dashboard';
import SignIn from './signIn';

class App extends React.Component {

    constructor(){
        super();

        const token = localStorage.getItem('token');
        this.state={
            token: token ? token : '',
            uId: '',
            loggedin: token ? true : false,
        }

        this.apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/";
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signIn = (mail, password) => {
        //console.log({ mail, password }, this.apiUrl)
        axios.post(this.apiUrl + 'auth/signin', { mail, password })
        .then(res => { 
            console.log("Logged in")
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('mail', mail);
            localStorage.setItem('password', password);

            this.setState({token : res.data.token, userId: res.data.userId, loggedin: true}); 
        })
        .catch(error => console.log(error));
    }

    signUp = (mail, password) => {   
        axios.post(
            this.apiUrl + 'auth/signup', 
            { mail, password }, 
            { headers: { 'Authorization': this.state.token },
        })
        .then(console.log('Subscribed'))
        .catch(error => console.log(error));
    }

    render() {        
        return (
            <div className="App">
                {this.state.loggedin && <Dashboard token={this.state.token} userId={this.state.userId}/>}
                {!this.state.loggedin && <SignIn signIn={this.signIn} signUp={this.signUp} /> }
            </div>
        );
    }
}

export default App;