// App.jsx - Lab 4 Final Integration with AI Chatbot
import React, { useState } from 'react';
import { Container, Row, Col, Card, Tab, Tabs } from 'react-bootstrap';
import CommunityPosts from './components/CommunityPosts';
import CreatePost from './components/CreatePost';
import HelpRequests from './components/HelpRequests';
import CreateHelpRequest from './components/CreateHelpRequest';
import AIChatbot from './components/AIChatbot'; // ✅ Lab 4: Import AI Chatbot
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Global layout styles like navbar, body, tab styles

const App = ({ authClient, communityClient }) => {
  // 🔑 Default tab (you can set 'chat' to open chatbot first)
  const [key, setKey] = useState('posts');

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <Tabs activeKey={key} onSelect={(k) => setKey(k)} id="community-tabs" className="mb-3">
                
                {/* 🟦 Community Posts Tab */}
                <Tab eventKey="posts" title="Community Posts">
                  <Card.Body>
                    <CreatePost client={communityClient} />
                    <CommunityPosts />
                  </Card.Body>
                </Tab>

                {/* 🟨 Help Requests Tab */}
                <Tab eventKey="help" title="Help Requests">
                  <Card.Body>
                    <CreateHelpRequest client={communityClient} />
                    <HelpRequests />
                  </Card.Body>
                </Tab>

                {/* 🧠 AI Chatbot Tab - Lab 4 Feature */}
                <Tab eventKey="chat" title="AI Chatbot 🤖">
                  <Card.Body>
                    <AIChatbot />
                  </Card.Body>
                </Tab>
                
              </Tabs>
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
