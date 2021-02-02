//import statements
import express from "express";
import "./db/mongoose.js";

//importing models

import { userRouter } from "./routers/user.js";
import { taskRouter } from "./routers/task.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//setver
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
