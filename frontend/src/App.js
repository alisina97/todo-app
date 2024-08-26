import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [Tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8086');
      setTasks(res.data);
    } catch (e) {
      console.log("Error fetching data:", e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (ID) => {
    try {
      await axios.delete(`http://localhost:8086/${ID}`);
      fetchData();
    } catch (err) {
      console.log("Error deleting task:", err.response || err);
    }
  };

  return (
    <div className="container">
      <div className='row mt-5 mb-5'>
        <h1>Good morning, Ali!</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Tasks.map((data, i) => (
            <tr key={i}>
              <td>{data.TASK}</td>
              <td>{data.DEADLINE}</td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(data.ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
