import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import SideNav from './components/SideNav';
import ViewUsers from './components/ViewUsers'; 
import SearchAndFilter from './components/SearchAndFilter'; 

import './styles.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Router>
      <div className="app-container">
        <SideNav />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Dashboard users={users} />} />
            <Route path="/users" element={<UserList users={users} deleteUser={deleteUser} />} />
            <Route path="/users/create" element={<UserForm addUser={addUser} />} />
            <Route path="/view-users" element={<ViewUsers users={users} />} /> 
            <Route path="/users/edit/:id" element={<UserForm users={users} updateUser={updateUser} />} />
            <Route path="/search" element={<SearchAndFilter users={users} />} /> 

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
