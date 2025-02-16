import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetLoggedInUser } from '../apicalls/users';
import { App, message as antdMessage } from "antd"

function ProtectedPage({ children }) {
    const [messageApi, contextHolder] = antdMessage.useMessage();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const getUser = async () => {
        try {
            const response = await GetLoggedInUser();
            console.log(response);
            if (response.success) {
                console.log(response);
                setUser(response.data);
            }
            else {
                throw new Error(response.message);
            }
        } catch (error) {
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
            <div>
                <h1>ProtectedPage</h1>
                <h1>Welcome {user?.firstName} {user?.lastName}</h1>
                {children}
            </div>
        </App>

    )
}

export default ProtectedPage