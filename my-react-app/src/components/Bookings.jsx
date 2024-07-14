import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings', {
          headers: { Authorization: localStorage.getItem('token') }
        });
        setBookings(response.data);
      } catch (error) {
        alert('Error fetching bookings');
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            Train: {booking.train.name}, Seats: {booking.seats}, Date: {new Date(booking.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookings;