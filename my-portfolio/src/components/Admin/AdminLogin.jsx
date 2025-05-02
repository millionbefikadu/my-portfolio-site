import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css"; // ✅ New CSS file

const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(email: $email, password: $password)
  }
`;

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [adminLogin, { loading }] = useMutation(ADMIN_LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.adminLogin);
      alert("✅ Login successful!");
      navigate("/admin");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    adminLogin({ variables: { email, password } });
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
  
};

export default AdminLogin;
