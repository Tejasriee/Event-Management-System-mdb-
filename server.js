const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function start() {

  await client.connect();
  console.log("MongoDB Connected");

  const db = client.db("event_management");

  app.get("/events", async (req, res) => {
    const data = await db.collection("events").find().toArray();
    res.send(data);
  });

  app.post("/addStudent", async (req, res) => {
    await db.collection("students").insertOne(req.body);
    res.send("Student Added");
  });

  app.post("/addEvent", async (req, res) => {
    await db.collection("events").insertOne(req.body);
    res.send("Event Added");
  });

  app.post("/register", async (req, res) => {
    await db.collection("registrations").insertOne(req.body);
    res.send("Registered Successfully");
  });

  app.get("/students", async (req, res) => {
  const data = await db.collection("students").find().toArray();
  res.send(data);
  });
  app.delete("/deleteEvent/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await db.collection("events").deleteOne({ _id: id });

  res.send("Event Deleted");
  });

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });

}

start();
