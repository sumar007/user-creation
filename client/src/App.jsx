import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './userComponents/Welcome';
import Registration from './adminComponents/registration';
import VerifyEmail from './adminComponents/verifyEmail';
import AdminLogin from './adminComponents/adminLogin';
import AdminPanel from './adminComponents/adminPanel';
import UserLogin from './userComponents/userLogin';
import ForgetPassword from './userComponents/forgetPassword';
import AddUser from './adminComponents/AddUser';
import UserList from './adminComponents/UserList';
import Home from './userComponents/Home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/admin/register" element={<Registration />} />
        <Route path="/admin/verify-email" element={<VerifyEmail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/admin/add-user" element={<AddUser />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user/forgetpassword" element={<ForgetPassword />} />
        <Route path="/user/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
