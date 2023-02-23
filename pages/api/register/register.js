import db from '../../../utils/db';
//import { getSession } from 'next-auth/react';
import Registration from '../../../models/Registration';

const postHandler = async (req, res) => {
  //const session = await getSession({ req });
  //if (!session) {
  //  return res.status(401).send({ message: ' Signin Required' });
  //}
  //const { user } = session;
  if (req.method !== 'POST') {
    return;
  }
  const { name, phone, email, description, imageField, user } = req.body;

  await db.connect();
  const newRegistration = new Registration({
    name,
    phone,
    email,
    description,
    image: imageField,
    user: user,
  });
  const registration = await newRegistration.save();

  await db.disconnect();
  res.status(200).send({ message: 'Product created successfully', registration });
};

export default postHandler;
