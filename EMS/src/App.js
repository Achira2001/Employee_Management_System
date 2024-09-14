import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Welcome to Employee Management System</h1>
        <button className='employees-button' onClick={() => navigate('/employees')}>
          Employees
        </button><br/>
        <button className='employees-button' onClick={() => navigate('/departments')}>
          Departments
        </button>
      </header>
    </div>
  );
}

export default App;
