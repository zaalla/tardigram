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

  it('can delete a comment by id', async() => {
    const comments = getComments();
    const user = getUsers()[0];
    const comment = comments.find(c => c.commentBy === user._id);
    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body.comment).toEqual(expect.any(String));
      });
  });
});
