import { apiRequest } from './index.jsx';

export const CreateProject = async (project) => apiRequest("post", "/api/projects/create-project",project);

export const GetAllProjects = async (filter) => apiRequest("post","api/projects/get-all-projects",filter);

export const EditProject = async(project) => apiRequest("post", "/api/projects/edit-project",project);

export const DeleteProject = async (id) => apiRequest("post","api/projects/delete-project",{_id:id});