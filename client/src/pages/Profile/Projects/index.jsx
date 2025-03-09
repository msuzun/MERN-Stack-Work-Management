import { Button, message, Table, App, message as antdMessage } from 'antd'
import React, { useEffect, useState } from 'react'
import ProjectForm from './ProjectForm'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { DeleteProject, GetAllProjects } from '../../../apicalls/projects';
import { getDateFormat } from '../../../utils/helpers';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllProjects({ owner: user._id });
      dispatch(SetLoading(false));
      if (response.success) {
        setProjects(response.data);
      }
      else {
        messageApi.error(error.message);
        throw new Error(response.error);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      messageApi.error(error.message);
    }
  }
  useEffect(() => {
    if (user && user._id)
      getData();
  }, [user]);
  const onDelete = async (id) =>{
    try {
      dispatch(SetLoading(true));
      const response = await DeleteProject(id);
      if(response.success){
        messageApi.success(response.message);
        getData();
      }
      else{
        throw new Error(response.error);
      }
    } catch (error) {
      messageApi.error(error.message);
      dispatch(SetLoading(false));
    }
  }
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
      render:(text)=>text.toUpperCase()
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text)
    }, {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className='flex gap-4'>
            <i class="ri-pencil-line" onClick={() => {
              setSelectedProject(record);
              setShow(true);
            }}></i>
            <i class="ri-delete-bin-6-line" onClick={()=> onDelete(record._id)}></i>
          </div>
        )
      }
    }
  ]
  return (
    <App>
      {contextHolder}
      <div className='flex justify-end mr-5'>
        <Button type="default" onClick={() => {
          setSelectedProject(null)
          setShow(true)  
        }}>Add Projects</Button>
      </div>
      <Table columns={columns} dataSource={projects} className='mt-4' />
      {show && <ProjectForm show={show} setShow={setShow} reloadData={() => { getData() }} project={selectedProject} />}
    </App>
  )
}

export default Projects