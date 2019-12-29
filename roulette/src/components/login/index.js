import React, { Component } from 'react';
// import styled from "styled-components";
import RenderIf from '../general/RenderIf';

// const Error = styled.p`
//   color:red;
//   display: none;
// `;

class Login extends Component {
    state = {
        login: '',
        password: '',
        error: false
    };
    changeCred = (credentials, e) => {
        this.setState({
            [credentials]: e.target.value
        });
    };
    login = () => {
        let data = {
            login: this.state.login,
            password: this.state.password
        };
        fetch('http://localhost:9999/auth/',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
            })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
            localStorage.setItem('token', data.token);
            })
            .catch((e) => {
                return e;
            })
    };

    render(){
        return(
            <div>
                <RenderIf condition={this.state.error}>Error</RenderIf>
                <input type='text' value={this.state.login} onChange={this.changeCred.bind(this, 'login')} />
                <input type='password' value={this.state.password} onChange={this.changeCred.bind(this, 'password')} />
                <button onClick={this.login}>login</button>
                <button>Registration</button>
            </div>
        )
    }
}
export default Login;