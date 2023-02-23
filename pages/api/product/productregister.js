import db from '../../../utils/db';
import { getSession } from 'next-auth/react';
import Product from '../../../models/Product';

const postHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: ' Signin Required' });
  }
  const { user } = session;
  if (req.method !== 'POST') {
    return;
  }
  const { productname, price, description1, description2, imageField } = req.body;

  await db.connect();
  const newProduct = new Product({
    productname,
    price,
    description1,
    description2,
    image: imageField,
    user: user._id,
  });
 const product = await newProduct.save();

  await db.disconnect();
  res.status(200).send({ message: 'Product created successfully', product });
};

export default postHandler;
