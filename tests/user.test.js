import request from "supertest";
import { app } from "../src/app.js";
import { User } from "../src/models/user.js";
import { userOneId, userOne, setUpDatabase } from "./fixtures/db.js";

beforeEach(setUpDatabase);

test("Should sign up a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Muhammad Mamooji",
      email: "mamoojim@hotmail.com",
      password: "GangShit1229!",
    })
    .expect(201);

  //assert that the database was chagned correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: "Muhammad Mamooji",
      email: "mamoojim@hotmail.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("MyPass777!");
});

test("Should log in existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not log in a non existent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "randonuser@example.com",
      password: "randonPassword1@!",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete account for authenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Muhammad",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("Muhammad");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Muhammad",
    })
    .expect(400);
});
