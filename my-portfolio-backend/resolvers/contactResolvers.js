
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ContactMessage = require('../models/ContactMessage');
const Admin = require("../models/Admin"); // Create this if you haven't
const contactResolvers = {
  Query: {
    contactMessages: async () => {
      return await ContactMessage.find();
    },
  },
  Mutation: {
    addContactMessage: async (_, { name, email, message }) => {
      const newMessage = new ContactMessage({ name, email, message });
      await newMessage.save();
      return newMessage;
    },
    deleteContactMessage: async (_, { id }) => {
        await ContactMessage.findByIdAndDelete(id);
        return "Message deleted successfully.";
      },
      adminRegister: async (_, { email, password }) => {
        const existing = await Admin.findOne({ email });
        if (existing) throw new Error("Admin already exists");
      
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();
      
        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
      
        return token;
      },
      adminLogin: async (_, { email, password }) => {
        const admin = await Admin.findOne({ email });
        if (!admin) throw new Error("Admin not found");
      
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) throw new Error("Invalid password");
      
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "1h", // ✅ important for expiration check
        });
      
        return token; // ✅ frontend expects a string
      }
      
  },
};

module.exports = contactResolvers;
