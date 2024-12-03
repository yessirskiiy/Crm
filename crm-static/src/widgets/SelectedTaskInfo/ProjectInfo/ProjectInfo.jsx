import React, {useEffect} from 'react';
import styles from "pages/SelectedTask/SelectedTask.module.scss";
import {Avatar, Spin} from "antd";
import {formattedDate} from "shared/utils/utils.jsx";
import {FcCalendar} from "react-icons/fc";
import {getProject} from "entities/projects/asyncActions.js";
import {useDispatch, useSelector} from "react-redux";
import {selectProjects} from "entities/projects/projectsSlice.js";
import {useParams} from "react-router-dom";

const ProjectInfo = ({getAuthor, ...project}) => {

    const author = getAuthor ? getAuthor(project.created_by) : null


    return (
        <div className={styles.leftPanel}>
            <div className={styles.projectDetailsCard}>
                <h4>Project</h4>
                <p>{project.Code} - {project.Name}</p>
                <h4>Description</h4>
                <p>{project.Description}</p>
                <h4>Creator</h4>
                {author ? (
                    <div className={styles.reporterDetails}>
                        <Avatar src={author.avatar_url} />
                        {author.name}
                    </div>
                ) : (
                    <Spin tip="Loading author details..." />
                )}
                <h4>Created</h4>
                <p><FcCalendar/>{formattedDate(project.CreatedAt)}</p>
            </div>
        </div>
    );
};

export default ProjectInfo;