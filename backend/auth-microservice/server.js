const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();  // Make sure to load environment variables

const typeDefs = require('./schema/authSchema'); // Import the auth schema
const resolvers = require('./resolvers/authResolvers'); // Import your resolvers

const startServer = async () => {
  const app = express();

  // Use cors middleware to allow your React frontend
  app.use(cors({
    origin: 'http://localhost:5000', // React frontend URL
    methods: 'GET,POST',
    credentials: true, // Allow cookies and credentials
  }));

  // Connect to MongoDB
  try {
    await mongoose.connect('mongodb://localhost:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
      if (token) {
        try {
          // Verify JWT token using the secret
          const user = jwt.verify(token, process.env.JWT_SECRET);
          return { user };
        } catch (err) {
          throw new Error('Invalid token');
        }
      }
    },
  });

  // Start Apollo Server and apply middleware to the Express app
  await server.start();
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
