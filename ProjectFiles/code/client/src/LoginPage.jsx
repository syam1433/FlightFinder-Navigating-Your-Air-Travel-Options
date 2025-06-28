import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./Loginpage.css"
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', formData);
    
    const { token, role } = res.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (role === 'admin') {
      window.location.href = '/admin-dashboard';
    } else if (role === 'operator') {
      window.location.href = '/operator-dashboard';
    } else if (role === 'user') {
      window.location.href = '/user-dashboard';
    }

  } catch (err) {
    toast.error(err.response?.data.message || 'Login failed');
  }
};


  return (
    <>
    <ToastContainer position="top-center" autoClose={3000} />
      <div>
        <div className='top'>
          <p className='data1'>SB Flights</p>
          <div className='data2'>
            <Link to="/" className="p">Home</Link>
            <Link to="/registration" className="p">Register</Link>
          </div>
        </div>
        <div className='formed'>
          <div className='formes'>
          <form onSubmit={handleLogin} className="loginform">
          <p className='p'>Login</p>
          <input className='e' name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <input className='pass' name="password" placeholder="Password" type="password" onChange={handleChange} required />

          <select className='r' name="role" onChange={handleChange}>
            <option value="user">User</option>
            <option value="operator">Operator</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn">Login</button>
          <p>Don't have an account <Link to="/registration" className="p1">Register</Link></p>
        </form>
        </div>
        </div>
    </div>
    </>
  );
};

export default LoginPage;
