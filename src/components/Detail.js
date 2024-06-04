import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loder from '../assets/gifloader.gif';
import { useParams, useNavigate } from 'react-router-dom';

const Detail = () => {
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false);
    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://login-api-tan.vercel.app/category/${params.id}`)
            .then(res => {
                setLoading(false);
                setCategory(res.data.category);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });

    }, [params.id]);

    const handleCancel = () => {
        navigate('/dashboard/category');
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
            {loading && (
                <div>
                    <img style={{ width: '150px' }} src={loder} alt="Loading" />
                </div>
            )}
            {!loading && (
                <div className="bg-gray-800 p-8 rounded-lg shadow-md text-center">
                    <div className="w-64 h-64 flex items-center justify-center overflow-hidden mb-4">
                        <img src={category.photo} alt="" className="object-contain w-full h-full" />
                    </div>
                    <h1 className="text-2xl font-semibold mb-4">{category.name}</h1>
                    <button 
                        onClick={handleCancel} 
                        className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all duration-200"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export default Detail;
