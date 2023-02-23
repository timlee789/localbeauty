import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function ProductList() {

  const session = getSession();
  const { user } = session;

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });


  const router = useRouter();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/product/productlist');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  


  
  return (
    <Layout>
    <div>
    

      <h1 className="mb-4 text-xl">Product List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-center flex-wrap">
           
            {products.map((order) => (
              <div key={order._id}>
                <div className="border-b">
                <div className=" p-2 ">
                    <Image
                      src={order.image}
                      alt={order.productname}
                      width={350}
                      height={550}
                    />
                  </div>
                  <div className="text-center text-blue-500 ">{order.productname}</div>
                  <div  className='flex justify-center'>
                  <div className=" font-bold text-center "> ${order.price}</div>
                  <div className='ml-17'>  &nbsp; &nbsp; &nbsp;   sale Price&nbsp;&nbsp; </div>
                  <div className=" font-bold text-center ">${order.price}</div>
                  </div>
                  <div className="text-center text-blue-500 ">{order.description1}</div>
                  <div className="text-center text-blue-500 ">{order.description2}</div>
                  <div className='flex justify-center'>
                 
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
  </div>
  </Layout>
  );
}

