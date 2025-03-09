import { Button } from 'antd'
import React, { useState } from 'react'
import ProjectForm from './ProjectForm'

const Projects = () => {
    const [show,setShow] = useState(false)
  return (
   <div>
    <div className='flex justify-end mr-5'>
        <Button type="default" onClick={()=>setShow(true)}>Add Projects</Button>
    </div>

    {show && <ProjectForm show={show} setShow={setShow} reloadData={()=>{}}/>}
   </div>
  )
}

export default Projects