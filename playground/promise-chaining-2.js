import "../src/db/mongoose.js";
import { Task } from "../src/models/task.js";

Task.findByIdAndDelete("5fff1ee494e2992e44222cf1")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
