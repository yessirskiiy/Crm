import React from 'react';
import {Avatar, Tag} from "antd";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import styles from './Task.module.scss'


const Task = ({
                  TaskId,
                  Title,
                  time_spent,
                  due_date,
                  Priority,
                  Status,
                  assigned_to,
                  getAssigneeDetails,
                  onClickTask
              }) => {

    const assigneeDetails = getAssigneeDetails(assigned_to);

    const getStatusTag = (status) => {
        switch (status) {
            case 'completed':
                return <Tag color="green">Completed</Tag>;
            case 'in progress':
                return <Tag color="blue">In Progress</Tag>;
            case 'open':
                return <Tag color="orange">To Do</Tag>;
            case 'on hold':
                return <Tag color="magenta">On hold</Tag>;
            default:
                return null;
        }
    };

    return (
        <div className={styles.taskRow} onClick={() => onClickTask(TaskId)}>
            <div className={styles.taskName}>
                <p>Task name</p>
                {Title}
            </div>
            <div className={styles.taskEstimate}>
                <p>Due date</p>
                {new Date(due_date).toDateString()}
            </div>
            <div className={styles.taskSpentTime}>
                <p>Time spent</p>
                {time_spent} minutes
            </div>
            <div className={styles.taskAssignee}>
                {assigneeDetails ? (
                    <>
                        <Avatar src={assigneeDetails.avatar_url}/>
                        <span className={styles.assigneeName}>{assigneeDetails.name}</span>
                    </>
                ) : (
                    <span>Unassigned</span>
                )}
            </div>
            <div className={styles.taskPriority}>
                {Priority === 'critical' || Priority === 'major' ? (
                    <FaArrowUp color='#FF9800'/>
                ) : (
                    <FaArrowDown color='#4CAF50'/>
                )}
                <span className={styles.priorityText}>
                    <p>Priority</p>
                    {Priority}
                </span>
            </div>
            <div className={styles.taskStatus}>
                <p>Status</p>
                {getStatusTag(Status)}
            </div>
        </div>
    );
};

export default Task;