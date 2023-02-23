import { getSession } from 'next-auth/react';
//import Stores from "../../../models/Stores";
import User from '../../../models/Users';
import db from '../../../utils/db';
import bcrypt from 'bcrypt';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { user } = session;
  const { name, email, storename, password } = req.body;

  if (
    !name ||
    !storename ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.storename = storename;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = bcrypt.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    messgage: ' User updated',
  });
}
export default handler;
