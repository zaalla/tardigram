const { getAgent, getUsers, getPosts } = require('./data-helper');

describe('post routes', () => {
  it('can create a post', () => {
    return getAgent()
      .post('/api/v1/posts/')
      .send({ photoUrl: 'somePhoto', caption: 'someCaption', tags: ['cool', 'dog', 'blessed'] })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: expect.any(String),
          photoUrl: 'somePhoto',
          caption: 'someCaption',
          tags: ['cool', 'dog', 'blessed'],
          __v: 0
        });
      });
  });
    
  it('can get all posts', () => {
    const posts = getPosts();
    return getAgent()
      .get('/api/v1/posts')
      .then(res => {
        posts.forEach(post => {
          expect(res.body).toContainEqual({
            tags: post.tags,
            caption: post.caption,
            photoUrl: post.photoUrl,
            user: expect.any(String)
          });
        });
      });
  });

  it('can get posts by id', async() => {
    const posts = getPosts();
    const user = getUsers()[0];
    const post = posts.find(p => p.user === user._id);

    return getAgent()
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          user: {
            username: user.username,
            profilePhotoUrl: user.profilePhotoUrl,
            _id: expect.any(String)
          },
          photoUrl: post.photoUrl,
          caption: post.caption,
          tags: [...post.tags],
          _id: expect.any(String),
          comments: expect.any(Array)
        });
      });
  });

  it('patches a caption by id, if current user', () => {
    const posts = getPosts();
    const user = getUsers()[0];
    const post = posts.find(p => p.user === user._id);

    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'New Caption' })
      .then(res => {
        expect(res.body).toEqual({
          user: user._id,
          photoUrl: post.photoUrl,
          caption: 'New Caption',
          tags: expect.any(Array), 
          _id: expect.any(String)
        });
      });
  });

  it('it can delete a post', async() => {
    const posts = getPosts();
    const user = getUsers()[0];
    const post = posts.find(p => p.user === user._id);

    return getAgent()
      .delete(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body.caption).toEqual(post.caption);
      });
  });

  it('can get no more than 10 posts with the most comments', () => {
    return getAgent()
      .get('/api/v1/posts/popular')
      .then(res => {
        expect(res.body[0].commentCount).toBeGreaterThan(res.body[9].commentCount);
        expect(res.body.length).toEqual(10);
      });
  });
});
