import React from 'react';
import './UserDetailPopup.css'; // Import CSS for styling

const UserDetailPopup = ({ user, onClose }) => {
  if (!user) return null; // Don't render if no user

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>User Details</h2>
        <button className="close-btn" onClick={onClose}>Close</button>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
        <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
      </div>
    </div>
  );
};

export default UserDetailPopup;
