import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ModalProvider} from "shared/MyModal/ModalContext.jsx";
// import {fetchTasksByProject} from "entities/tasks/model/asyncActions.ts";
// import {setTasks} from "entities/tasks/model/tasksSlice.ts";
// import {selectTasks} from "entities/tasks/model/tasksSelector.ts";
import {selectUser} from "entities/user/userSlice.js";
import Sidebar from "widgets/Sidebar/Sidebar.jsx";
import Header from "widgets/Header/Header.jsx"
import styles from './Layout.module.scss'
import {selectTasks, setTasks} from "entities/tasks/tasksSlice.js";
import {fetchTasksByProject} from "entities/tasks/asyncActions.js";
import {fetchProjects} from "entities/projects/asyncActions.js";
import {selectProjects, setProject} from "entities/projects/projectsSlice.js";


const Layout = () => {

    const {user} = useSelector(selectUser)
    const dispatch = useDispatch()
    const location = useLocation()
    const {Code} = useParams()
    const {tasks} = useSelector(selectTasks)
    const {projects} = useSelector(selectProjects)


    const handleSearch = (query) => {
        console.log(query)
        if (location.pathname.includes(`/project/${Code}`)) {
            if (query.trim() === '') {
                dispatch(fetchTasksByProject(Code))
            } else {
                const newSearchTasks = tasks.filter((task) => task.Title.toLowerCase().includes(query.toLowerCase()))
                dispatch(setTasks(newSearchTasks))
            }
        } else if (location.pathname.includes('/')) {
            console.log("Search for projects:", query)
            if (query.trim() === '') {
                dispatch(fetchProjects())
            } else {
                const newProjectsSearch = projects.filter((project) => project.Name.toLowerCase().includes(query.toLowerCase()))
                dispatch(setProject(newProjectsSearch))
            }
        }
    }


    const buttonText = location.pathname.includes(`/project/${Code}`) ? 'Добавить задачу' :
        location.pathname.includes('') ? 'Добавить проект' : 'Добавить';


    let pageTitle

    if (location.pathname.includes(`/project/${Code}`)) {
        pageTitle = `Project ${Code}`
    } else if (location.pathname.includes('/dashboard')) {
        pageTitle = 'Dashboard'
    } else if (location.pathname.includes('/diagram')) {
        pageTitle = 'Diagram'
    } else if (location.pathname.includes('')) {
        pageTitle = 'Projects'
    }


    if (!user) {
        return <Navigate to='/login'/>
    }

    return (
        <ModalProvider>
            <div className={styles.layout}>
                <div className={styles.sidebar}>
                    <Sidebar/>
                </div>
                <div className={styles.header}>
                    <Header onSearch={handleSearch} pageTitle={pageTitle} buttonText={buttonText}/>
                    <div className={styles.content}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
};

export default Layout;