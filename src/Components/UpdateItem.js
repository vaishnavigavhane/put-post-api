// src/components/UpdateItem.js
import React, { useState } from 'react';
import axios from 'axios';
import './Forms.css';

const UpdateItem = ({ item, fetchItems }) => {
  const [title, setTitle] = useState(item.title);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${item.id}`, { title });
      console.log('Update item response:', response.data);
      setMessage('Item updated successfully!');
      fetchItems(); // Fetch items after updating
    } catch (error) {
      console.error('Error updating item:', error.response ? error.response.data : error.message);
      setMessage('Error updating item');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new title"
          required
        />
        <button type="submit">Update Item</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateItem;
