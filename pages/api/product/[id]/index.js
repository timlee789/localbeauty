import mongoose from 'mongoose';
import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};
const putHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.productname = req.body.productname;
    product.price = req.body.price;
    product.description1 = req.body.description1;
    product.image = req.body.imageField;
    product.description2 = req.body.description2;
    product.description = req.body.description;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Product updated successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product not found' });
  }
};
const deleteHandler = async (req, res) => {
  await db.connect();
  const product = await Product.deleteOne({ _id: req.query.id });
  // const product = await UsaVipStores.findOneAndUpdate(
  //   { _id: '62db1fe8e239edf2e7033fb0' },
  //   {
  //     $pull: {
  //       product: {
  //         _id: '6356c5fa7f0a927d153fa198',
  //       },
  //     },
  //   },
  //   { $unset: { product: '' } }
  // );

  await db.disconnect();
  // if (product) {
  res.status(404).send({ message: 'Product deleted successfully' });
  // }
  //return;
};

export default handler;
