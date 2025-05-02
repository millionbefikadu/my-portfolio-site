// Lab 4 - AIChatbot.jsx
import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import './AIChatbot.css';

const COMMUNITY_AI_QUERY = gql`
  query CommunityAIQuery($input: String!) {
    communityAIQuery(input: $input) {
      text
      suggestedQuestions
      retrievedPosts {
        id
        content
      }
    }
  }
`;

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [getResponse, { data, loading, error }] = useLazyQuery(COMMUNITY_AI_QUERY);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      getResponse({ variables: { input } });
    }
  };

  return (
    <Container className="mt-4">
      <h3>Community AI Assistant 🤖</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Ask the AI about community discussions..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="primary" type="submit" className="mt-2">
          Ask
        </Button>
      </Form>

      {loading && <p>Loading AI response...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && (
        <>
          <div className="mt-4">
            <h5>💬 AI Response:</h5>
            <p>{data.communityAIQuery.text}</p>

            <h6>🤔 Suggested Questions:</h6>
            <ListGroup className="mb-3">
              {data.communityAIQuery.suggestedQuestions.map((q, i) => (
                <ListGroup.Item key={i}>{q}</ListGroup.Item>
              ))}
            </ListGroup>

            <h6>📚 Related Community Posts:</h6>
            <ListGroup>
              {data.communityAIQuery.retrievedPosts.map((post) => (
                <ListGroup.Item key={post.id}>{post.content}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </>
      )}
    </Container>
  );
};

export default AIChatbot;
