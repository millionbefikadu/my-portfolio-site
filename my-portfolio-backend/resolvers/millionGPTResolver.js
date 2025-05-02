const { getMillionGPTResponse } = require("../utils/geminiService");

const millionGPTResolver = {
  Query: {
    askMillionGPT: async (_, { question }) => {
      return await getMillionGPTResponse(question);
    }
  }
};

module.exports = millionGPTResolver;
