const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

commentSchema.statics.findTotalCommentsOnUsersPosts = function() {
  return this.aggregate([
    { $group: { _id: '$post', commentCount: { $sum: 1 } } }, 
    { $lookup: { from: 'posts', localField: '_id', foreignField: '_id', as: 'post' } }, 
    { $unwind: { path: '$post' } }, 
    { $group: { _id: '$post.user', commentCount: { $sum: '$commentCount' } } }, 
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } }, 
    { $unwind: { path: '$user' } }, 
    { $project: { commentCount: true, user: true, _id: false } }, 
    { $sort: { commentCount: -1 } }, 
    { $limit: 10 }
  ]);
};

commentSchema.statics.leader = function() {
  return this.aggregate([
    { $group: { _id: '$commentBy', commentCount: { $sum: 1 } } }, 
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } }, 
    { $unwind: { path: '$user' } }, 
    { $project: { _id: false } }, 
    { $sort: { commentCount: -1 } }, 
    { $limit: 10 }
  ]);
};

commentSchema.statics.impactUsers = function() {
  return this.aggregate([
    { $group: { _id: '$post', commentCount: { $sum: 1 } } }, 
    { $lookup: { from: 'posts', localField: '_id', foreignField: '_id', as: 'post' } }, 
    { $unwind: { path: '$post' } }, 
    { $project: { _id: true, commentCount: true, 'post.user': true } }, 
    { $group: { _id: '$post.user', commentAverage: { $avg: '$commentCount' } } }, 
    { $sort: { commentAverage: -1 } }, 
    { $limit: 10 }
  ]);
};


module.exports = mongoose.model('Comment', commentSchema);
