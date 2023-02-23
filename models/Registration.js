import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model('Registration', registrationSchema);
export default Registration;
