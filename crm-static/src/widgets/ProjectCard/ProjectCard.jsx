import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { IoTimeOutline } from 'react-icons/io5';
import styles from './ProjectCard.module.scss';
import {formattedDate} from "shared/utils/utils.jsx";

const ProjectCard = ({ Id, Code, Name, Description, created_by, CreatedAt, onClickProjectDetails }) => {
    return (
        <div className={styles.projectCard} onClick={() => onClickProjectDetails(Code)}>
            <div className={styles.projectCardIcon}>
                <FaBuilding size={24} color="#2A7DE1" />
            </div>
            <div className={styles.projectCardContent}>
                <h4 className={styles.projectCardTitle}>{Name}</h4>
                <p className={styles.projectCardDate}>{formattedDate(CreatedAt)}</p>
            </div>
            <div className={styles.projectCardStatus}>
                <IoTimeOutline size={20} color="#A1A1A1" />
                {status === 'up' && <MdArrowUpward size={20} color="#FF9800" />}
                {status === 'down' && <MdArrowDownward size={20} color="#4CAF50" />}
            </div>
        </div>
    );
};

export default ProjectCard;