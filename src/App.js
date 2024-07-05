// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItem from './Components/AddItem';
import UpdateItem from './Components/UpdateItem';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log('Fetched items:', response.data);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <h1>Item List</h1>
      <AddItem fetchItems={fetchItems} />
      <ul>
        {items.slice(0, 10).map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => setEditingItem(item)}>Edit</button>
          </li>
        ))}
      </ul>
      {editingItem && (
        <UpdateItem item={editingItem} fetchItems={fetchItems} />
      )}
    </div>
  );
};

export default App;
