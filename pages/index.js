import db from '../utils/db';
import StoreInfo from '../components/storeinfo';
import Layout from '../components/layout';
import Stores from '../models/Stores';
import Image from 'next/image';
import LoginScreen from '@/components/login';
import { useSession } from 'next-auth/react';
import Productpage from '@/components/productpage';

export default function Home({ storeinfo }) {
  const {status, data: session} = useSession();
  return (
    <Layout title="Home Page">
      {session?.user?.email? (
        <div>{session.user._id}
        <div>
          <Productpage />
        </div>
        </div>
      ) : (
        <div className="flex justify-center card ">
        <LoginScreen />
       </div>
      )}
     
      <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-5 ml-7 ">
        {storeinfo.map((sto) => (
          <StoreInfo
            key={sto._id}
            id={sto._id}
            img1={sto.img1}
            url={sto.url}
            state={sto.state}
            storename={sto.name}
            city={sto.city}
          />
        ))}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const stores = await Stores.find().sort({ state: 1 }).lean();
  return {
    props: {
      storeinfo: stores.map((sto) => ({
        _id: sto._id.toString(),
        name: sto.storename || null,
        city: sto.city || null,
        state: sto.state || null,
        url: sto.url || null,
        img1: sto.img1 || null,
      })),
    },
  };
}
