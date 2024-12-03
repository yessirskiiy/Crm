import React, {forwardRef} from 'react'

// @ts-ignore
import styles from './MyInput.module.scss'


const MyInput = forwardRef(({...props}, ref) => {
    return (
        <input className={styles.input} ref={ref} {...props} />
    );
});

export default MyInput;