import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import Layout from '../../../components/layout';
import { getError } from '../../../utils/error';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
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

export default function AdminCampaignHistoryScreen() {
    const [{loading, error, campaigns}, dispatch ] = useReducer(reducer, {
        loading: true,
        campaigns: [],
        error: '',
    })

    const {
        handleSubmit, register, formState: {errors},
      } = useForm();

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/campaign/campaignhistory`);
                dispatch({type: 'FETCH_SUCCESS', payload:data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: getError(err)});
            }
        };
        fetchOrders();
    },[]);
    
    const submitHandler = async({ campaignname, period, reach, visitor, content}) => {
        try {
           console.log(content, campaignname)
          await axios.post('/api/campaign/campaignregister', {
            campaignname, 
            period, 
            reach, 
            visitor, 
            content
          })
         
          if(result.error) {
            toast.error(result.error);
          }
        } catch (err) {
          toast.error(getError(err));
        }
       }
    
    const deleteHandler = async() => {

    }
  return (
    <Layout title="Campaign History">
   

    <h1 className="mb-4 text-xl">Campaign History</h1>
    {loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div className="alert-error">{error}</div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b">
            <tr className="px-5 text-left">
             
                <td className="p-5 ">Event Name</td>
                <td className="p-5 text-left">Event Period</td>
                <td className="p-5 text-left">AD Reach</td>
                <td className="p-5 text-left">Landing Page Visitors</td>
                <td className="p-5 text-left">ACTION</td>
                
            </tr>
          </thead>
               
          {campaigns.map((order, index,) => (
              <tbody key={index} >
                {order.campaign.map((subcam, i) => (
                  <tr key={i} className="border-b">
                    <td className='p-5 '>{subcam.campaignname}</td>
                    <td className=" p-5 ">{subcam.period}</td>
                    <td className=" p-5 ">{subcam.reach}</td>
                    <td className=" p-5 ">{subcam.visit}</td>           
                    <td className=" p-5 "><Image src={subcam.content} alt={subcam.campaignname} width={150} height={150}/></td>
                    <td className='p-5'>  
                        <a><button onClick={deleteHandler}>Delete</button></a>
                     
                    </td>
                  </tr>
                ))}
              </tbody>          
            ))} 
          
        </table>
      </div>
    )}
  </Layout>
  )
}
AdminCampaignHistoryScreen.auth = true;
