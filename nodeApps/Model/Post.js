const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

  title: {
    type: String,
    required: 'Title is required',
  },
  content: {

    type: String,
    required: 'Content is required',
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments',
    required: 'Comment is required',
  }],
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Post', postSchema);
