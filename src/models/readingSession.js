const mongoose = require('mongoose');

const readingSessionSchema = mongoose.Schema({
 
  book: {
    type: Number,
    ref: 'Book',
    required: true,
    },
  start_page: {
    type: Number,
    required: true,
    },
  end_page: {
    type: Number,
    required: true,
    },
  time: {
    type: Number,
    required: true,
    },
  created_at: { 
      type: Date,
      default: Date.now,
      required: true,
   },
   progress_user_start: {
    type: Number,
    required: true,
    },
    progress_user_end: {
    type: Number,
    required: true,
    },
    comment_session: {
      type: String,
    },   
});

module.exports = mongoose.model('readingSession', readingSessionSchema);
