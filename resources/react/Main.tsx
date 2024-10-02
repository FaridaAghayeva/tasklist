import { useState, useEffect } from "react";
import { getTasks } from "./utils";
import "react-responsive-modal/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEdit from "./components/ModalEdit";
import ModalDelete from "./components/ModalDelete";
import TaskList from "./components/TaskList";
import SelectProject from "./components/SelectProject";
import AddTaskForm from "./components/AddTaskForm";
import React from "react";

function Main() {
    const [projectId, setProjectId] = useState("");
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [modalEditTask, setModalEditTask] = useState({
        id: "",
        title: "",
        description: "",
    });
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [modalDeleteTaskId, setModalDeleteTaskId] = useState("");
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    useEffect(() => {
        const projectsData = document.getElementById("app")?.getAttribute("data-projects");
        if (projectsData) {
            try {
                const parsedProjects = JSON.parse(projectsData);
                setProjects(parsedProjects);
                console.log(parsedProjects);
            } catch (error) {
                console.error("Failed to parse projects data:", error);
            }
        } else {
            console.error("No projects data found.");
        }
    }, []);

    const reloadTasks = () => {
        getTasks(projectId).then((tasksData) => setTasks(tasksData));
    };

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <ModalEdit
                isModalEditOpen={isModalEditOpen}
                setIsModalEditOpen={setIsModalEditOpen}
                modalEditTask={modalEditTask}
                setModalEditTask={setModalEditTask}
                reloadTasks={reloadTasks}
            />
            <ModalDelete
                isModalDeleteOpen={isModalDeleteOpen}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
                modalDeleteTaskId={modalDeleteTaskId}
                reloadTasks={reloadTasks}
            />
            <div className="left-side">
                {tasks.length > 0 ? (
                    <TaskList
                        tasks={tasks}
                        setIsModalEditOpen={setIsModalEditOpen}
                        setModalEditTask={setModalEditTask}
                        setIsModalDeleteOpen={setIsModalDeleteOpen}
                        setModalDeleteTaskId={setModalDeleteTaskId}
                        projectId={projectId}
                        setTasks={setTasks}
                    />
                ) : (
                    <div className="no-ttasks">
                        {projectId === "" ? (
                            <p>Choose a project to see its tasks.</p>
                        ) : (
                            <p>This project has no tasks.</p>
                        )}
                    </div>
                )}
            </div>
            <div className="right-side">
                <div className="right-side-wrapper">
                    <SelectProject
                        projectId={projectId}
                        projects={projects}
                        setProjectId={setProjectId}
                        setTasks={setTasks}
                    />
                    {projectId === "" ? (
                        <div className="no-project-selected">
                            <p>Please select a project.</p>
                        </div>
                    ) : (
                        <AddTaskForm
                            newTask={newTask}
                            setNewTask={setNewTask}
                            projectId={projectId}
                            reloadTasks={reloadTasks}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;
