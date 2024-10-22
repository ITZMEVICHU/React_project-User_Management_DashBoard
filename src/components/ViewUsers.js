import React, { useState } from 'react';
import UserDetailPopup from './UserDetailPopup';

const ViewUsers = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('name'); // Default search category
  const usersPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Filtered users based on search
  const filteredUsers = users.filter(user => {
    if (searchCategory === 'name') {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchCategory === 'email') {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchCategory === 'phone') {
      return user.phone.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return user;
  });

  // Get the current set of users for the current page
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const openPopup = (user) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    setSearchTerm(''); // Clear search term when category changes
  };

  return (
    <div className="view-users">
      <h2>View Users</h2>

      {/* Search Bar and Category Dropdown */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search by ${searchCategory}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={searchCategory} onChange={handleCategoryChange}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => openPopup(user)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Popup for user details */}
      <UserDetailPopup user={selectedUser} onClose={closePopup} />
    </div>
  );
};

export default ViewUsers;
