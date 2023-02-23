import { getSession } from 'next-auth/react';
import Campaign from '../../../models/Campaign';

import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
  const { user } = session;
  await db.connect();
  //const campaigns = user.name;
  const campaigns = await Campaign.find({ user: user._id });
  await db.disconnect();
  res.send(campaigns);
  //return  res.status(201).send({message: user.name});
};
export default handler;
