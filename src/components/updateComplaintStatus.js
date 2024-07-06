// updateComplaintStatus.js

import React, { useState } from 'react';
import axios from 'axios';

function updateComplaintStatus() {
  const [userId, setUserId] = useState('');
 
  const updateComplaintStatus = async () => {
    if (!userId) {
      console.error('User ID is undefined. Please enter a valid user ID.');
      return;
    }
console.log(userId);
    try {
      const response = await axios.post('http://localhost:8000/updateComplaintStatus', { _id: userId });
      if (response.data.success) {
        // Redirect to the user list page or show a success message
        window.location.href = '/ComplaintsList';
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
      <button onClick={updateComplaintStatus}>Update Status</button>
    </div>
  );
}

export default updateComplaintStatus;


