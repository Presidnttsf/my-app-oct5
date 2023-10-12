import './App.css';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import { Home } from './Home';

function App() {

  return (
    <div className="App">

      <h1>New project Ready to do task October 5, 2023</h1>
      <h1>User Management</h1>


      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/adduserform" Component={AddUserForm} />
            <Route path="/usertable" Component={UserTable} />
          </Routes>
        </div>
      </div>


    </div>
  );
}

export default App;
