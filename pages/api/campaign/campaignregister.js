import db from '../../../utils/db';
import { getSession } from 'next-auth/react';
import Campaign from '../../../models/Campaign';

const putHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: ' Signin Required' });
  }
  const { user } = session;
  if (req.method !== 'POST') {
    return;
  }
  const { campaignname, period, reach, visit, imageField } = req.body;

  await db.connect();
  const newCampaign = new Campaign({
    campaignname,
    period,
    reach,
    visit,
    content: imageField,
    user: user._id,
  });
  const campaign = await newCampaign.save();

  res.send(campaign);
};

export default putHandler;
