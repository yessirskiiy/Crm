import React from 'react';
import {Dropdown, Menu, Checkbox} from "antd";
import {FilterFilled} from '@ant-design/icons'
import styles from './FilterTasks.module.scss'


const FilterTasks = ({filterPriority, setFilterPriority, filterStatus, setFilterStatus}) => {
    const handlePriorityChange = (e) => {
        setFilterPriority({...filterPriority, [e.target.value]: e.target.checked});
    };

    const handleStatusChange = (e) => {
        setFilterStatus({...filterStatus, [e.target.value]: e.target.checked});
    };


    const statusMenu = (
        <Menu onClick={(e) => e.stopPropagation()}>
            <Menu.Item key="1">
                <Checkbox value="completed" checked={filterStatus.completed} onChange={handleStatusChange}>Done</Checkbox>
            </Menu.Item>
            <Menu.Item key="2">
                <Checkbox value="in progress" checked={filterStatus['in progress']} onChange={handleStatusChange}>In
                    Progress</Checkbox>
            </Menu.Item>
            <Menu.Item key="3">
                <Checkbox value="open" checked={filterStatus['open']} onChange={handleStatusChange}>To Do</Checkbox>
            </Menu.Item>
            <Menu.Item key="4">
                <Checkbox value="on hold" checked={filterStatus['on hold']} onChange={handleStatusChange}>On hold</Checkbox>
            </Menu.Item>
            <Menu.Item key="5">
                <Checkbox value="Major" checked={filterPriority.Major}
                          onChange={handlePriorityChange}>Medium</Checkbox>
            </Menu.Item>
            <Menu.Item key="6">
                <Checkbox value="Minor" checked={filterPriority.Minor} onChange={handlePriorityChange}>Low</Checkbox>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Dropdown overlay={statusMenu} trigger={['click']}>
                <div className={styles.icon}>
                    <FilterFilled/>
                </div>
            </Dropdown>
        </div>
    );
};

export default FilterTasks;