import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {user} = useSelector((state) => state.users);
  return (
    <div>
      Heyy {user?.firstName} {user?.lastName} , Welcome to Shey-Tracker
    </div>
  )
}

export default Home