// src/components/AddItem.js
import React, { useState } from 'react';
import axios from 'axios';
import './Forms.css';

const AddItem = ({ fetchItems }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { title });
      console.log('Add item response:', response.data);
      setMessage('Item added successfully!');
      setTitle('');
      fetchItems(); // Fetch items after adding a new one
    } catch (error) {
      console.error('Error adding item:', error.response ? error.response.data : error.message);
      setMessage('Error adding item');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter item title"
          required
        />
        <button type="submit">Add Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddItem;
