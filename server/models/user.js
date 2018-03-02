const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  google: {
    id: String,
    name: String
  }
});

module.exports = mongoose.model('User', userSchema);
