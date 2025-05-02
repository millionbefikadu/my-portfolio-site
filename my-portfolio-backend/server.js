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

// ✅ Allow only Netlify frontend
const allowedOrigins = ['https://millioneshetu.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like curl or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
// ✅ Connect MongoDB
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

// ✅ Apollo Server with context
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

// ✅ Start the server
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
