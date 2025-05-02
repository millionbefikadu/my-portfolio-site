import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import { authClient } from '../../../host-app/src/apolloClients'; // Adjusting the relative path
import './Signup.css';



const SIGNUP_MUTATION = gql`
  mutation Signup(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      token
      user {
        id
        username
        email
        role
      }
    }
  }
`;

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [signup, { data, loading }] = useMutation(SIGNUP_MUTATION, {
    client: authClient, // ✅ use auth microservice (port 4000)
    onCompleted: (data) => {
      localStorage.setItem("token", data.signup.token); // store token
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);
      if (onSignup) onSignup(data.signup); // optional callback
    },
    onError: (err) => {
      setError(err.message);
      setSuccess(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }
    signup({ variables: { username, email, password, role } });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        style={{
          width: "400px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">Signup</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="resident">Resident</option>
                <option value="business_owner">Business Owner</option>
                <option value="community_organizer">Community Organizer</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Signup"}
            </Button>

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}

            {success && data && (
              <Alert variant="success" className="mt-3">
                Welcome, {data.signup.user.username}!
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
