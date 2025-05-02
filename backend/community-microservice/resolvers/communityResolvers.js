const CommunityPost = require('../models/CommunityPost');
const HelpRequest = require('../models/HelpRequest');
const Interaction = require('../models/Interaction');
const { runCommunityAI } = require('../aiAgent');

const resolvers = {
  Query: {
    communityPosts: async () => await CommunityPost.find().populate('author'),
    helpRequests: async () => await HelpRequest.find().populate('author volunteers'),

    communityAIQuery: async (_, { input }) => {
      const result = await runCommunityAI(input);

      await Interaction.create({
        input,
        response: result.text || '',
      });

      // 💡 Ensure non-nullable fields have default values
      return {
        text: result.text || '',
        suggestedQuestions: result.suggestedQuestions || [],
        retrievedPosts: result.retrievedPosts || [],
      };
    }
  },

  Mutation: {
    createCommunityPost: async (_, { title, content, category }, { user }) => {
      if (!user) throw new Error('Authentication required');

      const post = new CommunityPost({
        title,
        content,
        category,
        author: {
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt || new Date()
        }
      });

      await post.save();
      return post;
    },

    createHelpRequest: async (_, { description, location }, { user }) => {
      if (!user) throw new Error('Authentication required');

      const request = new HelpRequest({
        description,
        location,
        author: { username: user.username }
      });

      await request.save();
      return request;
    },

    volunteerForHelpRequest: async (_, { requestId }, { user }) => {
      const request = await HelpRequest.findById(requestId);
      if (!request) throw new Error('Help request not found');

      request.volunteers.push(user.username);
      await request.save();
      return request;
    }
  }
};

module.exports = resolvers;
