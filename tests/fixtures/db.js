import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../../src/models/user.js";
import { Task } from "../../src/models/task.js";

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "34WHat@@#",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Muhammad Mamooji",
  email: "mamoojim@example.com",
  password: "Majdioj1239402!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "first task",
  completed: false,
  owner: userOneId,
};
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "second task",
  completed: true,
  owner: userOneId,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "third task",
  completed: false,
  owner: userTwoId,
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();

  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

export {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setUpDatabase,
  taskOne,
  taskTwo,
  taskThree,
};
