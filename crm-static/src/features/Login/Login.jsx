import {Link, Navigate} from "react-router-dom";
// import {MyButton, MyInput} from "../../../../shared";
import {Button, Input} from 'antd'
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "entities/user/userSlice.js";
import {loginUser} from "entities/user/asyncActions.js";
import styles from './Login.module.scss';
import MyButton from "shared/MyButton/MyButton.jsx";
import MyInput from "shared/MyInput/MyInput.jsx";


const SignIn = () => {

    const dispatch = useDispatch()

    const {user} = useSelector(selectUser)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    })
    const onSubmit = () => {
        dispatch(loginUser({email, password}))
    }


    if (user) {
        return <Navigate to='/'/>
    }


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.leftSection}>
                    <div className={styles.leftText}>
                        <img
                            src="https://img.icons8.com/ios-filled/50/ffffff/check-file.png"
                            alt="Logo"
                        />
                        <h2>H&H CRM</h2>
                        <p className={styles.title}>Your place to work</p>
                        <p className={styles.subtitle}>Plan. Create. Control.</p>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <h2 className={styles.formTitle}>Sign In to H&H</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <MyInput
                                {...register('email', {
                                    required: 'Поле обязательно к заполнению',
                                    pattern: {
                                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                        message: 'Введите email корректно'
                                    }
                                })}
                                placeholder="youremail@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {errors.email
                                ? <p className={styles.validate}>{errors.email.message}</p>
                                : ''
                            }

                        </div>
                        <div className={styles.formGroup}>
                            <label>Password</label>
                            <MyInput
                                {...register('password', {
                                    required: 'Поле обязательно к заполнению',
                                })}
                                placeholder="********"
                                value={password}
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password
                                ? <p className={styles.validate}>{errors.password.message}</p>
                                : ''
                            }
                        </div>
                        <div className={styles.checkboxGroup}>
                            <label>
                                <input type="checkbox"/>Remember me
                            </label>
                        </div>
                        <MyButton type='submit'>Sign In</MyButton>
                    </form>
                    <p className={styles.footerText}>
                        Don't have an account?{' '}
                        <Link to="/register" className={styles.footerText}>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
