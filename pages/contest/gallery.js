import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

import Layout from '../../components/layout';
import { getError } from '../../utils/error';
import Image from 'next/image';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, campaigns: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function GalleryScreen() {
  const [{ loading, error, campaigns }, dispatch] = useReducer(reducer, {
    loading: true,
    campaigns: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/register/gallery`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  console.log(campaigns);
  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">Product List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="">
          <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3 lg:grid-cols-5 ml-7">
            {campaigns.map((subcam) => (
              <div key={subcam._id} className="card">
                <div className=" p-5 ">
                  <Image
                    src={subcam.image}
                    alt={subcam.name}
                    width={300}
                    height={400}
                  />
                </div>
                <div className="text-center">{subcam.name}</div>
                <div className="text-center">{subcam.phone}</div>
                <div className="text-center">{subcam.email}</div>
                <div className="text-center">{subcam.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
//CampaignHistoryScreen.auth =  true;
