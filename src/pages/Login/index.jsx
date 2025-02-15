import React from 'react'
import { Form, Input, Button } from "antd"
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'
const Login = () => {
  const onFinish = (values)=>{
    console.log("Success: ",values);
  }
  return (
    <div className='grid grid-cols-2'>
      <div className='bg-primary h-screen'>

      </div>
      <div className='flex justify-center items-center'>
        <div className='w-[420px]'>
          <h1 className='text-2xl text-gray-700'>LOGIN TO YOUR ACCOUNT</h1>
          <Divider/>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type='password'/>
            </Form.Item>
            <Button type='primary' htmlType='submit' block>Login</Button>
            <div className="flex justify-center mt-5">
              <span>
                Don't have an account? <Link to='/register'>Register</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login