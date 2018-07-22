import React, { Component } from 'react';
import './index.css';

class UsersConnectedList extends Component {
  state = {
    users: this.props.users
  };

  componentWillReceiveProps(newProps) {
    const { users } = newProps;
    this.setState({ users });
  }

  render() {
  	return(
  	  <div className="usersConnectedListContainer">
  	    { this.state.users.map((user) => <div className="userAvatar" style={{backgroundImage: 'url(' + user.avatarLink + ')' }} key={user.socketId} />) }
  	  </div>
  	);
  }
}

export default UsersConnectedList;