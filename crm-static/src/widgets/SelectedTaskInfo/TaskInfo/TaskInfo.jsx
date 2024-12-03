import React, {useState} from 'react';
import styles from "pages/SelectedTask/SelectedTask.module.scss";
import {Avatar, Button, Progress, Slider, Spin, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {calculateTimeLeft, formattedDate} from "shared/utils/utils.jsx";
import {FcCalendar} from "react-icons/fc";
import {useModal} from "shared/MyModal/ModalContext.jsx";
import MyModal from "shared/MyModal/MyModal.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateTaskTime, fetchTask} from "entities/tasks/asyncActions.js";
import {selectUser} from "entities/user/userSlice.js";

const TaskInfo = ({getAuthor, ...selectedTask}) => {

    const assignedTo = getAuthor ? getAuthor(selectedTask.assigned_to) : null;
    const {user} = useSelector(selectUser)
    const dispatch = useDispatch();
    const {modalOpen, setModalOpen} = useModal();
    const {Code, TaskId} = useParams();

    const [time, setTime] = useState(0);

    const onChange = (newValue) => {
        setTime(newValue);
    };


    const logTime = async () => {
        const updatedTimeSpent = Number(selectedTask.time_spent) + Number(time);

        await dispatch(updateTaskTime({TaskId: TaskId, Code: Code, time_spent: updatedTimeSpent}));
        setModalOpen(false);

        dispatch(fetchTask({Code, TaskId}));
    };

    const timeLeft = selectedTask?.due_date ? calculateTimeLeft(selectedTask.due_date) : "No due date available"
    const maxTime = 720
    const progressPercent = Math.round(Math.min((selectedTask.time_spent / maxTime) * 100, 100))

    return (
        <div className={styles.rightPanel}>
            <div className={styles.taskInfoCard}>
                <h3>Task Info</h3>
                <div className={styles.infoItem}>
                    <h4>Reporter</h4>
                    <div className={styles.reporterDetails}>
                        <Avatar src="https://randomuser.me/api/portraits/men/20.jpg"/> Evan Yates
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h4>Assigned</h4>
                    {assignedTo ? (
                        <div className={styles.reporterDetails}>
                            <Avatar src={assignedTo.avatar_url}/>
                            {assignedTo.name}
                            <div className={styles.reporterDetailsAssigned}>{assignedTo.role}</div>
                        </div>
                    ) : (
                        <Spin tip="Loading author details..."/>
                    )}
                </div>
                <div className={styles.infoItem}>
                    <h4>Priority</h4>
                    <Tag color="orange">{selectedTask.Priority}</Tag>
                </div>
                <div className={styles.timeTracking}>
                    <h4>Time Tracking</h4>
                    <div className={styles.timeTrackingDetails}>
                        <Progress type="circle" percent={progressPercent} width={50}/>
                        <div className={styles.timeLogged}>
                            <p>{selectedTask.time_spent} minutes</p>
                            <p className={styles.originalEstimate}>{timeLeft}</p>
                        </div>
                    </div>
                    {(selectedTask.Status !== 'completed') &&
                        <Button type="primary" icon={<PlusOutlined/>} className={styles.logTimeButton}
                                onClick={() => setModalOpen(true)}>
                            Log time
                        </Button>
                    }
                </div>
                <div className={styles.infoItem}>
                    <h4>Created</h4>
                    <p><FcCalendar/>{formattedDate(selectedTask.CreatedAt)}</p>
                </div>
                <div className={styles.infoItem}>
                    <h4>Deadline</h4>
                    <p><FcCalendar/>{formattedDate(selectedTask.due_date)}</p>
                </div>
            </div>
            {
                modalOpen && <MyModal setModalOpen={setModalOpen} modalOpen={modalOpen} title='Log time' onOk={logTime}>
                    <Slider
                        min={1}
                        max={720}
                        onChange={onChange}
                        value={time}
                    />
                </MyModal>
            }
        </div>
    );
};

export default TaskInfo;
