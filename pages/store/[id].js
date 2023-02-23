import React, { useState } from 'react';
import db from '../../utils/db';
import CustomItemScreen from '../../components/customitem';
import Layout from '../../components/layout';
import Product from '../../models/Product';
import Store from '../../models/Stores';
import HeadBanner from '../../components/headbanner';
import Registration from '../contest/registration';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';

function StoreScreen({ store, product, featuredProducts }) {
  return (
    <Layout>
      <Carousel showArrows={true} showThumbs={false} swipeable={true} autoPlay>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`product/${product._id}`}>
              <img src={store.banner} alt={store.name} />
            </Link>
          </div>
        ))}
      </Carousel>
      <div>
        {store.map((heads) => (
          <HeadBanner key={heads._id} img1={heads.img1} />
        ))}

        <div className="lg:justify-center mt-4">
          <div>
            {/* <div>
              {store.map((hed) => (
                <Registration key={hed._id} id={hed._id} />
              ))}
            </div> */}
            <div>
              <div className=" grid grid-cols-1 p-5 gap-5 md:grid-cols-4 ">
                {product.map((sto) => (
                  <CustomItemScreen
                    key={sto._id}
                    _id={sto._id}
                    productname={sto.productname}
                    price={sto.price}
                    image={sto.image}
                    description1={sto.description1}
                    user={sto.user}
                    countInStock={sto.countInStock}
                  />
                ))}
              </div>
              {/* <HomePage /> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  await db.connect();
  const store = await Store.find({ _id: id });
  const product = await Product.find({ user: id });
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  await db.disconnect();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      store: JSON.parse(JSON.stringify(store)),
    },
  };
}
export default StoreScreen;
