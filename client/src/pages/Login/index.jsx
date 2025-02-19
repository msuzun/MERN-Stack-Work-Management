import React, { useEffect } from 'react'
import { Form, Input, Button, App, message as antdMessage } from "antd"
import { Link, useNavigate } from 'react-router-dom'
import Divider from '../../components/Divider'
import { LoginUser } from '../../apicalls/users'
import { useDispatch, useSelector } from 'react-redux'
import { SetButtonLoading } from '../../redux/loadersSlice'
const Login = () => {
  const { loading, buttonLoading } = useSelector((state) => state.loaders);
  console.log(buttonLoading)
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const onFinish = async (values) => {
    try {
      dispacth(SetButtonLoading(true));
      const response = await LoginUser(values);
      dispacth(SetButtonLoading(false));
      if (response.success) {
        localStorage.setItem("token", response.data)
        messageApi.success(response.message);
        navigate("/");
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispacth(SetButtonLoading(false));
      messageApi.error(error.message);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <App>
      {contextHolder}
      <div className='grid grid-cols-2'>
        <div className='bg-primary h-screen flex flex-col justify-center items-center'>
          <div>
            <h1 className="text-7xl text-white">
              SHEY-TRACKER
            </h1>
            <span className='text-white mt-5'>
              One place to track all your business records
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className='w-[420px]'>
            <h1 className='text-2xl text-gray-700'>LOGIN TO YOUR ACCOUNT</h1>
            <Divider />
            <Form layout='vertical' onFinish={onFinish}>
              <Form.Item label="Email" name="email" rules={[{required:true,message:"Required"}]}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{required:true,message:"Required"}]}>
                <Input type='password' />
              </Form.Item>
              <Button type='primary' htmlType='submit' block loading={buttonLoading}>{buttonLoading ? "Loading": "Login"}</Button>
              <div className="flex justify-center mt-5">
                <span>
                  Don't have an account? <Link to='/register'>Register</Link>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </App>

  )
}

export default Login