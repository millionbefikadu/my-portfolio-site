import React from "react";
import { useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import "./admin.css";

// GraphQL: Fetch all messages
const GET_MESSAGES = gql`
  query {
    contactMessages {
      id
      name
      email
      message
      createdAt
    }
  }
`;

// GraphQL: Delete message
const DELETE_MESSAGE = gql`
  mutation DeleteContactMessage($id: ID!) {
    deleteContactMessage(id: $id)
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_MESSAGES);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this message?")) {
      await deleteMessage({ variables: { id } });
      refetch(); // Refresh list after delete
    }
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>📬 Admin Messages</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="message-list">
        {data.contactMessages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          data.contactMessages.map((msg) => (
            <div className="message-card" key={msg.id}>
              <p><strong>{msg.name}</strong> (<em>{msg.email}</em>)</p>
              <p>{msg.message}</p>
              <p className="date">{new Date(msg.createdAt).toLocaleString()}</p>
              <button onClick={() => handleDelete(msg.id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
