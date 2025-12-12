// api/save.js (for Vercel serverless function)
const { MongoClient } = require('mongodb');

module.exports = async (req, res) => {
    // Connect to MongoDB Atlas (free tier)
    const client = await MongoClient.connect('your-mongodb-connection-string');
    const db = client.db();
    
    if (req.method === 'POST') {
        await db.collection('items').insertOne(req.body);
        res.status(200).json({ success: true });
    } else {
        const items = await db.collection('items').find().toArray();
        res.status(200).json(items);
    }
};
