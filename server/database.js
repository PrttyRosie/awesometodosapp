require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Ensure the connection URI is correct
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ ERROR: MONGODB_URI is not set in .env file.");
  process.exit(1); // Exit if no URI is found
}

// MongoDB connection options
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true, // Enable TLS for secure connection
  tlsAllowInvalidCertificates: false, // Ensure certificates are valid
};

let client;

// Connect to MongoDB
const connectToMongoDB = async () => {
  if (!client) {
    try {
      console.log("🔄 Connecting to MongoDB...");
      client = await MongoClient.connect(uri, options);
      console.log("✅ Successfully connected to MongoDB!");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      process.exit(1); // Exit the process if connection fails
    }
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };
