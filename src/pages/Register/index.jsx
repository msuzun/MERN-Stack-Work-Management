import React from 'react'
import { Form, Input, Button, App, message as antdMessage } from "antd"
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'
import { RegisterUser } from '../../apicalls/users'

const Register = () => {
  const [messageApi, contextHolder] = antdMessage.useMessage();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        messageApi.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      messageApi.error(error.message);
    }
  };

  return (
    <App>
      {contextHolder}
      <div className='grid grid-cols-2'>
        <div className='bg-primary h-screen flex flex-col justify-center items-center'>
          <div>
            <h1 className="text-7xl text-white">SHEY-TRACKER</h1>
            <span className='text-white mt-5'>
              One place to track all your business records
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className='w-[420px]'>
            <h1 className='text-2xl text-gray-700 uppercase'>LETS GET YOU STARTED</h1>
            <Divider />
            <Form layout='vertical' onFinish={onFinish}>
              <Form.Item label="First Name" name="firstName">
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type='password' />
              </Form.Item>
              <Button type='primary' htmlType='submit' block>Register</Button>
              <div className="flex justify-center mt-5">
                <span>
                  Already have an account? <Link to='/login'>Login</Link>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </App>
  );
};

export default Register;
