import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loder from '../assets/gifloader.gif';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const detail = (id) => {
    navigate('/dashboard/detail/' + id);
  }

  const edite = (id) => {
    navigate('/dashboard/edit/' + id);
  }

  const delet = (id, imglink) => {
    if (window.confirm('Are you sure?')) {
      axios.delete(`https://login-api-tan.vercel.app/category?id=${id}&imageUrl=${imglink}`)
        .then(res => {
          console.log(res);
          window.alert('Data deleted');
          getdata();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  const getdata = () => {
    axios.get('https://login-api-tan.vercel.app/category', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        setLoading(false);
        setCategory(res.data.category);
      })
      .catch(err => {
        setLoading(false);
        setHasError(true);
        setError(err.response.data.msg);
      });
  }

  useEffect(() => {
    setLoading(true);
    getdata();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center min-h-screen bg-[#25282c]">
          <img style={{ width: '150px' }} src={loder} alt="Loading" />
        </div>
      )}
      {!loading && (
        <div className="flex items-center justify-center min-h-screen px-4 bg-[#25282c] text-white">
          <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-2xl border-[4px] border-blue-900 hover:border-blue-500 transition-all duration-200">
            <h1 className="text-2xl font-semibold text-center mb-6">Category List</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 text-white rounded-md overflow-hidden">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-700">No</th>
                    <th className="py-2 px-4 border-b border-gray-700">Name</th>
                    <th className="py-2 px-4 border-b border-gray-700">Image</th>
                    <th className="py-2 px-4 border-b border-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((data, index) => (
                    <Row key={data._id} index={index + 1} detailReq={detail} editeReq={edite} deletReq={delet} detail={data} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {hasError && (
        <div className="flex items-center justify-center min-h-screen bg-[#25282c] text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
    </>
  );
}
const Row = (props) => {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-200">
      <td className="py-2 px-4 text-center">{props.index}</td>
      <td className="py-2 px-4 text-center">{props.detail.name}</td>
      <td className="py-2 px-4 text-center">
        <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
          <img 
            src={props.detail.photo} 
            className="object-cover max-w-full max-h-full rounded" 
            alt={props.detail.name} 
          />
        </div>
      </td>
      <td className="py-2 px-4 text-center space-x-2">
        <button onClick={() => { props.detailReq(props.detail._id) }} className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded transition-all duration-200">Detail</button>
        <button onClick={() => { props.editeReq(props.detail._id) }} className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded transition-all duration-200">Edit</button>
        <button onClick={() => { props.deletReq(props.detail._id, props.detail.photo) }} className="bg-red-700 hover:bg-red-500 text-white font-bold py-1 px-2 rounded transition-all duration-200">Delete</button>
      </td>
    </tr>
  );
}

export default Category;
