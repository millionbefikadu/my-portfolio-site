import React, { useState } from "react";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";

const CREATE_POST_MUTATION = gql`
  mutation CreateCommunityPost($title: String!, $content: String!, $category: String!) {
    createCommunityPost(title: $title, content: $content, category: $category) {
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

const CreatePost = ({ client }) => {
  const defaultClient = useApolloClient();
  const clientToUse = client || defaultClient;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("news");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    client: clientToUse,
    onCompleted: () => {
      setSuccess(true);
      setTitle("");
      setContent("");
      setError(null);
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }
    createPost({ variables: { title, content, category } });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="news">News</option>
          <option value="discussion">Discussion</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </Button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">Post created successfully!</Alert>}
    </Form>
  );
};

export default CreatePost;
