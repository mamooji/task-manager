import "../src/db/mongoose.js";
import { User } from "../src/models/user.js";

// 5fff1b9fd21f55068c5fd9a9

User.findByIdAndUpdate("5ffdb623ca4cca2804d2c4ce", { age: 1 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
