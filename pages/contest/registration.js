import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import { getError } from '../../utils/error';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

export default function RegistrationScreen(props) {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      user: props.id
    }
  });
  const router = useRouter();
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       dispatch({ type: 'FETCH_REQUEST' });
  //       const { data } = await axios.get('/api/product/productlist');
  //       dispatch({ type: 'FETCH_SUCCESS', payload: data });
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
  //     }
  //   };
  //   fetchOrders();
  // }, []);
  //const id = props.id;
  const submitHandler = async ({
    name,
    phone,
    email,
    description,
    imageField,
    user
  }) => {
    try {
      //console.log(description1, productname);
      await axios.post('/api/register/register', {
        name,
        phone,
        email,
        description,
        imageField,
        user
      });
      router.push('/');
      // if (result.error) {
      //   toast.error(result.error);
      // }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const uploadHandler = async (e, imageField = 'imageField') => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const {
        data: { signature, timestamp },
      } = await axios('/api/admin/cloudinary-sign');

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue('imageField', data.secure_url);
      toast.success('File uploaded successfully');
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <h1 className="mb-4 text-xl">Contest Registration</h1>

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
          <input type='hidden' {...register('user')} id='user' />
        <div className="mb-4">
          <label htmlFor="name">name</label>
          <input
            type="text"
            {...register('name', {
              required: 'Please enter name',
            })}
            className="w-full"
            id="name"
            autoFocus
          ></input>
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phone">phone</label>
          <input
            type="phone"
            {...register('phone', { required: 'Please enter phone' })}
            className="w-full"
            id="phone"
          ></input>
          {errors.phone && (
            <div className="text-red-500">{errors.phone.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email">email</label>
          <input
            type="text"
            {...register('email', {
              required: 'Please enter email',
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500"> {errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description">description</label>
          <input
            type="text"
            {...register('description', {
              required: 'Please enter description',
            })}
            className="w-full"
            id="description"
            autoFocus
          ></input>
          {errors.description && (
            <div className="text-red-500"> {errors.description.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="imageField"></label>
          <input
            type="text"
            className="w-full"
            id="imageField"
            hidden={true}
            {...register('imageField', {
              required: 'Please enter imageField',
            })}
          />
          {errors.imageField && (
            <div className="text-red-500">{errors.imageField.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="imageFieldFile">Upload imageField</label>
          <input
            type="file"
            className="w-full"
            id="imageField"
            onChange={uploadHandler}
          />

          {loading && <div>Uploading....</div>}
        </div>

        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
      </form>
    </div>
  );
}
//RegistrationScreen.auth = true;
