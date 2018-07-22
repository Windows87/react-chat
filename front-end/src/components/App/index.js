import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { arrowRight } from 'react-icons-kit/fa/'
import './index.css';

const avatarLink = localStorage.getItem('chat-avatar');
const username = localStorage.getItem('chat-username');

class App extends Component {
  state = {
  	username,
  	avatarLink
  };

  constructor(props) {
  	super(props);
    document.title = 'Join';
  	this.onSubmit = this.onSubmit.bind(this);
  }

  goToChat() {
    this.props.history.push('/chat');
  }

  onSubmit(event) {
  	event.preventDefault();
  	
  	const { username, avatarLink } = this.state;

  	if(!username || !avatarLink)
  	  return;

  	localStorage.setItem('chat-avatar', avatarLink)
  	localStorage.setItem('chat-username', username);
  	
    this.goToChat();
  }

  submitButton() {
  	const { username, avatarLink } = this.state;

  	if(username && avatarLink)
  	  return(
  	  	<button>
  	  	  <Icon icon={arrowRight} size={24} />
  	  	</button>
  	  );
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <div className="avatarImg" style={{ backgroundImage: 'url(' + this.state.avatarLink + ')' }} />
          <input type="text" placeholder="Avatar Link" onChange={(event) => this.setState({ avatarLink: event.target.value })} value={this.state.avatarLink} />
          <input type="text" placeholder="Username" onChange={(event) => this.setState({ username: event.target.value })} value={this.state.username} />
          {this.submitButton()}
        </form>
      </div>
    );
  }
}

export default App;
