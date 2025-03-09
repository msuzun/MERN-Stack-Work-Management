import { Button, message, Table,App, message as antdMessage  } from 'antd'
import React, { useEffect, useState } from 'react'
import ProjectForm from './ProjectForm'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { GetAllProjects } from '../../../apicalls/projects';
import { getDateFormat } from '../../../utils/helpers';

const Projects = () => {
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllProjects({owner:user._id});
      dispatch(SetLoading(false));
      if (response.success) {
        setProjects(response.data);
      }
      else{
        messageApi.error(error.message);
        throw new Error(response.error);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      messageApi.error(error.message);
    }
  }
  useEffect(()=>{
    if(user && user._id)
    getData();
  },[user]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render:(text) => getDateFormat(text)
    },{
      title:"Action",
      dataIndex:"action",
      render:(text,record)=>{
        return (
          <div className='flex gap-4'>
            <i class="ri-pencil-line"></i>
            <i class="ri-delete-bin-6-line"></i>
          </div>
        )
      }
    }
  ]
  return (
    <App>
      {contextHolder}
      <div className='flex justify-end mr-5'>
        <Button type="default" onClick={() => setShow(true)}>Add Projects</Button>
      </div>
      <Table columns={columns} dataSource={projects} className='mt-4'/>
      {show && <ProjectForm show={show} setShow={setShow} reloadData={() => {getData()}} />}
    </App>
  )
}

export default Projects