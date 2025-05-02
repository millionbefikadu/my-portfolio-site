import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="login">
                {!isLoggedIn && (
                  <>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="login"
                        onClick={() => setActiveTab('login')}
                      >
                        Login
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="signup"
                        onClick={() => setActiveTab('signup')}
                      >
                        Signup
                      </Nav.Link>
                    </Nav.Item>
                  </>
                )}
                {isLoggedIn && (
                  <Nav.Item>
                    <Nav.Link eventKey="logout">Logout</Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Card.Header>
            <Card.Body>
              {!isLoggedIn ? (
                <>
                  {activeTab === 'login' && <Login onLogin={handleLogin} />}
                  {activeTab === 'signup' && <Signup onSignup={handleLogin} />}
                </>
              ) : (
                <>
                  <p className="text-center">Welcome! You are logged in.</p>
                  <Logout onLogout={handleLogout} />
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;