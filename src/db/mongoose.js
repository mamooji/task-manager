//import statements
import mongoose from "mongoose";
import validator from "validator";

//db connection
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//user model
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot containt the word password ");
      }
    },
  },
});

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const me = new User({
  name: "Muhammad",
  email: "mamoojim@hotmail.com",
  password: "pass5jfdkjfkdjfkd",
});
me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log(error);
  });

const task = new Task({
  description: "go for a run",
});
me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log(error);
  });
