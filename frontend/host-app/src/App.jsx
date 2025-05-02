import React, { Suspense, useState } from 'react';
import { Container, Card, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Login = React.lazy(() => import('authMicrofrontend/Login'));
const Signup = React.lazy(() => import('authMicrofrontend/Signup'));
const Logout = React.lazy(() => import('authMicrofrontend/Logout'));
const CommunityPosts = React.lazy(() => import('communityMicrofrontend/CommunityPosts'));
const CreatePost = React.lazy(() => import('communityMicrofrontend/CreatePost'));
const HelpRequests = React.lazy(() => import('communityMicrofrontend/HelpRequests'));
const CreateHelpRequest = React.lazy(() => import('communityMicrofrontend/CreateHelpRequest'));
const AIChatbot = React.lazy(() => import('communityMicrofrontend/AIChatbot'));

const App = ({ authClient, communityClient }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('chatbot');

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
        <Container>
          <Navbar.Brand href="#">🌐 Community Portal</Navbar.Brand>
          <Nav className="ml-auto">
            {isLoggedIn ? (
              <Logout onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <>
                <Login onLogin={() => setIsLoggedIn(true)} />
                <Signup />
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container>
        {isLoggedIn ? (
          <>
            <Nav
              variant="tabs"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Nav.Item>
                <Nav.Link eventKey="chatbot">🤖 AI Chatbot</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="posts">📢 Community Posts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="help">🆘 Help Requests</Nav.Link>
              </Nav.Item>
            </Nav>

            <Card className="shadow-sm border-0 p-4">
              <Suspense fallback={<div>Loading...</div>}>
                {activeTab === 'chatbot' && <AIChatbot />}
                {activeTab === 'posts' && (
                  <>
                    <CommunityPosts />
                    <CreatePost />
                  </>
                )}
                {activeTab === 'help' && (
                  <>
                    <HelpRequests />
                    <CreateHelpRequest />
                  </>
                )}
              </Suspense>
            </Card>
          </>
        ) : (
          <Card className="shadow-sm border-0 p-5 text-center">
            <h4>Please log in to access community features.</h4>
          </Card>
        )}
      </Container>
    </>
  );
};

export default App;
