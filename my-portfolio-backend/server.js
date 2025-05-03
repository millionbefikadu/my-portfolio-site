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

// ✅ CORS setup — allows only your Netlify frontend
app.use(cors({
  origin: 'https://millioneshetu.netlify.app',
  credentials: true,
}));

// ✅ Connect to MongoDB
connectDB();

// ✅ Merge resolvers
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

// ✅ Apollo Server setup with context (auth support)
const server = new ApolloServer({
  typeDefs,
  resolvers: combinedResolvers,
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

// ✅ Start the Apollo + Express server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
