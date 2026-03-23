const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL || "mongodb+srv://sshk59501_db_user:3xXtmEiH1O3VP5Wh@cluster0.rmmngnr.mongodb.net/khetconnect?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected successfully to server");
  } catch (error) {
    console.error("Connection failed Error:", error.message);
  } finally {
    await client.close();
  }
}

run();
