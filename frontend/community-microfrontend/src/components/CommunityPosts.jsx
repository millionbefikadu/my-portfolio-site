import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, ListGroup, Alert, Container } from "react-bootstrap";
import './CommunityPosts.css';

// GraphQL query
const GET_COMMUNITY_POSTS = gql`
  query CommunityPosts {
    communityPosts {
      id
      title
      content
      category
      author {
        username
      }
      createdAt
    }
  }
`;

// ✅ Safely converts timestamp to a readable date format
const formatDate = (timestamp) => {
  if (!timestamp) return "No date provided";
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
};

const CommunityPosts = () => {
  const { loading, error, data } = useQuery(GET_COMMUNITY_POSTS);

  if (loading) return <Alert variant="info">Loading community posts...</Alert>;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Community Posts</h2>

      {data.communityPosts.length === 0 ? (
        <Card className="text-center text-muted p-3">
          <Card.Body>No posts available. Be the first to create one!</Card.Body>
        </Card>
      ) : (
        data.communityPosts.map((post) => (
          <Card key={post.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.content}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Category:</strong> {post.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Author:</strong> {post.author.username}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Date:</strong> {formatDate(post.createdAt)}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default CommunityPosts;
