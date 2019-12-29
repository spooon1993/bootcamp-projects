import React, {Component} from "react";
import styled, {injectGlobal} from 'styled-components';
import Chatting from "./Chatting";
import store from "./store";
import {Provider} from "react-redux";
import socket from "socket.io-client";

window.socket = socket(window.location.origin, {
    path: "/chat/"
});

injectGlobal`
    * {
      margin: 0;
      padding: 0;
    }
    
    @font-face {
      src: url("/fonts/Montserrat-Bold.ttf");
      font-family: 'Montserrat';
      font-weight: 600;
    }
    @font-face {
      src: url("/fonts/Montserrat-Regular.ttf");
      font-family: 'Montserrat';
      font-weight: 400;
    }
    
    @font-face {
      src: url("/fonts/Chivo-Regular.ttf");
      font-family: 'Chivo';
      font-weight: 400;
    }
`;
const Cover = styled.div`
    width:250px;
    max-height:500px;
    right: 0;
    bottom:0;
    background-color: #333;
    color: #fff;
    font-family: Montserrat;
    font-weight:300;
    padding: 10px 20px;
`;


export default class Chat extends Component {
    state = {
        online: 0
    }
    componentDidMount(){
        window.socket.on("change-online", (online) => {
            this.setState({
                online: online
            })
        })
    }
    render() {
        return (
            <Provider store={store}>
                <Cover>
                    <div>Online: {this.state.online}</div>
                    Chat
                    <Chatting />
                </Cover>
            </Provider>
        )

    }
}