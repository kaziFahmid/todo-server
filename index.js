const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT||5000
let dotenv = require('dotenv').config()

var cors = require('cors')
app.use(cors())
app.use(express.json())

// 
// 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f7zs7lw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
   
    const todos = client.db("todosDB").collection("todosCollections");






    app.post('/todos', async(req, res) => {
        let todo=req.body
        let result= await todos.insertOne(todo)
        res.send(result)
      })
      
      


      app.get('/todos', async(req, res) => {

        let result= await todos.find().toArray()
        res.send(result)
      })
      
      app.delete('/todos/:id', async(req, res) => {
        let id=req.params.id
        let query={_id: new ObjectId(id)}
        let result= await todos.deleteOne(query)
        res.send(result)
      })
      
      app.patch('/todos/:id', async (req, res) => {
        const status = req.body.status; 
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) }; // Use ObjectId for matching _id field
        const updateDoc = {
          $set: {
            status: status,
          },
        };
        const result = await todos.updateOne(filter, updateDoc);
        res.send(result);
      });
      





    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})