import React, { Component } from 'react';
import Message from './Message';
import './index.css';

class MessagesList extends Component {
  state = {
  	messages: this.props.messages
  };

  constructor(props) {
    super(props);
    this.messagesList = React.createRef();
  }

  componentWillReceiveProps(newProps) {
  	const { messages } = newProps;
  	this.setState({ messages });
  }

  goToEndScroll() {
    const { messagesList } = this;
    messagesList.current.scrollTo(0, messagesList.current.scrollHeight);
  }

  render() {
  	return(
  	  <div ref={this.messagesList} className="messagesListContainer">
  	    { this.state.messages.map((messageData) => {
  	      if(messageData.username === this.props.username)
  	      	return <Message message={messageData.message} key={messageData._id} avatarLink={messageData.avatarLink} username={messageData.username} messageByUser={true} />;
  	      return <Message message={messageData.message} key={messageData._id} avatarLink={messageData.avatarLink} username={messageData.username} messageByUser={false} />;
  	    }) }
  	  </div>
  	);
  }
}

export default MessagesList;