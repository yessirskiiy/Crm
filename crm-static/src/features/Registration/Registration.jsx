import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {selectUser} from "entities/user/userSlice.js";
import {registerUser} from "entities/user/asyncActions.js";
import styles from './Registration.module.scss';
import MyButton from "shared/MyButton/MyButton.jsx";
import MyInput from "shared/MyInput/MyInput.jsx";



const SignUp = () => {

    const dispatch = useDispatch()

    const {user, error} = useSelector(selectUser)
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        avatar_url: null
    })


    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    })
    const onSubmit = () => {
        if (!error) {
            dispatch(registerUser({...newUser}))
        } else {
            reset()
        }

    }

    if (user) {
        return <Navigate to='/'/>
    }


    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.imageSection}>
                    <div className={styles.textContent}>
                        <img src="https://img.icons8.com/ios-filled/50/ffffff/check-file.png" alt="Logo"
                             className={styles.logo}/>
                        <h2 className={styles.title}>H&H CRM</h2>
                        <p className={styles.subtitle}>Get started</p>
                    </div>
                </div>
                <div className={styles.formSection}>
                    <h2 className={styles.formTitle}>Sign Up to H&H</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Full Name</label>
                            <MyInput
                                {...register('name', {
                                    required: 'Поле обязательно к заполнению',
                                    pattern: {
                                        value: /^[A-Za-z]{3}/,
                                        message: 'Введите своё имя корректно'
                                    }
                                })}
                                placeholder="Jhon Doe"
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}

                            />
                            {errors.name
                                ? <p className={styles.validate}>{errors.name.message}</p>
                                : ''
                            }
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email Address</label>
                            <MyInput
                                {...register('email', {
                                    required: 'Поле обязательно к заполнению',
                                    pattern: {
                                        value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                        message: 'Введите email корректно'
                                    }
                                })}
                                placeholder="youremail@gmail.com"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            />
                            {errors.email
                                ? <p className={styles.validate}>{errors.email.message}</p>
                                : ''
                            }
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Password</label>
                            <MyInput
                                {...register('password', {
                                    required: 'Поле обязательно к заполнению',
                                    minLength: {
                                        value: 6,
                                        message: 'Пароль сликом короткий'
                                    }
                                })}
                                placeholder="********"
                                value={newUser.password}
                                type='password'
                                onChange={(e) => setNewUser({...newUser, password: e.target.value})}

                            />
                            {errors.password
                                ? <p className={styles.validate}>{errors.password.message}</p>
                                : ''
                            }
                        </div>
                        <MyButton type='submit'>Sign Up</MyButton>
                    </form>
                    <p className={styles.footerText}>
                        Already have an account?{' '}
                        <Link to="/login" className={styles.signInLink}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default SignUp;