import mongoose from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';
import bcrypt from 'bcrypt';

export const schema = {
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
};

const UserSchema = new mongoose.Schema(schema, { timestamps: true });

// eslint-disable-next-line
UserSchema.pre('save', function (next) {
  const user = this;
  const saltRounds = 10;
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(saltRounds, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }
      bcrypt.hash(user.password, salt, (hashError, hash) => {
        // Store hash in your password DB.
        if (hashError) {
          return next(hashError);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// eslint-disable-next-line
UserSchema.methods.comparePassword = function (userPassword) {
// eslint-disable-next-line
  bcrypt.compare(userPassword, this.password, function(err, isMatch) {
    if (err) return err;
    return isMatch;
  });
};

export const User = mongoose.model('User', UserSchema);
