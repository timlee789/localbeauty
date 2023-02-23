import { getSession } from 'next-auth/react';
import Product from '../../../models/Product';

import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
  const { user } = session;
  await db.connect();
  //const Products = user.name;
  const products = await Product.find({ user: user._id });
  await db.disconnect();
  res.send(products);
  //return  res.status(201).send({message: user.name});
};
export default handler;
