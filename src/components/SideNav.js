import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="side-nav">
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/">Overview</Link></li>
        <li><Link to="/view-users">View Users</Link></li>
        <li><Link to="/users">Edit & Delete Users</Link></li>
        <li><Link to="/users/create">Add User</Link></li>
        <li><Link to="/search">Search & Filter</Link></li> 
      </ul>
    </div>
  );
};

export default SideNav;
