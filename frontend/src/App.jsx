import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/users';
import UserFormPage from './pages/users/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/user/new" element={<UserFormPage />} />
        <Route path="/user/:id" element={<UserFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
