import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Link from 'next/link';
import Layout from '../../../components/layout';
import { getError } from '../../../utils/error';
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

export default function AdminProductScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/campaign/campaignhistory');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  const submitHandler = async ({
    campaignname,
    period,
    reach,
    visit,
    imageField,
  }) => {
    try {
      await axios.post('/api/campaign/campaignregister', {
        campaignname,
        period,
        reach,
        visit,
        imageField,
      });
      router.push('/campaignhistory');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      await axios.delete(`/api/admin/products/${productId}`);

      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  const uploadHandler = async (e, imageField = 'image') => {
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
    <Layout title="Campaign History">
      <h1 className="mb-4 text-xl">Campaign Registration</h1>

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-4">
          <label htmlFor="campaignname">campaignname</label>
          <input
            type="text"
            {...register('campaignname', {
              required: 'Please enter campaignname',
            })}
            className="w-full"
            id="campaignname"
            autoFocus
          ></input>
          {errors.campaignname && (
            <div className="text-red-500">{errors.campaignname.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="period">period</label>
          <input
            type="period"
            {...register('period', { required: 'Please enter period' })}
            className="w-full"
            id="period"
          ></input>
          {errors.period && (
            <div className="text-red-500">{errors.period.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="reach">reach</label>
          <input
            type="text"
            {...register('reach', {
              required: 'Please enter reach',
            })}
            className="w-full"
            id="reach"
            autoFocus
          ></input>
          {errors.reach && (
            <div className="text-red-500"> {errors.reach.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="visit">visit</label>
          <input
            type="text"
            {...register('visit', {
              required: 'Please enter visit',
            })}
            className="w-full"
            id="visit"
            autoFocus
          ></input>
          {errors.visit && (
            <div className="text-red-500"> {errors.visit.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="image"></label>
          <input
            type="text"
            className="w-full"
            id="imageField"
            hidden={true}
            {...register('imageField', {
              required: 'Please enter image',
            })}
          />
          {errors.imageField && (
            <div className="text-red-500">{errors.imageField.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="imageFile">Upload image</label>
          <input
            type="file"
            className="w-full"
            id="imageFile"
            onChange={uploadHandler}
          />

          {loading && <div>Uploading....</div>}
        </div>

        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
      </form>

      <h1 className="mb-4 text-xl">Product List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr className="px-5 text-left">
                <td className="p-5 ">Product Name</td>
                <td className="p-5 text-left">Price</td>
                <td className="p-5 text-left">Description</td>
                <td className="p-5 text-left">Description2</td>
                <td className="p-5 text-left">Image</td>
                <td className="p-5 text-left">ACTION</td>
              </tr>
            </thead>
            {products.map((order) => (
              <tbody key={order._id}>
                <tr className="border-b">
                  <td className="p-5 ">{order.campaignname}</td>
                  <td className=" p-5 ">{order.period}</td>
                  <td className=" p-5 ">{order.reach}</td>
                  <td className=" p-5 ">{order.visit}</td>
                  <td className=" p-5 ">
                    <Image
                      src={order.content}
                      alt={order.campaignname}
                      width={150}
                      height={150}
                    />
                  </td>
                  <td className=" p-5 ">
                    <Link href={`/admin/userproducts/${order._id}`}>
                      <div type="button" className="default-button">
                        Edit
                      </div>
                    </Link>
                    &nbsp;
                  </td>
                  <td className="p-5">
                    <div>
                      <button
                        onClick={() => deleteHandler(order._id)}
                        className="default-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </Layout>
  );
}
AdminProductScreen.auth = {adminOnly: true};
