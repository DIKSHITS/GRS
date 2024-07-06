import React, { Component } from 'react';

class RejectComplaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.id, // You can use React Router to get the 'id' from the URL
      error: null,
    };
  }

  RejectComplaint = () => {
    const { userId } = this.state;

    // Send a DELETE request to the server to delete the Complaint
    fetch(`http://localhost:8000/RejectComplaint/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the desired page after successful deletion
          this.props.history.push('/ComplaintsList');
        } else {
          response.json().then((data) => {
            this.setState({ error: data.message });
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ error: 'An error occurred while deleting the complaint.' });
      });
  };

  render() {
    return (
      <div>
        {this.state.error && <div className="error">{this.state.error}</div>}
        <button onClick={this.RejectComplaint}>Reject</button>
      </div>
    );
  }
}

export default RejectComplaint;
