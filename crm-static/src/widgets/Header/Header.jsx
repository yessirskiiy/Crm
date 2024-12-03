import {GrNotification} from 'react-icons/gr';
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import styles from './Header.module.scss'
import {selectUser} from "entities/user/userSlice.js";
import MyButton from "shared/MyButton/MyButton.jsx";
import MySearch from "shared/MySearch/MySearch.jsx";
import {useModal} from "shared/MyModal/ModalContext.jsx";


const Header = ({onSearch, buttonText, pageTitle}) => {

    const {user} = useSelector(selectUser)
    const {setModalOpen} = useModal()
    const location = useLocation()

    const showActions =
        location.pathname === '/' ||
        (location.pathname.startsWith('/project') && !location.pathname.includes('/task/'))


    return (
        <div className={styles.header}>
            <div className={styles.topBar}>
                <a className={styles.notifications}>
                    <GrNotification className="w-6 h-6"/>
                </a>
                <Link to={`profile/${user.id}`} className={styles.userInfo}>
                    <img src={user.avatar_url} alt="Profile"/>
                    <span>{user.name}</span>
                </Link>
            </div>
            <div className={styles.lowerBar}>
                <div>
                    <h1 className={styles.title}>{pageTitle}</h1>
                </div>
                {
                    showActions && <div className={styles.actions}>
                        <div className={styles.searchInput}>
                            <MySearch className={styles.searchInput} onSearch={onSearch}/>
                        </div>
                        <MyButton onClick={() => setModalOpen(true)}>{buttonText}</MyButton>
                    </div>
                }
            </div>
        </div>

    );
};

export default Header;
