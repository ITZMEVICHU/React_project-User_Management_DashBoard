import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, deleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('name'); // Default search by name
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

  // Filter users based on search term and category
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

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Get the current set of users for the current page
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    setSearchTerm(''); // Clear search term when category changes
    setCurrentPage(1); // Reset to first page when search category changes
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

  return (
    <div className="user-list">
      <h2>User List</h2>

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
                <Link to={`/users/edit/${user.id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
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
    </div>
  );
};

export default UserList;
