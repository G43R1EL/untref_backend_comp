require('dotenv').config();

const { MONGODB_URI, DB_NAME } = process.env;
const mongo = require('mongodb');

class MongoDAO {
  constructor() {
    this.connectionString = MONGODB_URI;
    this.client = new mongo.MongoClient(this.connectionString);
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.log('Error connecting to MongoDB');
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.log('Error disconnecting from MongoDB');
    }
  }

  async getCollection(collectionName) {
    return this.db.collection(collectionName);
  }

  async createDocument(collectionName, document) {
    const collection = await this.getCollection(collectionName);
    const res = await collection.insertOne(document);
    return res;
  }

  async getDocuments(collectionName, query = {}) {
    const collection = await this.getCollection(collectionName);
    const documents = await collection.find(query).toArray();
    return documents;
  }

  async getDocumentById(collectionName, id) {
    const collection = await this.getCollection(collectionName);
    const document = await collection.findOne({ _id: new mongo.ObjectId(id) });
    return document;
  }

  async replaceDocument(collectionName, id, document) {
    const collection = await this.getCollection(collectionName);
    const res = await collection.replaceOne({ _id: new mongo.ObjectId(id) }, document);
    return res;
  }

  async updateDocument(collectionName, id, document) {
    const collection = await this.getCollection(collectionName);
    const res = await collection.updateOne({ _id: new mongo.ObjectId(id) }, { $set: document });
    return res;
  }

  async deleteDocument(collectionName, id) {
    const collection = await this.getCollection(collectionName);
    const res = await collection.deleteOne({ _id: new mongo.ObjectId(id) });
    return res;
  }
}

module.exports = MongoDAO;
