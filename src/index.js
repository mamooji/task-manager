//import statements
import express from "express";
import "./db/mongoose.js";
import jwt from "jsonwebtoken";
import { Task } from "./models/task.js";
import { User } from "./models/user.js";

//importing models
import { userRouter } from "./routers/user.js";
import { taskRouter } from "./routers/task.js";

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   if (req.method === "GET") {
//     res.send("GET requests are diabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("site is in maintenance currently");
// });

//using our routers we imported
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//server
app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const main = async () => {};
main();
