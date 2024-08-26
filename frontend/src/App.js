import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CompleteIcon from '@mui/icons-material/CheckCircle';

function App() {
  const [Tasks, setTasks] = useState([]);
  const [Task, setTask] = useState('');

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () => {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return now.toLocaleDateString(undefined, options);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8086');
      setTasks(res.data);
    } catch (e) {
      console.log("Error fetching data:", e);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (Task.trim() === '') return; 
    try {
      await axios.post('http://localhost:8086', { Task });
      fetchData();  
      setTask(''); 
    } catch (e) {
      console.log("Error adding task:", e);
    }
  };

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
      <div className='row mt-5 mb-3'>
        <h1>{getGreeting()}, Ali!</h1>
        <p style={{ color: 'gray', fontSize: '1.2rem' }}>{formatDate()}</p>
      </div>
      <div className="row mb-5">
        <form onSubmit={handleAddTask} className="d-flex w-100">
          <div className="flex-grow-1 me-2">
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={Task} // Bind input value to state
              onChange={e => setTask(e.target.value)}
            />
          </div>
          <div>
            <IconButton
              type="submit"
              color="primary"
              style={{ height: '100%' }} 
            >
              <AddIcon />
            </IconButton>
          </div>
        </form>
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
                <IconButton 
                  color="success" 
                  onClick={() => handleDelete(data.ID)}
                >
                  <CompleteIcon />
                </IconButton>
                <IconButton 
                  color="error" 
                  onClick={() => handleDelete(data.ID)}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
