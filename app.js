const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const uri = 'mongodb+srv://kunal2025:helloworld2025@cluster0.tzqw6vg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // replace with your MongoDB URI
const client = new MongoClient(uri,
  {tls: true,
  tlsAllowInvalidCertificates: false}
);
const dbName = 'library';
const collectionName = 'tags';

app.use(express.json()); // to parse JSON request bodies

app.get('/', (req,res)=>{
    
})

app.post('/submit', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertOne(data);

    res.status(200).send({ message: 'Data inserted', id: result.insertedId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
