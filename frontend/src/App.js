import 'bootstrap/dist/css/bootstrap.min.css';
import react, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [Tasks, setTasks] = useState([]);

  useEffect( () => {
    axios.get('http://localhost:8086')
    .then( res => setTasks(res.data))
    .catch(e => console.log("error"));
  }, [])
  
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {Tasks.map((data, i) => (
            <tr key={i}>
              <td>{data.TASK}</td>
              <td>{data.DEADLINE}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
