
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {UserProvider} from './context/userContext';

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar/>
      <Routes>
        <Route path='/' exact element={<Home />}/>
        <Route path='sign-in' exact element={<Login />}/>
        <Route path='sign-up' exact element={<Signup />}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      </Routes>
      </UserProvider>
      
    </Router>
  );
}

export default App;
