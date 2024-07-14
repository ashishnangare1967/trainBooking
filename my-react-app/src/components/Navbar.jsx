import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isAdmin = localStorage.getItem('role') === 'admin';

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search Trains</Link></li>
        <li><Link to="/bookings">My Bookings</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        {isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;