import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import './Dashboard.css';

const Dashboard = ({ users }) => {
  const totalUsers = users.length;

  // Group users by company
  const companyData = users.reduce((acc, user) => {
    acc[user.company.name] = (acc[user.company.name] || 0) + 1;
    return acc;
  }, {});

  const companyLabels = Object.keys(companyData);
  const companyValues = Object.values(companyData);

  // Group users by city
  const cityData = users.reduce((acc, user) => {
    acc[user.address.city] = (acc[user.address.city] || 0) + 1;
    return acc;
  }, {});

  const cityLabels = Object.keys(cityData);
  const cityValues = Object.values(cityData);

  // Data for the company graph
  const companyGraphData = {
    labels: companyLabels,
    datasets: [
      {
        label: 'Users per Company',
        data: companyValues,
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        borderWidth: 1,
      },
    ],
  };

  // Data for the city graph
  const cityGraphData = {
    labels: cityLabels,
    datasets: [
      {
        label: 'Users by City',
        data: cityValues,
        backgroundColor: '#ff6384',
        borderColor: '#ff6384',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div >
        <h2>Hello Admin !</h2>
      </div>
      {/* Card showing total users */}
      <div className="user-count-card">
        <h2>Total Users</h2>
        <p style={{color: 'white'}}>{totalUsers}</p>
      </div>

      {/* Graphs section */}
      <div className="charts-container">
        <div className="chart">
          <h3>Users per Company</h3>
          <Bar data={companyGraphData} />
        </div>

        <div className="chart">
          <h3>Users by City</h3>
          <Bar data={cityGraphData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
