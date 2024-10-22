import React, { useState } from 'react';

const SearchAndFilter = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleSearch = () => {
    setIsFiltering(true);
  };

  const filteredUsers = users.filter(user => {
    if (!isFiltering) return true;
    if (filterBy === 'name') {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'email') {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'phone') {
      return user.phone.includes(searchTerm);
    }
    return false;
  });

  return (
    <div className="search-filter">
      <h2>Search and Filter Users</h2>
      <div className="search-bar">
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="name">Filter by Name</option>
          <option value="email">Filter by Email</option>
          <option value="phone">Filter by Phone</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          placeholder={`Search by ${filterBy}...`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Filter</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchAndFilter;
