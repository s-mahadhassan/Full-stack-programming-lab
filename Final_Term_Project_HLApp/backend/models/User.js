/**
 * Purpose: User schema and model for Authentication
 * Description: Stores general login credentials, handles password hashing with bcrypt,
 * and exposes password validation methods.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false // Exclude from queries by default
    },
    role: {
      type: String,
      enum: ['admin', 'doctor', 'patient'],
      default: 'patient'
    }
  },
  {
    timestamps: true
  }
);

// Encrypt password using bcrypt pre-save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
