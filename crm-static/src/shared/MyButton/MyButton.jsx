import styles from './MyButton.module.scss'



const MyButton = ({...props}) => {
    return (
        <button className={styles.button} {...props}>
            {props.children}
        </button>
    );
};

export default MyButton;