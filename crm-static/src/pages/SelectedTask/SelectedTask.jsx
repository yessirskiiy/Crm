import React, {useEffect} from 'react';
import {selectUser} from "entities/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers} from "entities/user/asyncActions.js";
import ProjectInfo from "widgets/SelectedTaskInfo/ProjectInfo/ProjectInfo.jsx";
import TaskDetails from "widgets/SelectedTaskInfo/TaskDetails/TaskDetails.jsx";
import {useParams} from "react-router-dom";
import {getProject} from "entities/projects/asyncActions.js";
import {selectProjects} from "entities/projects/projectsSlice.js";
import {selectTasks} from "entities/tasks/tasksSlice.js";
import {fetchTask} from "entities/tasks/asyncActions.js";
import {Spin} from "antd";
import TaskInfo from "widgets/SelectedTaskInfo/TaskInfo/TaskInfo.jsx";

import styles from './SelectedTask.module.scss';


const SelectedTask = () => {

    const {users, loading: usersLoading} = useSelector(selectUser);
    const {selectedTask, loading: taskLoading} = useSelector(selectTasks);
    const {project, loading: projectLoading} = useSelector(selectProjects);
    const dispatch = useDispatch()
    const {TaskId, Code} = useParams()

    const getAuthor = (created_by) => {
        return users?.find(user => Number(user.id) === created_by)
    }


    useEffect(() => {
        if (!users.length) {
            dispatch(fetchAllUsers());
        }
        if (Code) {
            dispatch(getProject(Code));
        }
        dispatch(fetchTask({Code, TaskId}))
    }, [dispatch, TaskId])

    if (usersLoading === 'loading' || taskLoading === 'loading' || projectLoading === 'loading') {
        return <Spin>Loading...</Spin>;
    }


    return (
        <div className={styles.selectedTaskContainer}>
            <div className={styles.mainContent}>
                <ProjectInfo {...project} getAuthor={getAuthor}/>
                <TaskDetails {...selectedTask}/>
                <TaskInfo {...selectedTask} getAuthor={getAuthor}/>
            </div>
        </div>
    );
};

export default SelectedTask;