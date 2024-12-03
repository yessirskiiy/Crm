import React, {useEffect, useState} from 'react';
import ProjectCard from "widgets/ProjectCard/ProjectCard.jsx";
import SkeletonCard from "widgets/ProjectCard/SkeletonCard.jsx";
import {useModal} from "shared/MyModal/ModalContext.jsx";
import {Input} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "entities/user/userSlice.js";
import MyModal from "shared/MyModal/MyModal.jsx";
import TextArea from "antd/es/input/TextArea";
import {createProject, fetchProjects} from "entities/projects/asyncActions.js";
import {selectProjects} from "entities/projects/projectsSlice.js";
import styles from './HomePage.module.scss'


const HomePage = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {modalOpen, setModalOpen} = useModal()
    const {user} = useSelector(selectUser)
    const {loading, projects} = useSelector(selectProjects)
    const [newProject, setNewProject] = useState({
        code: '',
        created_by: Number(user.id),
        description: '',
        name: '',
    })


    useEffect(() => {
        dispatch(fetchProjects())
    }, [dispatch])


    const createNewProject = () => {
        dispatch(createProject(newProject))
        setModalOpen(false)
    }


    const onClickProjectDetails = (Code) => {
        navigate(`/project/${Code}`)
    }

    return (
        <div>
            <section className={styles.nearestEvents}>
                <div className={styles.eventsList}>
                    {loading === 'loading' ? (
                        [...Array(8)].map((_, index) => <SkeletonCard key={index}/>)
                    ) : Array.isArray(projects) && projects.length > 0 ? (
                        projects.map((obj) => (
                            <ProjectCard
                                {...obj}
                                key={obj.Id}
                                onClickProjectDetails={onClickProjectDetails}
                            />
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
            </section>
            {
                modalOpen && <MyModal setModalOpen={setModalOpen} modalOpen={modalOpen} onOk={createNewProject}
                                      title='Create Project'>
                    <Input placeholder='Code of project'
                           onChange={(e) => setNewProject({...newProject, code: e.target.value})}/>
                    <Input placeholder='Name of project'
                           onChange={(e) => setNewProject({...newProject, name: e.target.value})}/>
                    <TextArea placeholder='Description of project'
                              onChange={(e) => setNewProject({...newProject, description: e.target.value})}/>
                </MyModal>
            }
        </div>
    );
};

export default HomePage;