import React from 'react'
import { Auth, Chat, Profile } from './pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function App() {

  const user = useSelector((state) => state.auth.user);

  const isAuth = user ? true : false;
  const PrivateRoute = ({children}) => {
    return isAuth ? children : <Navigate to='/auth' />
  }
  const NavigateRoute = ({children}) => {
    return isAuth ? <Navigate to='/chat' /> : children
  }
  return (
    <>
      <Routes>
        <Route path='/chat' element={<PrivateRoute><Chat/></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path='/auth' element={<NavigateRoute><Auth/></NavigateRoute>}  />
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    </>
  )
}
