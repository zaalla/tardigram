const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photoUrl: {
    type: String,
    required: true
  },
  caption: String,
  tags: {
    type: [String]
  }
});

postSchema.statics.findByIdWithComments = function(id) {
  return Promise.all([
    this.findById(id).populate('user', { username: true, profilePhotoUrl: true }).select({ __v: false }),
    this.model('Comment').find({ post: id })
  ])
    .then(([post, comments]) => ({
      ...post.toJSON(),
      comments
    }));
};

postSchema.statics.popularPosts = function() {
  return this.aggregate([
    { $lookup: { from: 'comments', localField: '_id', foreignField: 'post', as: 'comments' } }, 
    { $project: { commentCount: { $size: '$comments' }, photoUrl: true, caption: true, tags: true, user: true } }, 
    { $sort: { commentCount: -1 } }, 
    { $limit: 10 }
  ]);
};

module.exports = mongoose.model('Post', postSchema);
