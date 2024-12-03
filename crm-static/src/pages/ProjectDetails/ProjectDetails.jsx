import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers} from "entities/user/asyncActions.js";
import {selectUser} from "entities/user/userSlice.js";
import FilterTasks from "widgets/FilterTasks/FilterTasks.jsx";
import Task from "widgets/Task/Task.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useModal} from "shared/MyModal/ModalContext.jsx";
import TaskModal from "widgets/TaskModal/TaskModal.jsx";
import {createTask, fetchTasksByProject} from "entities/tasks/asyncActions.js";
import {selectTasks} from "entities/tasks/tasksSlice.js";
import styles from './ProjectDetails.module.scss'


const ProjectDetails = () => {

    const {Code} = useParams()
    const [filterPriority, setFilterPriority] = useState({Major: false, Minor: false});
    const [filterStatus, setFilterStatus] = useState({
        'completed': false,
        'in progress': false,
        'open': false,
        'on hold': false
    });
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: '',
        due_date: '',
    })

    const dispatch = useDispatch()
    const {users} = useSelector(selectUser)
    const {tasks} = useSelector(selectTasks)

    const navigate = useNavigate()
    const {modalOpen, setModalOpen} = useModal()
    const onClickTask = (id) => {
        navigate(`task/${id}`)
    }

    useEffect(() => {
        dispatch(fetchAllUsers())
        dispatch(fetchTasksByProject(Code))
    }, [Code, dispatch])


    const getAssigneeDetails = (assignedToId) => {
        return users.find(user => Number(user.id) === assignedToId);
    }

    const filteredTasks = tasks.filter(task => {
        const priorityFilterActive = Object.values(filterPriority).some(val => val);
        const statusFilterActive = Object.values(filterStatus).some(val => val);
        return (
            (!priorityFilterActive || filterPriority[task.Priority]) &&
            (!statusFilterActive || filterStatus[task.Status])
        );
    });

    const writeTask = () => {
        dispatch(createTask({Code, newTask}))
        setModalOpen(false)
    }


    return (
        <div className={styles.projectDetailsContainer}>
            <div className={styles.headerContainer}>
                <FilterTasks
                    filterPriority={filterPriority}
                    setFilterPriority={setFilterPriority}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                />
            </div>
            <div className={styles.tasksContainer}>
                <div className={styles.taskHeader}>
                    <span>Active Tasks</span>
                </div>
                <div className={styles.taskListScrollable}>
                    {filteredTasks.map(task => (
                            <Task {...task}
                                  key={task.TaskId}
                                  getAssigneeDetails={getAssigneeDetails}
                                  onClickTask={onClickTask}
                            />
                        )
                    )}
                </div>
            </div>
            {modalOpen && <TaskModal
                setNewTask={setNewTask}
                newTask={newTask}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                writeTask={writeTask}
            />
            }
        </div>
    );
};

export default ProjectDetails;