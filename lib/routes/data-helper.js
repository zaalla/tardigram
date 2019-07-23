require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../utils/connect');
const app = require('../app');
const seedData = require('./seed-data');

const prepare = arr => JSON.parse(JSON.stringify(arr));

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

let agent = request.agent(app);
let seededUsers = null;
let seededPosts = null;
let seededComments = null;
beforeEach(async() => {
  const { users, posts, comments } = await seedData();
  seededUsers = prepare(users);
  seededPosts = prepare(posts);
  seededComments = prepare(comments);

  return await agent
    .post('/api/v1/auth/signin')
    .send({ username: users[0].username, password: 'password' });
});

afterAll(() => {
  return mongoose.connection.close();
});

module.exports = {
  getAgent: () => agent,
  getUsers: () => seededUsers,
  getPosts: () => seededPosts,
  getComments: () => seededComments
};

