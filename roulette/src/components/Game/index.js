import React, { Component } from 'react';
// import styled from "styled-components";

import socket from 'socket.io-client';
window.socket = socket('http://localhost:9999', {
    path: '/game/'
});

class Game extends Component {
    state = {
        time: 0,
    };
    componentDidMount() {
        window.socket.on('timeout', (time) => {
            this.setState({
                time: time
            })
        })
    }
    addTime = () => {
        this.setState({
            time: ++this.state.time
    });
        window.socket.emit('timeAdd', this.state.time)
    };

    render() {
        return (
            <div>
                <p>Timer: <span>{this.state.time}</span></p>
                <p>Users list:</p>
                <button onClick={this.addTime}>add</button>
            </div>
        )
    }
}

export default Game;