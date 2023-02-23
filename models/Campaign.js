import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  campaignname: { type: String, required: true },
  period: { type: String, required: true },
  reach: { type: String, required: true },
  visit: { type: String, required: true },
  content: { type: String, required: true },
  participation: { type: String },
});

const Campaign =
  mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
export default Campaign;
