import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllProjectsByRole } from '../../apicalls/projects';
import { SetLoading } from '../../redux/loadersSlice';
import { message } from 'antd';
const Home = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllProjectsByRole();
      dispatch(SetLoading(false));
      if (response.success) {
        setProjects(response.data);
      }
      else {
        throw new Error(response.error);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  }
  useEffect(()=>{

  },[])
  return (
    <div>
      Heyy {user?.firstName} {user?.lastName} , Welcome to Shey-Tracker
    </div>
  )
}

export default Home