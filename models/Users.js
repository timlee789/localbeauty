import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  //storename: { type: String },
  url: { type: String },
  city: { type: String },
  state: { type: String },
  img1: { type: String },
  banner: {String},
  zip: { type: String },
  tel: { type: String},
  isAdmin: { type: Boolean, default: false },

  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  Store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  },
 
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
