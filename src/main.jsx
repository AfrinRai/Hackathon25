import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import Home from './Home/Home';
import Job from './Job/Job';

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root></Root>,
        children: [
          {
            path:"/",
          element: <Home></Home>
          },
          {
            path: '/job',
            element: <Job></Job>,
          },
        ]
    },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
