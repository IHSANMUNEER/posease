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
        createdAt: {
          type: Date,
          default: Date.now
        }
      });
      

const User = mongoose.model('Users', userSchema);

module.exports = User;
