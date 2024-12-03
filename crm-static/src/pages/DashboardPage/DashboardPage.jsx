import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {Avatar, Tag} from 'antd';
import {selectProjects} from 'entities/projects/projectsSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProjects} from 'entities/projects/asyncActions.js';
import {fetchTasksByProject, updateTaskStatus} from 'entities/tasks/asyncActions.js';
import {selectTasks} from 'entities/tasks/tasksSlice.js';
import {formattedDate} from "shared/utils/utils.jsx";
import {selectUser} from "entities/user/userSlice.js";
import {fetchAllUsers} from "entities/user/asyncActions.js";
import styles from './DashboardPage.module.scss';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const {projects} = useSelector(selectProjects);
    const {users} = useSelector(selectUser);
    const {tasks} = useSelector(selectTasks);
    const [myTasks, setMyTasks] = useState({
        'open': [],
        'in progress': [],
        'on hold': [],
        'completed': []
    });


    const getAssigneeDetails = (assignedToId) => {
        return users.find(user => Number(user.id) === assignedToId);
    };


    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchAllUsers());
    }, [dispatch]);


    useEffect(() => {
        if (tasks) {
            const newTasks = {
                'open': tasks.filter(task => task.Status.toLowerCase() === 'open') || [],
                'in progress': tasks.filter(task => task.Status.toLowerCase() === 'in progress') || [],
                'on hold': tasks.filter(task => task.Status.toLowerCase() === 'on hold') || [],
                'completed': tasks.filter(task => task.Status.toLowerCase() === 'completed') || []
            };
            setMyTasks(newTasks);
        }
    }, [tasks]);

    let projectCode

    const getTasksByProject = (Code) => {
        projectCode = Code
        dispatch(fetchTasksByProject(Code));
    };

    const onDragEnd = (result) => {
        const {source, destination} = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceTasks = Array.from(myTasks[source.droppableId]);
        const destinationTasks = Array.from(myTasks[destination.droppableId]);

        const removedTask = {...sourceTasks[source.index]};


        sourceTasks.splice(source.index, 1);


        removedTask.Status = destination.droppableId;
        destinationTasks.splice(destination.index, 0, removedTask);


        setMyTasks({
            ...myTasks,
            [source.droppableId]: sourceTasks,
            [destination.droppableId]: destinationTasks,
        });

        dispatch(updateTaskStatus({TaskId: removedTask.TaskId, Status: removedTask.Status, Code: projectCode}));
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.sidebar}>
                <h3>Current Projects</h3>
                <ul className={styles.projectsList}>
                    {projects.map((project) => (
                        <div
                            key={project.Id}
                            className={styles.projectItem}
                            onClick={() => getTasksByProject(project.Code)}
                        >
                            <div className={styles.viewDetails}>
                                <span>{project.Name}</span>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
            <div className={styles.tasksWrapper}>
                <h2>Tasks</h2>
                <div className={styles.tasksHeader}></div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className={styles.columnsContainer}>
                        {Object.entries(myTasks).map(([columnId, columnTasks]) => (
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided) => (
                                    <div
                                        key={columnId}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={styles.taskColumn}
                                    >
                                        <h4 className={styles.columnHeader}>{columnId}</h4>
                                        {Array.isArray(columnTasks) && columnTasks.length > 0 ? (
                                            columnTasks.map((task, index) => (
                                                <Draggable key={task.TaskId} draggableId={task.TaskId} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={styles.taskCard}
                                                        >
                                                            <div className={styles.taskDetails}>
                                                                <Avatar
                                                                    src={getAssigneeDetails(task.assigned_to)?.avatar_url}
                                                                />
                                                                <div className={styles.assigneeName}>
                                                                    {getAssigneeDetails(task.assigned_to)?.name}
                                                                </div>
                                                            </div>
                                                            <div className={styles.taskTitle}>{task.Title}</div>
                                                            <Tag color="orange">{formattedDate(task.due_date)}</Tag>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        ) : (
                                            <div className={styles.noTasksPlaceholder}>
                                                No tasks available
                                            </div>
                                        )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default DashboardPage;
