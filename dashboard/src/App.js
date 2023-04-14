import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Dashboard from './dashboard';
import SignIn from './signIn';
import { post } from './apiRequests';

class App extends React.Component {

    constructor(){
        super();
        this.state={
            uId: '',
            //loggedin: process.env.NODE_ENV,
            loggedin: false
        }
    }

    componentDidMount(){ // Starting application    
        post('auth/token', {},
            (res) => {
                if(res.status === 200) this.setState({loggedin: true}) 
            },
            () => {
                console.log("connect again")
                const mail = localStorage.getItem("mail");
                const password = localStorage.getItem("password");
                console.log(mail, password)
                this.signIn(mail, password);
            }
        )
    }

    signIn = (mail, password) => {
        post(
            'auth/signin', 
            { mail, password },
            (res)=>{
                console.log("hello")
                if(res.status === 200){
                    localStorage.setItem('userId', res.data.userId)
                    this.setState({loggedin: true});
                }
            }
        );
    }

    render() {        
        return (
            <div className="App">
                {this.state.loggedin && <Dashboard userId={this.state.userId} />}
                {!this.state.loggedin && <SignIn signIn={this.signIn.bind(this)}/> }
            </div>
        );
    }
}

export default App;