// App.js
import './App.css';
import Category from './components/Category';
import AddCategory from './components/AddCategory';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayeout';
import Detail from './components/Detail';
import Update from './components/Update';
import Login from './components/Login';
import Signup from './components/Signup';
import{isloading} from '../src/util/Checklogin'

const router = createBrowserRouter([
  { path: '/', element: <Signup />},
  { path: 'signup', element: <Signup /> },
  { path: 'login',  element:  <Login /> },
  {path: 'dashboard',loader:isloading, element: <RootLayout />,children: [
      { path: '', element: <Category /> },
      { path: 'category', element: <Category /> },
      { path: 'add-category', element: <AddCategory /> },
      { path: 'detail/:id', element: <Detail /> },
      { path: 'edit/:id', element: <Update /> }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
