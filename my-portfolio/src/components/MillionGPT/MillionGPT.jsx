// src/pages/MillionGPT.jsx
import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { FaRobot } from "react-icons/fa";
import "./MillionGPT.css";

const ASK_MILLION_GPT = gql`
  query AskMillionGPT($question: String!) {
    askMillionGPT(question: $question)
  }
`;

const MillionGPT = () => {
  const [question, setQuestion] = useState("");
  const [askGPT, { data, loading, error }] = useLazyQuery(ASK_MILLION_GPT);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() !== "") {
      askGPT({ variables: { question } });
    }
  };

  return (
    <section className="million-gpt-section">
      <div className="million-gpt-content">
      <div className="sticky-header">
    <h2><FaRobot /> Ask MillionGPT</h2>
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Ask a question about Million..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
    <button type="submit">Ask</button>
  </form>
   </div>
        

        {loading && <p className="loading">🤖 Thinking...</p>}
        {error && <p className="error">❌ {error.message}</p>}
        {data?.askMillionGPT && (
          <div className="response-box">
            <h4>MillionGPT Says:</h4>
            <p>{data.askMillionGPT}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MillionGPT;
