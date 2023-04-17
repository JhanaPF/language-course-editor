import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Dashboard from './views/dashboard';
import SignIn from './views/signIn';
import { post } from './apiRequests';

class App extends React.Component {

    constructor(){
        super();
        this.state={
            uId: '',
            loggedin: false,
            loading: true,
        }
    }

    componentDidMount(){ // Starting application    
        const isIdSaved = localStorage.getItem("keepConnection");

        post('auth/token', {},
            (res) => {
                this.setState({loggedin: true, loading: false}) 
            },
            () => {
                if(isIdSaved){
                    const mail = localStorage.getItem("mail");
                    const password = localStorage.getItem("password");
                    this.signIn(mail, password);
                }
            }
        )
    }

    signIn = (mail, password) => {
        post(
            'auth/signin', 
            { mail, password },
            (res)=>{
                localStorage.setItem('userId', res.data.userId)
                this.setState({loggedin: true, loading: false});
            }
        );
    }

    render() {        
        if(this.state.loading) return null;

        return (
            <div className="App">
                {this.state.loggedin && <Dashboard userId={this.state.userId} />}
                {!this.state.loggedin && <SignIn signIn={this.signIn.bind(this)}/> }
            </div>
        );
    }
}

export default App;