import {useSelector} from "react-redux";
import {selectUser} from "entities/user/userSlice.js";
import Sidebar from "widgets/Sidebar/Sidebar.jsx";
import styles from './ProfilePage.module.scss'


const ProfilePage = () => {

    const {user} = useSelector(selectUser)


    return (
        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.profileCard}>
                <img
                    src={user.avatar_url}
                    alt='Profile'
                    className={styles.profileImage}
                />
                <h2 className={styles.userName}>{user.name}</h2>
                <div className={styles.infoContainer}>

                    <label className={styles.label}>Email</label>
                    <p>{user.email}</p>

                    <label className={styles.label}>Location</label>
                    <p>NYC, New York, USA</p>

                    <label className={styles.label}>Mobile</label>
                    <p>+1 675 342-21-10</p>

                </div>
            </div>

            <div className={styles.contentArea}>
                <div className={styles.contentCard}>
                    <div className={styles.achievementsSection}>
                        <h3 className={styles.achievementsTitle}>Achievements</h3>
                        <ul className={styles.achievementsList}>
                            <li>Completed 100+ projects</li>
                            <li>Top designer award (2023)</li>
                            <li>Certified in UX/UI design</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
