const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SECRET}@cluster0.ikm2v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    await client.connect();
    // Send a ping to confirm a successful connection

    const projectCollection = client.db("myPortfolio").collection("projects");
    const technologyCollection = client.db("myPortfolio").collection("technologies");
    
      // project route
      app.post("/projects", async (req, res) => {
        const projects = req.body;
        const result = await projectCollection.insertOne(projects);
        console.log("Project Info: ", result);
        res.send(result);
      });

      app.get("/projects", async (req, res) => {
        const query = projectCollection.find();
        const result = await query.toArray();
        res.send(result);
      });

      // technology route
      app.post("/technologies", async (req, res) => {
        const technology = req.body;
        const result = await technologyCollection.insertOne(technology);
        console.log("Technology Info: ", result);
        res.send(result);
      });

      app.get("/technologies", async (req, res) => {
        const query = technologyCollection.find();
        const result = await query.toArray();
        res.send(result);
      });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// run().catch(console.dir);
run().catch((error) => console.log(error));




app.get("/", (req, res) => {
    res.send("my-portfolio Server is Running");
  });
  
  app.listen(port, () => {
    console.log(`my-portfolio Server is Running on ${port}`);
  });