import React from 'react';
import { Button } from 'react-bootstrap';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // 🔐 Remove JWT token
    if (onLogout) onLogout();         // 🔄 Trigger optional parent state
    window.location.reload();         // 🔁 Refresh to reset app state
  };

  return (
    <div className="text-center">
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
