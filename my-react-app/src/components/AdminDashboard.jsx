import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [trains, setTrains] = useState([]);
  const [newTrain, setNewTrain] = useState({ name: '', from: '', to: '', totalSeats: 0, availableSeats: 0 });

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trains', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setTrains(response.data);
    } catch (error) {
      alert('Error fetching trains');
    }
  };

  const handleAddTrain = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/trains', newTrain, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      alert('Train added successfully');
      fetchTrains();
      setNewTrain({ name: '', from: '', to: '', totalSeats: 0, availableSeats: 0 });
    } catch (error) {
      alert('Error adding train');
    }
  };

  const handleUpdateTrain = async (id, updatedSeats) => {
    try {
      await axios.put(`http://localhost:5000/api/trains/${id}`, { availableSeats: updatedSeats }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      alert('Train updated successfully');
      fetchTrains();
    } catch (error) {
      alert('Error updating train');
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Add New Train</h3>
      <form onSubmit={handleAddTrain}>
        <input
          type="text"
          placeholder="Train Name"
          value={newTrain.name}
          onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="From"
          value={newTrain.from}
          onChange={(e) => setNewTrain({ ...newTrain, from: e.target.value })}
        />
        <input
          type="text"
          placeholder="To"
          value={newTrain.to}
          onChange={(e) => setNewTrain({ ...newTrain, to: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={newTrain.totalSeats}
          onChange={(e) => setNewTrain({ ...newTrain, totalSeats: parseInt(e.target.value), availableSeats: parseInt(e.target.value) })}
        />
        <button type="submit">Add Train</button>
      </form>

      <h3>Manage Trains</h3>
      <ul>
        {trains.map(train => (
          <li key={train._id}>
            {train.name} - From: {train.from}, To: {train.to}, Available Seats: {train.availableSeats}
            <input
              type="number"
              value={train.availableSeats}
              onChange={(e) => handleUpdateTrain(train._id, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;