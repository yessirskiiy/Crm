import {useState} from 'react';
import {FiLogOut} from 'react-icons/fi';
import {FcBusiness, FcBarChart, FcBearish} from "react-icons/fc";
import {Link} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {logOut} from "entities/user/userSlice.js";
import styles from './Sidebar.module.scss';


const Sidebar = () => {

    const dispatch = useDispatch()

    const [active, setActive] = useState('projects');

    const toggleMenu = (item) => {
        setActive(item);
    };


    return (
        <div className={styles.sidebar}>
            <div className={styles.content}>
                <Link to='/'>
                    <img
                        src="https://cdn3.iconfinder.com/data/icons/files-142/24/check_file_1-512.png"
                        alt="Logo"
                    />
                    <h1>H&H CRM</h1>
                </Link>
                <ul>
                    <li>
                        <Link to='/'
                              className={active === 'projects' ? `${styles.active}` : ''}
                              onClick={() => toggleMenu('projects')}
                        ><FcBusiness/>
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard'
                              className={active === 'dashboard' ? `${styles.active}` : ''}
                              onClick={() => toggleMenu('dashboard')}
                        >
                            <FcBarChart/>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/diagram'
                            className={active === 'diagram' ? `${styles.active}` : ''}
                            onClick={() => toggleMenu('diagram')}
                        >
                            <FcBearish/>
                            Diagram
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.logout}>
                <Link to="/login" onClick={() => dispatch(logOut())}>
                    <FiLogOut/>
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
