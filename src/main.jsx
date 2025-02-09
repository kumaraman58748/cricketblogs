import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Drafts from './pages/Drafts.jsx'
import AddPost from './pages/AddPost.jsx'
import  AuthLayout from './components/AuthLayout.jsx'
import EditPost from './pages/EditPost.jsx'
import ViewPost from './pages/ViewPost.jsx'
import Verify from './pages/Verify.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },{
        path:"/Verify",
        element:<Verify/>
      },{
        path:"/drafts",
        element:(
          <AuthLayout authentication>
            <Drafts/>
          </AuthLayout>
         
        )
      },{
        path:"/addpost",
        element:(
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
        )
      },{
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      }, {
        path: "/post/:slug",
        element: <ViewPost />,
      },{
        path:"drafts/post/:slug",
        element:<ViewPost/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>

    </Provider>
  </React.StrictMode>,
)



// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import "./index.css";

// import { Provider } from 'react-redux'
// import store from './store/store.js'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import { AuthLayout } from './component/index.js'
// import Login from './component/Login.jsx'
// import Signup from './component/Signup.jsx'
// import Allpost from './pages/Allpost.jsx'
// import Addpost from './pages/Addpost.jsx'
// import Editpost from './pages/Editpost.jsx'
// import Post from './pages/Post.jsx'
// import Home from './pages/Home.jsx'
// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<App/>,
//     children:[
//       {
//         path:'/',
//         element:<Home/>
//       },{
//         path:'/login',
//         element:(
//           <AuthLayout authentication={false}>
//             <Login/>
//           </AuthLayout>
//         )
//       },{
//         path:"/signup",
//         element:(
//           <AuthLayout authentication={false}>
//             <Signup/>
//           </AuthLayout>
//         )
//       },{
//         path:"/all-posts",
//         element:(
//           <AuthLayout authentication>
//             {" "}
//             <Allpost/>
//           </AuthLayout>
//         )
//       },{
//         path:"/add-post",
//         element:(
//           <AuthLayout authentication>
//             {" "}
//             <Addpost/>
//           </AuthLayout>
//         )
//       },{
//         path:"/edit-post/:slug",
//         element:(
//           <AuthLayout authentication>
//             {" "}
//             <Editpost/>
//           </AuthLayout>
//         )
//       },{
//         path:"/post/:slug",
//         element:<Post/>
//       }
//     ]
//   }
// ])
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//        <RouterProvider router={router}/>
//     </Provider>
//   </React.StrictMode>,
// )

