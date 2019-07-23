const { getAgent, getUsers } = require('./data-helper');

describe('auth routes', () => {
  it('can create a new user', () => {
    return getAgent()
      .post('/api/v1/auth/signup')
      .send({
        username: 'lalall',
        password: 'wkejrnwkejrn',
        profilePhotoUrl: 'hebrjwhebwjebr'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'lalall',
          profilePhotoUrl: 'hebrjwhebwjebr'
        });
      });
  });

  it('can sign in an existing user and provide token', () => {
    const user = getUsers()[0];
    return getAgent()
      .post('/api/v1/auth/signin')
      .send({
        username: user.username,
        password: 'password',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: user.username,
          profilePhotoUrl: expect.any(String)
        });
      });
  });
  
  it('can verify a user with a token', () => {
    return getAgent() 
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: expect.any(String),
          profilePhotoUrl: expect.any(String)
        });
      });
  });
});
