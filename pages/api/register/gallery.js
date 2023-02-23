import { getSession } from 'next-auth/react';
import Registration from '../../../models/Registration';

import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
  const { user } = session;
  await db.connect();
  //const Registrations = user.name;
  const data = await Registration.find({ user: user._id });
  await db.disconnect();
  res.send(data);
  //return  res.status(201).send({message: user.name});
};
export default handler;
