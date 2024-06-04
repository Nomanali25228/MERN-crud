import axios from 'axios';
import React, { useState } from 'react';
import imglogo from '../assets/dummy.jpg';
import loder from '../assets/gifloader.gif';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const [category, setCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(imglogo);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');

    let navigate = useNavigate();

    const fileHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setImgUrl(URL.createObjectURL(e.target.files[0]));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', category);
        formData.append('photo', selectedFile);

        axios.post('https://login-api-tan.vercel.app/category', formData, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res);
                setLoading(false);
                navigate('/dashboard/category');
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
                setHasError(true);
                setError(err.message);
            });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
            {loading && (
                <div>
                    <img style={{ width: '150px' }} src={loder} alt="Loading" />
                </div>
            )}

            {!loading && (
                <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold mb-4">Add New Category</h1>
                    <form onSubmit={submitHandler} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            required
                            value={category.name}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Category name"
                            className="px-4 py-2 bg-gray-700 rounded"
                        />
                        <input
                            type="file"
                            onChange={fileHandler}
                            className="hidden"
                            id="fileInput"
                        />
                        <label
                            htmlFor="fileInput"
                            className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                        >
                            Select Image
                        </label>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                        <img style={{ width: '100px' }} src={imgUrl} alt="Selected" className="rounded" />
                    </form>
                </div>
            )}

            {hasError && (
                <div>
                    <p style={{ color: 'red' }}>err:{error}</p>
                </div>
            )}
        </div>
    );
};

export default AddCategory;
