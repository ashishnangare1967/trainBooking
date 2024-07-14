import React, { useState } from 'react';
import axios from 'axios';

function TrainSearch() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [trains, setTrains] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/trains/${from}/${to}`);
      setTrains(response.data);
    } catch (error) {
      alert('Error fetching trains');
    }
  };

  const handleBook = async (trainId) => {
    try {
      await axios.post('http://localhost:5000/api/bookings', { trainId, seats: 1 }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      alert('Booking successful!');
    } catch (error) {
      alert('Error booking train');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {trains.map(train => (
          <li key={train._id}>
            {train.name} - Available Seats: {train.availableSeats}
            <button onClick={() => handleBook(train._id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainSearch;