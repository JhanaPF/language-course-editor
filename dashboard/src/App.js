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
        post(
            'auth/token', 
            null,
            (res) => {
                if(res.status === 200) this.setState({loggedin: true})  
            },
            (res) => console.log(res) 
        )
    }

    render() {        
        return (
            <div className="App">
                {this.state.loggedin && <Dashboard token={this.state.token} userId={this.state.userId}/>}
                {!this.state.loggedin && <SignIn/> }
            </div>
        );
    }
}

export default App;