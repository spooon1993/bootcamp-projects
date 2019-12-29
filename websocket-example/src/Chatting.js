import React, {Component} from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import {TextInput, Button} from './ui';
import {connect} from 'react-redux';
import store from "./store";

// setInterval(() => {
//     store.dispatch({
//         type: "ADD_NEW_MESSAGE",
//         image: '/img/bg-login.jpg',
//         message: "Test Message",
//         sender: false
//     })
// }, 5000);


const Container = styled.div`
    background-color: #fafafa;
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: auto;
`;

const Typing = styled.div`
    color: #999;
`;

const MessageWrapper = styled.div`
    padding: 1px 0;
`;

const MessageTemplate = styled.div`
    font-size: 12px;
    color: #555;
    font-family: Chivo;
    display: flex;
    align-items: center;
    margin: 20px 0;
    width: 85%;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 5px 10px;
    margin-left: ${props => props.sender ? '5px' : 'auto'}
    margin-right: ${props => props.sender ? 'auto' : '5px' }
    flex-direction: ${props => props.sender ? 'row' : 'row-reverse'}};
    background-color: ${props => props.sender ? '#aff9f5' : '#eee' };
`;

const AuthorImage = styled.img`
    border-radius: 100%;
    width: 30px;
    height:30px;
    margin-right: 5px;
    margin-left: 5px;
`
const Message = ({image, message, sender}) => {
    return (
        <MessageTemplate sender={sender}>
            <AuthorImage src={image} />
            {message}
        </MessageTemplate>
    )
}

const SendMessage = styled.div`
    display:flex;
`;
const InputMessage = styled(TextInput)`
    height:30px;
    border:1px solid #333;
    box-sizing: border-box;
    margin-bottom: 0;
    &::before{
        content: initial;
        width: 0;
    }
    & input{
        padding-left: 10px;
    }
`;
const ChatButton = styled(Button)`
    height: 30px;
    width:80px;
    padding:5px;
    text-align:center;
`;

class Chatting extends Component{
    state = {
        name: 'Author',
        image: '/img/ava.png',
        message: '',
        typing: false
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                messages: store.getState().messages
            }, this.scrollDown)
        });
        window.socket.on("new-message", (message) => {
            // this.props.getMessage(message);
            this.props.addMessage({
                message,
                sender: false,
                image: '/img/bg-login.jpg'
            })
        });
        window.socket.on("somebody-typing", (is) => {
            this.setState({
                typing: is
            })
        })

    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    scrollDown = () => {
        this.container.scrollTop = 9999999;
    }

    addMessage = () => {
        this.props.addMessage({
            message: this.state.message,
            image: this.state.image,
            sender: true
        });
        window.socket.emit("message", this.state.message);
        this.setState({
            message: ''
        }, this.scrollDown)
    }

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    enterHandler = (e) => {
        const map = {};
        map[e.charCode] = e.type == 'keydown';
        if(e.charCode === 13) {
            this.addMessage();
            window.socket.emit("typing", false);
        } else {
            if(this.state.message.length > 0){
                window.socket.emit("typing", true);
            } else {
                window.socket.emit("typing", false);
            }
        }


    }
    render(){
        return (
            <Container innerRef={(node) => {
                this.container = node;
            }}>
                <MessageWrapper>
                    {
                        this.props.messages.map((message, index) => {
                            return <Message {...message} key={index} />
                        })
                    }

                </MessageWrapper>
                <Typing>{this.state.typing ? 'Somebody typing' : ''}</Typing>
                <SendMessage>
                    <InputMessage value={this.state.message}
                                  onChange={this.changeMessage}
                                  onKeyPress={this.enterHandler}
                    />
                    <ChatButton onClick={this.addMessage}>Send</ChatButton>
                </SendMessage>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }

};

const dispatchToProps = (dispatch) => {
    return {
        addMessage: ({message, sender, image}) => {
            dispatch({
                type: "ADD_NEW_MESSAGE",
                message,
                sender,
                image
            });
        },
        getMessage: (message) => {
            dispatch({
                type: "ADD_NEW_MESSAGE",
                message,
                image: '/img/bg-login.jpg',
                sender: false
            })
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(Chatting);