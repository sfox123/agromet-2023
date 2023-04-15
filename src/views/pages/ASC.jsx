import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useCookies } from 'react-cookie'

import Axios from '../../api/api'
import { ApiContext } from '../../context/ApiContext'
import uuid from 'react-uuid'
import addUser from '../../img/AddUser.svg'
import Sheet from './Sheet'
import Loader from './Loader'

import { Alert } from '@material-ui/lab';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core'

const ASC = () => {
    const { setUser } = useContext(ApiContext)
    const [loader, setLoader] = useState(false)
    const [load, setLoad] = useState(true)
    const [circle, setCircle] = useState(false)
    const [formLoad, setFormLoad] = useState(false)
    const [select] = useState([])
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const [editor, setEditor] = useState([])
    const [error, setError] = useState(false)
    const [fileInput, setFileInput] = useState('')
    const [size, setSize] = useState('')
    const [Listsheet, setList] = useState([])
    const [cookies, setCookies, removeCookie] = useCookies(['isLoggedinASC', 'AscID'])
    const provideHistory = useNavigate()
    const password = uuid().split('-')[0]

    const handleCheckTwo = () => {
        const tamil = document.querySelector('.checkTwo');
        tamil.classList.contains('radio__selected') && tamil.classList.remove('radio__selected')
    }
    const handleLogout = async () => {
        removeCookie('isLoggedinASC')
        removeCookie('AscID')
        await setUser('')
        provideHistory('/')
    }

    const handleData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    useEffect(() => {
        async function getEditor() {
            await Axios.get('/getEditor/All', { 'asc': cookies.AscID }).then(res => {
                setEditor(res.data)
            }).catch(err => window.location.reload())
        }
        async function getID() {
            const id = cookies.AscID
            await Axios.get(`/getEditor/${id}`).then(res => {
                setLoad(false)
                setList(res.data.sheetList)
            }).catch(err => {
                console.error(err)
            })
        }
        getEditor();
        setFormData({
            ...formData,
            ['asc']: cookies.AscID, ["rainFall"]: false, ["tankWater"]: false, ["stationName"]: 'rainFall'
        })
        if (cookies.isLoggedinASC) {
            getID();
        }
    }, [])

    const handleSubmitStation = async (e) => {
        e.preventDefault()
        setFormLoad(true)
        await Axios.post('/editorCall/station', { ...formData }).then(res => setFormLoad(false)).catch(err => console.error(err)).finally(res => { window.location.reload() })
    }

    const handleFile = async (e) => {
        let file = e.target.files
        const { size } = file[0]
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (e) => {
            setFileInput(e.target.result);
            setSize(size)
        }
    }
    const fileSubmit = async (e) => {
        e.preventDefault()
        setCircle(true)
        await Axios.post('/getFile', { 'file': fileInput, 'size': size, 'asc': cookies.AscID }).then(res => {
            setCircle(false);
            alert("Uploaded");
            window.location.reload()
        }).catch(err => console.error(err))
    }
    const handleSubmitOne = async (e) => {
        e.preventDefault()
        if (genEmail().includes(formData.email.toLowerCase())) {
            setError(true)
            window.location.replace('#error')
        } else {
            setLoader(true)
            try {
                await Axios.post('/editorCall', { ...formData, "sheetName": select, "password": password }).then(res => window.location.reload()).catch(err => console.error(err))
            } catch (error) {
                alert('Something Went Wrong Try Again');
                window.location.reload()
                setLoader(false)
            }
        }

    }

    const genEmail = () => {
        const editorList = []
        editor.map((x, i) => {
            editorList.push(x.email.toLowerCase())
        })
        return editorList
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async (e) => {
        try {
            const value = e.target.childNodes[0].data
            const valueTitle = value.trim().split('-')[1].trim()
            setFormData({
                ...formData,
                [valueTitle]: true
            })
            if (!select.includes(value)) {
                select.push(value)
            }
            document.querySelector('.btn__box').classList.remove('none')
            setAnchorEl(null);
        } catch (error) {
            setAnchorEl(null);
        }

    };

    const closeTypo = (e) => {
        const label = e.currentTarget.ariaLabel;
        const index = select.indexOf(label);
        select.splice(index, 1)
        document.querySelector(`.${label.split('-')[0].trim()}`).remove()
    }
    return (
        <>
            {load ?
                <div className="m-top" style={{ display: 'grid', placeContent: 'center', justifyItems: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
                :
                <>
                    <div className="asc__container">
                        <div className="asc__nav">
                            <h1 className='asc__nav__heading'>Welcome</h1>
                            <button onClick={handleLogout} className='asc__btn m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Logout</button>
                        </div>
                    </div>
                    {error && <Alert id='error' variant="filled" severity="error" style={{ marginLeft: '2rem', marginBottom: '2rem', width: '50%' }} onClose={() => { setError(false) }}>Editor Name is Already Exist !</Alert>}
                    <div className="admin__header__container">
                        {loader ? <Loader /> :
                            <form className='formStation' action="#" onSubmit={handleSubmitOne} method="post">
                                <div className="admin__header">
                                    <h3>Create Editor</h3>
                                    <div className="form__control">
                                        <input onChange={handleData} placeholder='Editor Name' type="text" className='form__input' name="email" id="admin" required />
                                        <label className='form__label' style={{ marginBottom: '2rem' }} htmlFor="name">Editor Name</label>
                                    </div>
                                    {Listsheet.length > 0 ?
                                        <div style={{ marginTop: '2rem' }}>
                                            <Button variant='contained' color='primary' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                Select Station
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                {Listsheet.map((x, i) => (
                                                    <div key={i} className="">
                                                        <MenuItem onClick={handleClose}>{`${x[1]} - ${x[0]}`}</MenuItem> :
                                                    </div>
                                                ))}

                                            </Menu>
                                            {select.map((x, i) => (
                                                <div key={i} className="m-top m-bot" >
                                                    <div className={x.split('-')[0].trim()} style={{ display: "flex", alignItems: 'center' }}>
                                                        <CancelIcon onClick={closeTypo} aria-label={x} style={{ marginRight: '1rem', cursor: "pointer" }} />
                                                        <Typography className='m-top m-bot' variant='body2'> {x} </Typography>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        : <h4 style={{ marginTop: '2rem', color: "red" }}>No Station to Assign</h4>}

                                    <div className="btn__box none">
                                        <button type='submit' id='submit' className='m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Submit</button>
                                    </div>

                                </div>
                            </form>
                        }
                        {formLoad ?
                            <Loader />
                            :
                            <div className="admin__header form">
                                <h3>Create Station</h3>
                                <div className="form__control">
                                </div>
                                <form action="#" onSubmit={handleSubmitStation} method="post">
                                    <input onChange={handleData} placeholder='Station Name' type="text" className='form__input' name="sheet" id="station" required />
                                    <label className='form__label m-bot' htmlFor="station">Station Name</label>
                                    <input onChange={handleData} placeholder='Latitude' type="text" className='form__input' name="lat" required />
                                    <label className='form__label m-bot' htmlFor="lat">Latitude</label>
                                    <input onChange={handleData} placeholder='Longitude' type="text" className='form__input' name="lon" required />
                                    <label className='form__label m-bot' htmlFor="lon" style={{ marginBottom: '2rem' }} >Longitude</label>
                                    <input onChange={handleData} placeholder='District' type="text" className='form__input' name="district" required />
                                    <label className='form__label m-bot' htmlFor="district" style={{ marginBottom: '2rem' }} >District</label>
                                    <div className="drought__radio">
                                        <div className="drought__radio__group">
                                            <input onClick={handleCheckTwo} onChange={handleData} className='radio' type="radio" value='rainFall' name="stationName" id="rainFall" />
                                            <label htmlFor="rainFall" className='radio__label'>
                                                <span className="radio__btn checkTwo radio__selected"></span>
                                                RainFall
                                            </label>
                                        </div>
                                        <div className="drought__radio__group">
                                            <input onClick={handleCheckTwo} onChange={handleData} className='radio' type="radio" value='tankWater' name="stationName" id="tankWater" />
                                            <label htmlFor="tankWater" className='radio__label'>
                                                <span className="radio__btn"></span>
                                                Tank Water
                                            </label>
                                        </div>
                                    </div>
                                    <div className="btn__box">
                                        <button type='submit' className='m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Submit</button>
                                    </div>
                                </form>
                            </div>
                        }
                        <div className="advisory__container">
                            <form method="post" onSubmit={fileSubmit}>
                                <h3>Advisories</h3>
                                <div className="dragbox">
                                    <input type="file" name="file" id="file" onChange={handleFile} />
                                </div>
                                {circle ? <CircularProgress /> :
                                    <button type='submit' className='m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Submit</button>
                                }
                            </form>
                        </div>
                    </div>
                    <div className="sheet">
                        <Sheet open={open} setOpen={setOpen} sheetList={Listsheet} editorList={editor} />
                    </div>
                </>
            }
        </>
    )
}

export default ASC