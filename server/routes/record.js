import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = await db.collection("user accounts");
  let results = await collection.find({}).toArray();
  res.status(200).send(results);
});

router.get("/:username", async (req, res) => {
  let collection = await db.collection("user accounts");
  let query = { username: req.params.username };
  let result = await collection.findOne(query);

  if (!result) res.status(404).send("User not found");
  else res.status(200).send(result);
});

router.post("/", async (req, res) => {
  try {
    let newDocument = {
      username: req.body.username,
      password: req.body.password,
      pass_level: req.body.pass_level,
      ufid: req.body.ufid,
    };
    let collection = await db.collection("user accounts");
    let result = await collection.insertOne(newDocument);

    res.status(204).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

router.patch("/:username", async (req, res) => {
  try {
    const query = { username: new String(req.params.username) };
    const updates = {
      $set: {
        username: req.body.username,
        password: req.body.password,
        pass_level: req.body.pass_level,
        ufid: req.body.ufid,
      },
    };

    let collection = await db.collection("user accounts");
    let result = await collection.updateOne(query, updates);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

router.delete("/:username", async (req, res) => {
  try {
    const query = { username: req.params.username };
    const collection = db.collection("user accounts");

    let result = await collection.deleteOne(query);

    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let collection = db.collection("user accounts");

  let result = await collection.findOne({ username, password });

  if (result) {
      res.status(200).json({ success: true, message: "Successful" });
  } else {
      res.status(401).json({ success: false, message: "Invalid" });
  }
});

export default router;