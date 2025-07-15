const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Name is required'],
    minLength: [3, 'Name must be at least 3 characters'],
  },
  username:{
    unique: true,
    type: String,
    required: true,
    minlength: 4
  },
  hashedPassword: {
    type: String,
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.hashedPassword
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User