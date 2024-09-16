import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Auth, Chat, Profile } from './pages'
import { Navigate, Route, Routes } from 'react-router-dom'


export default function App() {

  const { colorMode, toggleColorMode } = useColorMode()

  const bg = useColorModeValue('red.500','red.100')
  const color = useColorModeValue('white', 'black')
  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}  />
        <Route path='/chat' element={<Chat/>}  />
        <Route path='/profile' element={<Profile/>}  />
        <Route path='*' element={<Navigate to='/auth' />} />
      </Routes>
    </>
  )
}
