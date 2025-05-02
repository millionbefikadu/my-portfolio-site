const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # === Contact Message ===
  type ContactMessage {
    id: ID!
    name: String!
    email: String!
    message: String!
    createdAt: String!
    updatedAt: String!
  }

  # === Million AI Fact / Prompt ===
  type MillionFact {
    id: ID!
    topic: String!
    response: String!
  }

  # === Query Definitions ===
  type Query {
    # Contact
    contactMessages: [ContactMessage]

    # Million Facts
    getMillionFacts: [MillionFact]
    getFactByTopic(topic: String!): MillionFact

    # AI Assistant
    askMillionGPT(question: String!): String
  }

  # === Mutation Definitions ===
  type Mutation {
    # Contact
    addContactMessage(name: String!, email: String!, message: String!): ContactMessage
    deleteContactMessage(id: ID!): String

    # Admin Auth
    adminLogin(email: String!, password: String!): String
    adminRegister(email: String!, password: String!): String

    # Million Facts
    addMillionFact(topic: String!, response: String!): MillionFact
    deleteMillionFact(id: ID!): String
  }
`;

module.exports = typeDefs;
