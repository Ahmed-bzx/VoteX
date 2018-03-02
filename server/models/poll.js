const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  options: [
    {
      option: {
        type: String,
        required: true
      },
      points: {
        type: Number,
        required: true
      }
    }
  ],
  author: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Poll', pollSchema);
