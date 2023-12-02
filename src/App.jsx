import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout/Layout';
import Register from './component/Register/Register';
import SignIn from './component/SignIn/SignIn';
import Notes from './component/Notes/Notes';
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes';


function App() {
  const routes = createBrowserRouter([
    {path:'/',element: <Layout/>,children:[
      {index:true,element:<Register/>},
      {path:'/register',element:<Register/>},
      {path:'/signin',element:<SignIn/>},
      {path:'/notes',element:<ProtectedRoutes><Notes/></ProtectedRoutes>}
    ]}
  ])

  return (
    <>
   <RouterProvider router={routes}/>
    </>
  );
}

export default App;
