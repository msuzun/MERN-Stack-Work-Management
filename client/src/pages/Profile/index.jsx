import React from 'react'
import {Tabs} from 'antd'
import Projects from './Projects'
function Profile() {
  const items = [
    {
      key: '1',
      label: 'Projects',
      children: <Projects/>,
    },
    {
      key: '2',
      label: 'General',
      children: 'General',
    }
  ];
  
  return (
    <Tabs defaultActiveKey='1' items={items}/>
  )
}

export default Profile