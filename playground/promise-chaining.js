import "../src/db/mongoose.js";
import { User } from "../src/models/user.js";
import { Task } from "../src/models/task.js";

// 5fff1b9fd21f55068c5fd9a9

// User.findByIdAndUpdate("5ffdb623ca4cca2804d2c4ce", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age: age });
//   const count = await User.countDocuments({ age });
//   return count;
// };

// updateAgeAndCount("5fff1b9fd21f55068c5fd9a9", 10)
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5ffdafb1fcdb2b3b849c945d")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
