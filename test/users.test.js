const { getAgent, getUsers, getPosts, getComments } = require('./data-helper');

describe('user routes', () => {
  it('can get top 10 users with the most posts', () => {
    return getAgent()
      .get('/api/v1/users/prolific')
      .then(res => {
        console.log(res.body)
        expect(res.body[0].postCount).toBeGreaterThan(res.body[3].postCount);
        expect(res.body.length).toEqual(5);
      });
  });
});

