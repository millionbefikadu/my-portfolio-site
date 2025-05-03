import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './contact.css';

const ADD_CONTACT_MESSAGE = gql`
  mutation AddContactMessage($name: String!, $email: String!, $message: String!) {
    addContactMessage(name: $name, email: $email, message: $message) {
      id
      name
    }
  }
`;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [addMessage, { loading, error }] = useMutation(ADD_CONTACT_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
                 const { data } = await addMessage({ variables: form });
                 console.log("Contact saved:", data); // Debug
                 if (data) setSuccess(true);

      setSuccess(true);
      setForm({ name: '', email: '', message: '' });

      setTimeout(() => setSuccess(false), 4000); // Auto-hide success
    } catch (err) {
      console.error("Error sending message:", err);
      setSuccess(false);
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>

      {success && <div className="success-message">✅ Message sent successfully!</div>}
      {error && <div className="error-message">❌ Something went wrong: {error.message}</div>}

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
