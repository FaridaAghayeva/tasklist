import axios from 'axios';
// import axiosConfig from './axiosConfig';
import { toast } from 'react-toastify';

export const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error)
}
const axiosConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000', 
});
export const getTasks = async (projectId: any) => {
    if (!projectId) {
        toast.error("Project is required!");
        return;
    }

    try {
        const response = await axiosConfig.get(`api/tasks?project_id=${projectId}`);
        const { success, tasks, message } = response.data;

        if (success) {
            return tasks;
        } else {
            toast.error(message);
            return [];
        }
    } catch (err) {
        toast.error(getErrorMessage(err));
        return [];
    }
}

export const reorderTasks = async (projectId: any, start: any, end: any) => {
    try {
        const response = await axiosConfig.put('/tasks', {
            project_id: projectId,
            start,
            end,
        });
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}

export const editTask = async (task: { id: any; title: any; description: any; }) => {
    if (!task.id) return;
    if (!task.title) {
        toast.error("Title is required!");
        return;
    }

    try {
        // const response =  axios.create({
        //     baseURL: 'http://127.0.0.1:8000/api', // Replace with your actual base URL

        // });

        const response = await axiosConfig.put(`api/tasks/${task.id}`, {
            title: task.title,
            description: task.description,
        });
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}

export const deleteTask = async (id: any) => {
    if (!id) {
        toast.error("Invalid task!");
        return;
    }

    try {
        const response = await axiosConfig.delete(`/tasks/${id}`);
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}

export const createTask = async (task, projectId) => {
    if (!projectId) {
        toast.error("Project is required!");
        return;
    }
    if (!task.title) {
        toast.error("Title is required!");
        return;
    }

    try {
        const response = await axiosConfig.post(`/tasks?project_id=${projectId}`, {
            title: task.title,
            description: task.description,
        });
        const { success, message } = response.data;

        toast[success ? 'success' : 'error'](message);
    } catch (err) {
        toast.error(getErrorMessage(err));
    }
}