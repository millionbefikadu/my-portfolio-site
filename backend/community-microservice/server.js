// server.js in community-microservice
require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema/communitySchema'); // Import the community schema
const resolvers = require('./resolvers/communityResolvers'); // Import your resolvers

const startServer = async () => {
  const app = express();

  // CORS setup
  app.use(cors({
    origin: 'http://localhost:5000', // React frontend URL
    methods: 'GET,POST',
    credentials: true, // Allow cookies and credentials
  }));

  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/community', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

          return { user };
        } catch (err) {
          console.error(err);
          throw new Error('Invalid token');
        }
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
  );
};

startServer();
