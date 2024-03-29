const { getAgent } = require('./data-helper');

describe('user routes', () => {
  it('can respond with 10 users with the most total comments on posts', () => {
    return getAgent()
      .get('/api/v1/users/popular')
      .then(res => {
        expect(res.body.length).toEqual(5);
        expect(res.body[0].commentCount).toBeGreaterThan(res.body[3].commentCount);
      });
  });

  it('can get top 10 users with the most posts', () => {
    return getAgent()
      .get('/api/v1/users/prolific')
      .then(res => {
        expect(res.body[0].postCount).toBeGreaterThan(res.body[3].postCount);
        expect(res.body.length).toEqual(5);
      });
  });

  it('can get the 10 users with the most comments', () => {
    return getAgent()
      .get('/api/v1/users/leader')
      .then(res => {
        expect(res.body[0].commentCount).toBeGreaterThan(res.body[2].commentCount);
        expect(res.body.length).toEqual(5);
      });
  });

  it('can return up to the 10 users with the most average comments per post', () => {
    return getAgent()
      .get('/api/v1/users/impact')
      .then(res => {
        expect(res.body[0].commentAverage).toBeGreaterThan(res.body[4].commentAverage);
        expect(res.body.length).toEqual(5);
      });
  });
});

