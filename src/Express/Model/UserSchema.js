const mongoose = require('mongoose');

    const userSchema = new mongoose.Schema({
        uid:{
         type: String,
         required: true
        },
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          unique: true // Assuming emails should be unique
        },
        profileuri: {
          type: String,
          required: false,
        },
        createdAt: {
          type: Date,
          default: Date.now
        },
        fileurl: {
          type: String,
          required: false
        }
      });
      

const User = mongoose.model('Users', userSchema);

module.exports = User;
