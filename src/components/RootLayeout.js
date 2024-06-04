import React from 'react'
import MianNav from './MianNav'
import { Outlet } from 'react-router-dom'

const RootLayeout = () => {
  return (
    <>
    <MianNav/>
    <Outlet/>
        
    </>
  )
}

export default RootLayeout