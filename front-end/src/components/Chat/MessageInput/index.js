import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { send } from 'react-icons-kit/fa/';
import './index.css';

class MessageInput extends Component {
  state = {
  	message: ''
  };

  constructor(props) {
  	super(props);
  	this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
  	event.preventDefault();

  	const { message } = this.state;

  	if(!message)
  	  return;

  	this.props.onMessage(message);
  	this.setState({ message: '' });
  }

  buttonComponent() {
  	const { message } = this.state;

  	if(message)
  	  return (
  	    <button>
  	       <Icon icon={send} size="25" />
  	    </button>
  	  );
  }

  render(){
    return(
      <div className="messageInputContainer">
        <div style={{backgroundImage: 'url(' + this.props.avatar + ')'}} className="avatarImg" />
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Write..." onChange={(text) => this.setState({ message: text.target.value })} value={this.state.message} />
          { this.buttonComponent() }
        </form>
      </div>
    );
  }
}

export default MessageInput;