import React, { Component } from 'react';

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id, // You can use React Router to get the 'id' from the URL
      error: null,
    };
  }

  handleDeleteUser = () => {
    const { userId } = this.state;

    // Send a DELETE request to the server to delete the user
    fetch(`http://localhost:8000/delete-user/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the desired page after successful deletion
          this.props.history.push('/UserList');
        } else {
          response.json().then((data) => {
            this.setState({ error: data.message });
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ error: 'An error occurred while deleting the user.' });
      });
  };

  render() {
    return (
      <div>
        {this.state.error && <div className="error">{this.state.error}</div>}
        <button onClick={this.handleDeleteUser}>Delete User</button>
      </div>
    );
  }
}

export default DeleteUser;
