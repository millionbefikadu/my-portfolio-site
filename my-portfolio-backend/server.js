require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectDB = require('./config/db');

const typeDefs = require('./schema/typeDefs');
const contactResolvers = require('./resolvers/contactResolvers');
const gptResolvers = require('./resolvers/millionGPTResolver');

const app = express();
app.use(cors({
  origin: 'https://millioneshetu.netlify.app', // ✅ allow only this frontend
  credentials: true
}));

// ✅ Connect to MongoDB
connectDB();

// ✅ Combine resolvers
const combinedResolvers = {
  Query: {
    ...contactResolvers.Query,
    ...gptResolvers.Query, // <- this must include askMillionGPT
  },
  Mutation: {
    ...contactResolvers.Mutation,
    ...(gptResolvers.Mutation || {}), // support optional Mutation
  },
};

// ✅ Apollo Server setup with context
const server = new ApolloServer({
  typeDefs,
  resolvers: combinedResolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return { user };
    } catch {
      return {}; // no auth
    }
  },
  introspection: true,
  playground: true,
});

// ✅ Start Server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
