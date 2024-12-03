import React from 'react';
import styles from './TaskModal.module.scss';
import MyModal from "shared/MyModal/MyModal.jsx";
import {Button, DatePicker, Select} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const TaskModal = ({ setModalOpen, modalOpen, newTask, setNewTask, writeTask }) => {
    return (
        <div className={`${styles.modalWrapper} ${modalOpen ? styles.show : ''}`}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>Create Task</h3>
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={() => setModalOpen(false)}
                    />
                </div>
                <div className={styles.formContent}>
                        <input
                            type="text"
                            placeholder="Title"
                            className={styles.input}
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            className={styles.input}
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <DatePicker
                            placeholder="Select date"
                            className={styles.datePicker}
                            onChange={(date) => setNewTask({ ...newTask, due_date: date ? date.toISOString() : '' })}
                        />
                        <Select
                            className={styles.select}
                            onChange={(value) => setNewTask({ ...newTask, priority: value })}
                            options={[
                                { value: 'major', label: 'Major' },
                                { value: 'critical', label: 'Critical' },
                                { value: 'minor', label: 'Minor' },
                                { value: 'blocker', label: 'Blocker', disabled: true },
                            ]}
                            placeholder="Select priority"
                        />
                </div>
                <div className={styles.footer}>
                    <Button type="primary" className={styles.saveButton} onClick={writeTask}>
                        Save Task
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;



