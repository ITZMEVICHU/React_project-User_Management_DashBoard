import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = ({ users, addUser, updateUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [formData, setFormData] = useState({
    id: editing ? parseInt(id) : Math.floor(Math.random() * 1000),
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });

  useEffect(() => {
    if (editing) {
      const user = users.find(user => user.id === parseInt(id));
      if (user) setFormData(user);
    }
  }, [id, users, editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      updateUser(formData);
    } else {
      addUser(formData);
    }
    navigate('/users');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.') || name.includes('company.')) {
      const [mainKey, subKey] = name.split('.');
      setFormData({
        ...formData,
        [mainKey]: {
          ...formData[mainKey],
          [subKey]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="user-form">
      <h2>{editing ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="website"
          value={formData.website}
          placeholder="Website"
          onChange={handleChange}
          required
        />

        {/* Address Fields */}
        <h4>Address:</h4>
        <input
          type="text"
          name="address.street"
          value={formData.address.street}
          placeholder="Street"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.suite"
          value={formData.address.suite}
          placeholder="Suite"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          placeholder="City"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.zipcode"
          value={formData.address.zipcode}
          placeholder="Zipcode"
          onChange={handleChange}
          required
        />

        {/* Company Fields */}
        <h4>Company:</h4>
        <input
          type="text"
          name="company.name"
          value={formData.company.name}
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company.catchPhrase"
          value={formData.company.catchPhrase}
          placeholder="CatchPhrase"
          onChange={handleChange}
        />
        <input
          type="text"
          name="company.bs"
          value={formData.company.bs}
          placeholder="Business"
          onChange={handleChange}
        />
        
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
