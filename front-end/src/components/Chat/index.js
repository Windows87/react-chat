import React, { Component } from 'react';
import io from 'socket.io-client';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import UsersConnectedList from './UsersConnectedList';
import './index.css';

class Chat extends Component {
  socket = io('http://localhost:3001');
  avatarLink = localStorage.getItem('chat-avatar');
  username = localStorage.getItem('chat-username');

  state = {
  	usersConnected: [],
  	receivedMessages: []
  };

  constructor(props) {
  	super(props);

    document.title = 'Chat';

  	this.verifyUsername();

    this.onMessage = this.onMessage.bind(this);

    this.messagesList = React.createRef();

    const { avatarLink, username, socket } = this; 

    socket.emit('user-connect', {
      avatarLink,
      username
    });

  	socket.on('users-connected', usersConnected => this.setState({ usersConnected }));
    socket.on('error', () => alert('Ocorreu um Erro'));
	  socket.on('old-messages', async (receivedMessages) => {
     await this.setState({ receivedMessages });
     this.messagesList.current.goToEndScroll();
    });
    socket.on('new-message', async (message) => {
      await this.setState({ receivedMessages: [...this.state.receivedMessages, message] });
      this.messagesList.current.goToEndScroll();
    });
  }

  verifyUsername() {
    const { username } = this;
    if(!username)
  	  this.props.history.push('/');
  }

  onMessage(message) {
    const { username, avatarLink, socket } = this;
  	socket.emit('send-message', {
  	  avatarLink,
  	  username,
  	  message
  	});
  }

  render() {
  	return (
  	  <div className="chatContainer">
  	    <UsersConnectedList users={this.state.usersConnected} />
  	    <MessagesList ref={this.messagesList} username={this.username} messages={this.state.receivedMessages} />
  	    <MessageInput avatar={this.avatarLink} onMessage={this.onMessage} />
  	  </div>
  	);
  }
}

export default Chat;