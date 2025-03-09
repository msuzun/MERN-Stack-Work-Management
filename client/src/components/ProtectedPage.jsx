import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetLoggedInUser } from '../apicalls/users';
import { App, message as antdMessage } from "antd"
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { SetLoading } from '../redux/loadersSlice';

function ProtectedPage({ children }) {
    const [messageApi, contextHolder] = antdMessage.useMessage();
    const navigate = useNavigate();
    const dispacth = useDispatch();
    const { user } = useSelector((state) => state.users);
    const getUser = async () => {
        try {
            dispacth(SetLoading(true));
            const response = await GetLoggedInUser();
            dispacth(SetLoading(false));
            if (response.success) {
                dispacth(SetUser(response.data));
            }
            else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispacth(SetLoading(false));
            messageApi.error(error.message);
            localStorage.removeItem("token")
            navigate('/login');
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUser();
        }
        else {
            navigate("/login");
        }
    }, [])
    return (
        <App>
            {contextHolder}
            <div className="min-h-screen flex flex-col">
                <header className="flex justify-between items-center bg-primary text-white m-px-5 m-py-4">
                    <h1 className="text-2xl font-bold ml-5 cursor-pointer" onClick={() => {
                        navigate("/")
                    }}>SHEY-TRACKER</h1>
                    <div className="flex items-center bg-white text-primary rounded shadow mr-5 mb-5 mt-5">
                        <span className="mr-2 ml-2 mt-2 mb-2 cursor-pointer underline" onClick={() => {
                            navigate("/profile")
                        }}>{user?.firstName}</span>
                        <i className="ri-notification-line text-xl bg-gray-300  p-2 rounded-full cursor-pointer" onClick={() => {

                        }}></i>
                        <i className="ri-logout-box-line text-xl ml-5 mr-5 cursor-pointer" onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}></i>
                    </div>
                </header>
                <main className="flex-grow p-5">
                    <div className='ml-5 mt-2'>
                        {children}
                    </div>

                </main>
            </div>
        </App>

    )
}

export default ProtectedPage