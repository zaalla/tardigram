const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ users = 5, posts = 50, comments = 100 } = { users: 5, posts: 50, comments: 100 }) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      username: chance.name(),
      password: 'password',
      profilePhotoUrl: chance.word()
    }))
  );

  const createdPosts = await Post.create(
    [...Array(posts)].map(() => ({
      user: chance.pickone(createdUsers)._id,
      photoUrl: chance.word(),
      caption: chance.animal()
    }))
  );

  const createdComments = await Comment.create(
    [...Array(comments)].map(() => ({
      commentBy: chance.pickone(createdUsers)._id,
      post: chance.pickone(createdPosts)._id,
      comment: chance.sentence()
    }))
  );

  return {
    users: createdUsers,
    posts: createdPosts,
    comments: createdComments
  };
};