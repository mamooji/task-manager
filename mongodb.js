//CRUD operations

import mongodb from "mongodb";
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = mongodb;

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    const db = client.db(databaseName);

    db.collection("tasks").findOne(
      { _id: new ObjectID("5ffc7ebbda356a04c418dc1b") },
      (error, task) => {
        if (error) {
          return console.log("Unable to fetch task");
        }
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          return console.log(error);
        }
        console.log(tasks);
      });
  }
);
