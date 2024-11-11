const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
    const serviceCollection = client.db("myPortfolio").collection("services");
    const educationCollection = client.db("myPortfolio").collection("educations");
    const experienceCollection = client.db("myPortfolio").collection("experiences");
    
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

      app.delete("/project/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await projectCollection.deleteOne(query);
        res.send(result);
      });
  
      app.get("/project/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await projectCollection.findOne(query);
        res.send(result);
      });
  
      app.put("/project/:id", async (req, res) => {
        const pId = req.params.id;
        console.log("Update Data Found",pId);
        const project = req.body;
        const filter = { _id: new ObjectId(pId) };
        const option = { upsert: true };
        
        const updatedProject = {
          $set: {
            projectName: project.projectName,
            projectLiveUrl: project.projectLiveUrl,
            gitHubUrl: project.gitHubUrl,
            description: project.description,
          },
        };

        const result = await projectCollection.updateOne(
          filter,
          updatedProject,
          option
        );
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

      app.delete("/technology/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await technologyCollection.deleteOne(query);
        res.send(result);
      });

      // Services route
      app.post("/services", async (req, res) => {
        const service = req.body;
        const result = await serviceCollection.insertOne(service);
        console.log("Services Info: ", result);
        res.send(result);
      });

      app.get("/services", async (req, res) => {
        const query = serviceCollection.find();
        const result = await query.toArray();
        res.send(result);
      });

      app.delete("/service/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await serviceCollection.deleteOne(query);
        res.send(result);
      });

      // education section
      app.post("/educations", async (req, res) => {
        const educations = req.body;
        const result = await educationCollection.insertOne(educations);
        console.log("Education Info: ", result);
        res.send(result);
      });

      app.get("/educations", async (req, res) => {
        const query = educationCollection.find();
        const result = await query.toArray();
        res.send(result);
      });

      app.delete("/education/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await educationCollection.deleteOne(query);
        res.send(result);
      });

       // experience section
       app.post("/experiences", async (req, res) => {
        const experience = req.body;
        const result = await experienceCollection.insertOne(experience);
        console.log("Experience Info: ", result);
        res.send(result);
      });

      app.get("/experiences", async (req, res) => {
        const query = experienceCollection.find();
        const result = await query.toArray();
        res.send(result);
      });

      app.delete("/experience/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await experienceCollection.deleteOne(query);
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