import mongoose from 'mongoose';

export const schema = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please provide a valid phone number'],
    unique: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
};

const ContactSchema = new mongoose.Schema(schema, { timestamps: true });

export const Contact = mongoose.model('Contact', ContactSchema);
