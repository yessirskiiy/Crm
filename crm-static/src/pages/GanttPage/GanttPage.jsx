import React, {useEffect, useState} from 'react';
import {Gantt, ViewMode} from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTasksByProject} from 'entities/tasks/asyncActions.js';
import {fetchProjects} from 'entities/projects/asyncActions.js';
import {selectProjects} from 'entities/projects/projectsSlice.js';
import {selectTasks} from 'entities/tasks/tasksSlice.js';
import {Select, Spin} from 'antd';

import styles from './GanttPage.module.scss';

const {Option} = Select;

const GanttPage = () => {
    const dispatch = useDispatch();
    const {projects, loading: projectsLoading} = useSelector(selectProjects);
    const {tasks, loading: tasksLoading} = useSelector(selectTasks);
    const [selectedProjectCode, setSelectedProjectCode] = useState(null);
    const [ganttTasks, setGanttTasks] = useState([]);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    useEffect(() => {
        if (selectedProjectCode) {
            dispatch(fetchTasksByProject(selectedProjectCode));
        }
    }, [dispatch, selectedProjectCode]);

    const prepareGanttData = (tasks) => {
        return tasks.map(task => ({
            id: task.TaskId,
            name: task.Title,
            start: new Date(task.CreatedAt),
            end: new Date(task.due_date),
            type: "task",
            progress: Math.round(Math.min((task.time_spent / 720) * 100, 100))
        }));
    };

    useEffect(() => {
        if (tasks && Array.isArray(tasks)) {
            const newGanttTasks = prepareGanttData(tasks);
            setGanttTasks(newGanttTasks);
        }
    }, [tasks]);

    const handleProjectChange = (value) => {
        setSelectedProjectCode(value);
    };

    return (
        <div className={styles.ganttPage}>
            <h2>Project Gantt Chart</h2>
            <div className={styles.projectSelector}>
                <Select
                    placeholder="Select a project"
                    style={{width: 300}}
                    onChange={handleProjectChange}
                    loading={projectsLoading === 'loading'}
                >
                    {projects.map(project => (
                        <Option key={project.Code} value={project.Code}>
                            {project.Name}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className={styles.ganttChartWrapper}>
                {tasksLoading === 'loading' ? (
                    <Spin>Loading tasks...</Spin>
                ) : ganttTasks.length > 0 ? (
                    <Gantt
                        tasks={ganttTasks}
                        viewMode={ViewMode.Week}
                        locale="en"
                    />
                ) : (
                    <p>Please select a project to view tasks.</p>
                )}
            </div>
        </div>
    );
};

export default GanttPage;
