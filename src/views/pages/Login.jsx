
import React, { useContext } from 'react'
import { ApiContext } from '../../context/ApiContext'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router'
import Axios from '../../api/api'
import loader from '../../img/loader.png'

const Login = (props) => {
    const [formData, updateFormData] = React.useState('');
    const [cookies, setCookie] = useCookies(['isLoggedin', 'AscID', 'isLoggedinEditor', 'EditorID']);
    const provideHistory = useNavigate()
    const { setUser } = useContext(ApiContext)

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    async function handleAdmin() {
        const loginErr = document.querySelector('.login__error').classList
        await Axios.post('/signin', { ...formData })
            .then(res => {
                setUser(res.data.user)
                setCookie('isLoggedinAdmin', true)
                provideHistory('/admin')
            })
            .catch(err => loginErr.remove('none'))
    }

    async function handleAsc() {
        const loginErr = document.querySelector('.login__error').classList
        await Axios.post('/signin', { ...formData })
            .then(res => {
                setUser(res.data.editor)
                setCookie('isLoggedinASC', true)
                setCookie('AscID', res.data.asc._id)
                // provideHistory.push('/asc')
                window.open('asc')
            })
            .catch(err => loginErr.remove('none'))
    }

    async function handleEditor() {
        const loginErr = document.querySelector('.login__error').classList
        await Axios.post('/signin', { ...formData })
            .then(res => {
                setUser(res.data.asc)
                setCookie('isLoggedinEditor', true)
                setCookie('EditorID', res.data.editor._id)
                provideHistory.push('/editor');
            })
            .catch(err => loginErr.remove('none'))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email } = formData;
        const splitMail = email.split('-')
        const index = splitMail.indexOf("agro")
        if (index === 0) {
            handleAdmin();
        } else if (index === 1) {
            handleAsc();
        } else {
            handleEditor();
        }

    };
    return (
        <>
            <section className='section__drought'>
                <div className='section__drought__main section__drought__main__img__2'>
                    <div className="drought">
                        <div className="drought__title" >
                            <h1 style={{ margin: "1rem 2rem" }} className="section__title">Login</h1>
                        </div>
                        <form method='post' onSubmit={handleSubmit} autoComplete='off' className="form">
                            <div className="form__control">
                                <input placeholder='User ID' onChange={handleChange} name="email" type="text" className="form__input" />
                                <label htmlFor="email" className="form__label">User ID</label>
                            </div>
                            <div className="form__control">
                                <input placeholder='Password' onChange={handleChange} name="password" type="password" className="form__input" />
                                <label htmlFor="name" className="form__label">Password</label>
                            </div>
                            <div className="drought__box" style={{ margin: '0' }}>
                                <span className='none login__error'>Username or Password Incorrect</span>
                                <button className='login__btn' target='_blank'>Login {'->'} </button>
                            </div>
                        </form>
                    </div>
                </div>
                <img src={loader} alt="loader" className='login__loader' />
            </section>
        </>
    )
}

export default Login;