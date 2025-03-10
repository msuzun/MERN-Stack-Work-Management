import { Form, Input, Modal,App, message as antdMessage } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { CreateProject, EditProject } from '../../../apicalls/projects';
const ProjectForm = ({
    show,
    setShow,
    reloadData,
    project
}) => {
    const formRef = useRef(null);
    const { user } = useSelector(state => state.users);
    const [messageApi, contextHolder] = antdMessage.useMessage();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            let response = null;
            dispatch(SetLoading(true))
            if (project) {
                //edit project
                values._id = project._id;
                response = await EditProject(values);
            }
            else {
                //create project
                values.owner = user._id;
                values.members = [{
                    user: user._id,
                    role: "owner"
                }];
                response = await CreateProject(values);
            }
            dispatch(SetLoading(false));
            if (response.success) {
                await messageApi.success(response.message);
                reloadData();
                setShow(false); 
            }
            else {
                throw new Error(response.error);
            }
            
        } catch (error) {
            dispatch(SetLoading(false));
            messageApi.error(error.message);
        }
    }
    return (
        <App>
            {contextHolder}
            <Modal title={project ? "Edit Project": "Add Project"} open={show} onCancel={() => setShow(false)} centered width={700} onOk={() => { formRef.current.submit() }} okText="Save">
                <Form layout='vertical' ref={formRef} onFinish={onFinish} initialValues={project}>
                    <Form.Item label="Project Name" name="name">
                        <Input placeholder='Project Name' />
                    </Form.Item>
                    <Form.Item label="Project Description" name="description">
                        <TextArea placeholder='Project Description' />
                    </Form.Item>
                </Form>
            </Modal>
        </App>

    )
}

export default ProjectForm