import React, { Component } from 'react';
import './index.css';

class Message extends Component {
  messageComponent() {
  	if(this.props.messageByUser)
  	  return (
  	    <div className="messageContainer messageContainerRight">
  	      <div className="content"> { this.props.message } </div>
  	      <div className="image" style={{ backgroundImage: 'url(' + this.props.avatarLink + ')' }} />
  	    </div>
  	  );

  	return (
  	  <div className="messageContainer">
  	    <div className="image" style={{ backgroundImage: 'url(' + this.props.avatarLink + ')' }} />
  	    <div className="content"> { this.props.message } </div>
  	  </div>
  	);  	
  }

  render() {
  	return(
  	  <div className="message">
  	    {this.messageComponent()}
  	  </div>
  	);
  }
}

export default Message;