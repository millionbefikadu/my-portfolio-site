const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String
    email: String
    role: String
    createdAt: String
  }

  type CommunityPost {
    id: ID!
    title: String!
    content: String!
    category: String!
    author: User!
    createdAt: String!
    updatedAt: String
  }

  type HelpRequest {
    id: ID!
    description: String!
    location: String
    isResolved: Boolean!
    author: User
    volunteers: [User!]
    createdAt: String!
    updatedAt: String
  }

  # Lab 4 - AI Agent Types
  type AIResponse {
    text: String!
    suggestedQuestions: [String!]!
    retrievedPosts: [AICommunityPost!]!
  }

  type AICommunityPost {
    id: ID!
    content: String!
  }

  type Query {
    communityPosts: [CommunityPost!]
    helpRequests: [HelpRequest!]

    # Lab 4 - AI Chatbot Query
    communityAIQuery(input: String!): AIResponse!
  }

  type Mutation {
    createCommunityPost(title: String!, content: String!, category: String!): CommunityPost
    createHelpRequest(description: String!, location: String): HelpRequest
    volunteerForHelpRequest(requestId: ID!): HelpRequest
  }
`;

module.exports = typeDefs;
