require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectDB = require('./config/db');

const typeDefs = require('./schema/typeDefs');
const contactResolvers = require('./resolvers/contactResolvers');
const gptResolvers = require('./resolvers/millionGPTResolver');

// ✅ Initialize Express
const app = express();

// ✅ CORS config to allow frontend domain (Netlify)
app.use(cors({
  origin: 'https://millioneshetu.netlify.app', // Netlify frontend
  credentials: true
}));

// ✅ Connect to MongoDB
connectDB();

// ✅ Combine resolvers
const combinedResolvers = {
  Query: {
    ...contactResolvers.Query,
    ...gptResolvers.Query,
  },
  Mutation: {
    ...contactResolvers.Mutation,
    ...(gptResolvers.Mutation || {}),
  },
};

// ✅ Apollo Server setup
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: combinedResolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return { user };
      } catch {
        return {}; // allow unauthenticated access
      }
    },
    introspection: true,
    playground: true,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// ✅ Start the server
startServer();
