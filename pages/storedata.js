import { Cookies } from 'next/dist/server/web/spec-extension/cookies';
//import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import {Store} from '../utils/Store';

export default function StoreDataScreen() {
    const {
        handleSubmit,
        register,
        formState: { error },
        setValue,
    } = useForm();
    //const router = useRouter();
    
    const {state, dispatch} = useContext(Store);
    const { cart } = state;
    const { storedata } = cart;
    useEffect(() => {
        setValue('fullname', storedata.fullname);
        setValue('address', storedata.address);
        setValue('city', storedata.city);
        setValue('usastate', storedata.usastate);
        setValue('postalCode', storedata.postalCode);     
    }, [setValue, storedata]);

    const submitHandler = ({fullName, address, city, usastate, postalCode}) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {fullName, address, city, usastate, postalCode},
        });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                storedata: {fullName, address, city, usastate, postalCode},
            })
        );

    }
  return (
        <Layout title="Shipping Address">
        
            <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
            >
            <h1 className="mb-4 text-xl">Shipping Address</h1>
                <div className="mb-4">
                    <label htmlFor="fullName">Store Name</label>
                    <input
                    className="w-full"
                    id="fullName"
                    autoFocus
                    {...register('fullName', {
                        required: 'Please enter full name',
                    })}
                    />
                    {errors.fullName && (
                    <div className="text-red-500">{errors.fullName.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="address">Address</label>
                    <input
                    className="w-full"
                    id="address"
                    {...register('address', {
                        required: 'Please enter address',
                        minLength: { value: 3, message: 'Address is more than 2 chars' },
                    })}
                    />
                    {errors.address && (
                    <div className="text-red-500">{errors.address.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="city">City</label>
                    <input
                    className="w-full"
                    id="city"
                    {...register('city', {
                        required: 'Please enter city',
                    })}
                    />
                    {errors.city && (
                    <div className="text-red-500 ">{errors.city.message}</div>
                    )}
                </div>
               
                <div className="mb-4">
                    <label htmlFor="usastate">State</label>
                    <input
                    className="w-full"
                    id="usastate"
                    {...register('usastate', {
                        required: 'Please enter usastate',
                    })}
                    />
                    {errors.usastate && (
                    <div className="text-red-500 ">{errors.usastate.message}</div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                    className="w-full"
                    id="postalCode"
                    {...register('postalCode', {
                        required: 'Please enter postal code',
                    })}
                    />
                    {errors.postalCode && (
                    <div className="text-red-500 ">{errors.postalCode.message}</div>
                    )}
                </div>
                <div className="mb-4 flex justify-between">
                    <button className="primary-button">Next</button>
                </div>
            </form>
    </Layout>
  )
}

StoreDataScreen.auth =  true;