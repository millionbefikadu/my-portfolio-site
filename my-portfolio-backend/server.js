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

// ✅ Apply CORS
app.use(cors({
  origin: 'https://millioneshetu.netlify.app',
  credentials: true,
}));

// ✅ Connect DB
connectDB();

// ✅ Combine resolvers
const resolvers = {
  Query: {
    ...contactResolvers.Query,
    ...gptResolvers.Query,
  },
  Mutation: {
    ...contactResolvers.Mutation,
    ...(gptResolvers.Mutation || {}),
  },
};

// ✅ Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    try {
      const user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      return { user };
    } catch {
      return {};
    }
  },
  introspection: true,
  playground: true,
});

// ✅ Apply Apollo Middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: false, // Important!
  });

   // ✅ Add this line
  app.get("/health", (_req, res) => res.send("ok"));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
