//import statements
import express from "express";
import "./db/mongoose.js";

//importing models
import { userRouter } from "./routers/user.js";
import { taskRouter } from "./routers/task.js";

const app = express();

//using our routers we imported
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

export { app };
