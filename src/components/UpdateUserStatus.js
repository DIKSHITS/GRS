// updateUserStatus.js

import React, { useState } from 'react';
import axios from 'axios';

function UpdateUserStatus() {
  const [userId, setUserId] = useState('');
 
  const updateUserStatus = async () => {
    if (!userId) {
      console.error('User ID is undefined. Please enter a valid user ID.');
      return;
    }
console.log(userId);
    try {
      const response = await axios.post('http://localhost:8000/updateUserStatus', { _id: userId });
      if (response.data.success) {
        // Redirect to the user list page or show a success message
        window.location.href = '/UserList';
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={updateUserStatus}>Update Status</button>
    </div>
  );
}

export default UpdateUserStatus;


