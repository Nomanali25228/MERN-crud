import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MianNav = () => {
  let navigate = useNavigate();
  const logouthendler = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <nav className="bg-gray-900 border-b-4 border-blue-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link 
            to='/dashboard/category' 
            className="text-blue-400 hover:text-blue-500 transition-all duration-200"
          >
            Category List
          </Link>
          <Link 
            to='/dashboard/add-category' 
            className="text-blue-400 hover:text-blue-500 transition-all duration-200"
          >
            Add New Category
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">
          <div className="flex items-center">
            <p className="font-semibold">Hello, {localStorage.getItem('username')}</p>
          </div>
          <button 
            onClick={logouthendler} 
            className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default MianNav;
