import React, { useState } from 'react';
import db from '../utils/db';
import Image from 'next/image';
//import CustomItemScreen from '../components/customitem';

import HomePage from './homepage';
import Layout from '../components/layout';

//import Product from '../models/Product';
import User from '../models/Users';
import HeadBanner from '../components/headbanner';

function StoreScreen({ store, head }) {
  const [userid, setUserid] = useState();

  return (
    <Layout>
      <div>
        <header>
          <nav className=" lg:flex h-4 items-center px-2 justify-center mt-20">
            <a className="text-md font-bold lg:text-3xl lg:text-center"></a>
            {head.map((heads) => (
              <HeadBanner key={heads._id} img1={heads.img1} />
            ))}
          </nav>
        </header>

        <div className="lg:justify-center mt-4">
          <div>
            <div className=" mt-20">
              <div className=" grid grid-cols-2 p-5 gap-5 md:grid-cols-4 ">
                {/* {store.map((sto) => (
                  <CustomItemScreen
                    key={sto._id}
                    productname={sto.productname}
                    price={sto.price}
                    image={sto.image}
                    description1={sto.description1}
                    user={sto.user}
                  />
                ))} */}
              </div>
              <HomePage />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { url } = params;
  await db.connect();
  //const store = await Product.find({ user: id });
  const userhead = await User.find({ url: url });
  //.populate('product');
  await db.disconnect();
  return {
    props: {
      //store: JSON.parse(JSON.stringify(store)),
      //head: JSON.parse(JSON.stringify(userhead)),
      head: JSON.parse(JSON.stringify(userhead)),
      //   head: userhead.map((head) => ({
      //     id: head._id,
      //     url: head.url,
      //   })),
      // store: store ? db.convertDocToObj(store) : null,
    },
  };
}
export default StoreScreen;