const { getAgent, getUsers, getPosts, getComments } = require('./data-helper');

describe('comment routes', () => {
  it('create a new comment', () => {
    const users = getUsers();
    const posts = getPosts();
    return getAgent()
      .post('/api/v1/comments')
      .send({ commentBy: users[0]._id, post: posts[0]._id, comment: 'cool comment' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: users[0]._id,
          post: posts[0]._id,
          comment: 'cool comment',
          __v: 0
        });
      });
  });
});
