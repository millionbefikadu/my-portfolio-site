import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, ListGroup, Alert, Container } from "react-bootstrap";
import './HelpRequests.css';

const GET_HELP_REQUESTS = gql`
  query HelpRequests {
    helpRequests {
      id
      description
      location
      isResolved
      author {
        username
      }
      volunteers {
        username
      }
      createdAt
    }
  }
`;

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
};

const HelpRequests = ({ client }) => {
  const { loading, error, data } = useQuery(GET_HELP_REQUESTS, { client });

  if (loading) return <Alert variant="info">Loading help requests...</Alert>;
  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Help Requests</h2>

      {data.helpRequests.length === 0 ? (
        <Card className="text-center text-muted p-3">
          <Card.Body>No help requests available. Be the first to create one!</Card.Body>
        </Card>
      ) : (
        data.helpRequests.map((request) => (
          <Card key={request.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{request.description}</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Location:</strong> {request.location || "Not specified"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Status:</strong> {request.isResolved ? "Resolved" : "Not Resolved"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Author:</strong> {request.author?.username || "Unknown"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Volunteers:</strong>{" "}
                  {request.volunteers.length
                    ? request.volunteers.map((v) => v.username).join(", ")
                    : "No volunteers yet"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Date:</strong> {formatDate(request.createdAt)}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default HelpRequests;
