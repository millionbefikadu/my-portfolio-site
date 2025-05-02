import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";
import { authClient } from './apolloClient'; // Import authClient from the same folder
import './Login.css';  // Change based on the component

// Login mutation query
const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      username
      email
      role
      createdAt
    }
  }
}
`;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    client: authClient, // Use the imported authClient
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token); // Save token to localStorage
      setSuccess(true);
      setLoginError(null);
      if (onLogin) onLogin(); // Optional callback for redirect or UI change
    },
    onError: (error) => {
      setLoginError(error.message); // Display error message
      setSuccess(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Email and password are required.");
      return;
    }
    await login({ variables: { email, password } });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      {loginError && (
        <Alert variant="danger" className="mt-3">
          Error: {loginError}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mt-3">
          Login successful!
        </Alert>
      )}
    </Form>
  );
};

export default Login;
