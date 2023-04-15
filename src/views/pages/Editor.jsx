import React, { useContext, useEffect, useState, forwardRef } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import { ApiContext } from '../../context/ApiContext'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Axios from '../../api/api'
import addUser from '../../img/AddUser.svg'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiAlert from '@material-ui/lab/Alert';
import uuid from 'react-uuid'
import Rainfall from './table/Rainfall'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Editor = () => {
    const { setUser } = useContext(ApiContext)
    const [loader, setLoader] = useState(false)
    const [load, setLoad] = useState(true)
    const [formData, setFormData] = useState('')
    const [open, setOpen] = useState(false)
    const [id, setId] = useState('')
    const [openTank, setOpenTank] = useState(false)
    const [editor, setEditor] = useState([])
    const [snack, setSnack] = useState(false)
    const [date, setDate] = useState(new Date())
    const [sheetEl, setSheetEl] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const [sheet, setSheet] = useState('Select Sheet')
    const [cookies, setCookie, removeCookie] = useCookies(['isLoggedinEditor', 'EditorID'])
    const provideHistory = useNavigate()
    const [check, setCheck] = useState({ rainFall: [], tankWater: [], sheetName: '', email: '' });

    useEffect(async () => {

        if (editor.length === 0) {
            const { data } = await Axios.get(`/editorFetch/${cookies.EditorID}`)
            setEditor(data);
            const { rainFall, tankWater, sheetName, email } = data;
            setCheck({
                ...check,
                ['rainFall']: rainFall,
                ['tankWater']: tankWater,
                ['sheetName']: sheetName,
                ['email']: email
            })

            setFormData({
                ...formData,
                ['stationName']: `${rainFall[0] ? 'rainFall' : 'tankWater'}`
            })
        }

        setLoad(false)
    }, [editor])

    const handleLogout = async () => {
        await setUser('')
        removeCookie('isLoggedinEditor')
        removeCookie('EditorID')
        provideHistory('/')
    }
    const handleInfo = async () => {
        setLoader(true)
        await Axios.post(`/editorCall/Data/${id}`, { ...formData, "date": date.toDateString(), "editor": cookies.EditorID, "sheet": sheetEl, "sheetID": id }).then(res => {
            setLoader(false);
            setOpen(false);
            setSnack(true)
        }).catch(err => console.error(err))
    }
    const handleInfoTank = async () => {
        setLoader(true)
        await Axios.post('/editorCall/DataTank', { ...formData, "date": date.toDateString(), "editor": cookies.EditorID, "sheet": sheetEl, "sheetID": id }).then(res => {
            setLoader(false);
            setOpenTank(false);
            setSnack(true)
        }).catch(err => console.error(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const label = document.querySelector('#submit').ariaLabel
        const id = document.querySelector('#submit').ariaCurrent
        if (label === 'rainFall') {
            setOpen(true)
            setId(id)
        } else if (label === 'tankWater') {
            setOpenTank(true)
            setId(id)
        }
    }
    const handleData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleClose = () => {
        setOpen(false)
        setOpenTank(false)
    }
    const handleCloseMenu = (e) => {
        try {
            const value = e.target.childNodes[0].data
            setSheetEl(value)
            setSheet(value);
            setAnchorEl(null);
        } catch (err) {
            setAnchorEl(null);

        }
    };

    const RainList = forwardRef(
        (props, ref) => {
            return <div>
                {check.sheetName.map(x => (
                    x.split('-')[1].trim() === "rainFall" && <MenuItem {...ref} {...props} onClick={handleCloseMenu} key={uuid()} {...props} >{x.split('-')[0].trim()} </MenuItem>
                ))}
            </div>
        }
    )


    const TankList = forwardRef(
        (props, ref) => {
            return <div>
                {check.sheetName.map(x => (
                    x.split('-')[1].trim() === "tankWater" &&
                    <MenuItem onClick={handleCloseMenu} key={uuid()} {...ref} {...props} >{x.split('-')[0].trim()} </MenuItem>

                ))}
            </div>
        }
    )

    const handleCloseSnack = () => {
        setSnack(false)
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCheckTwo = () => {
        const tamil = document.querySelector('.checkTwo');
        tamil.classList.contains('radio__selected') && tamil.classList.remove('radio__selected')
    }
    return (
        <>
            <div className="asc__container">
                <div className="asc__nav">
                    <h1 className='asc__nav__heading'>Welcome</h1>
                    <button onClick={handleLogout} className='asc__btn m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Logout</button>
                </div>
            </div>
            {load && <CircularProgress />}
            {!load &&
                <form action="#" method="post" onSubmit={handleSubmit}>
                    <div style={{ marginLeft: '2rem' }} className="drought__radio">
                        {check.rainFall[0] ?
                            <div className="drought__radio__group">
                                <input onClick={handleCheckTwo} onChange={handleData} className='radio' type="radio" value='rainFall' name="stationName" id="rainFall" />
                                <label htmlFor="rainFall" className='radio__label'>
                                    <span className="radio__btn checkTwo radio__selected"></span>
                                    RainFall
                                </label>
                            </div> : null}
                        {check.tankWater[0] ?

                            <div className="drought__radio__group">
                                <input onClick={handleCheckTwo} onChange={handleData} className='radio' type="radio" value='tankWater' name="stationName" id="tankWater" />
                                <label htmlFor="tankWater" className='radio__label'>
                                    {check.rainFall[0] ?
                                        <span className="radio__btn"></span>
                                        :
                                        <span className="radio__btn checkTwo radio__selected"></span>
                                    }
                                    Tank Water
                                </label>
                            </div>
                            : null}
                        <div className="drought__radio__group">
                            <input onClick={handleCheckTwo} onChange={handleData} className='radio' type="radio" value='addedList' name="stationName" id="addedList" />
                            <label htmlFor="addedList" className='radio__label'>
                                <span className="radio__btn checkTwo"></span>
                                Records
                            </label>
                        </div>
                    </div>
                    {formData['stationName'] === 'rainFall' &&
                        <div className="m-top admin__header">
                            <h3>Create Record</h3>
                            <div className="form__control">
                                <input onChange={handleData} placeholder='Rainfall (mm)' type="text" className='form__input' name="rainfall" required />
                                <label className='form__label' style={{ marginBottom: '2rem' }} htmlFor="name">Rainfall (mm)</label>
                            </div>
                            <h3>Date Measured</h3>
                            <div className="form__control">
                                <Calendar onChange={setDate} value={date} />
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <Button variant='contained' color='primary' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    {sheet}
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <RainList />
                                </Menu>
                            </div>
                            <div className="btn__box">
                                <button aria-current={check.rainFall[1]} type='submit' aria-label='rainFall' id='submit' className='m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Submit</button>
                            </div>
                        </div>
                    }
                    {formData['stationName'] === 'tankWater' &&
                        <div className="m-top admin__header">
                            <h3>Create Record</h3>
                            <div className="form__control">
                                <input onChange={handleData} placeholder='Water Level (ft)' type="text" className='form__input' name="waterLevel" required />
                                <label className='form__label' style={{ marginBottom: '2rem' }} htmlFor="name">Water Level (ft)</label>
                            </div>
                            <div className="form__control">
                                <input onChange={handleData} placeholder='Capacity (Ac.ft)' type="text" className='form__input' name="waterCapacity" />
                                <label className='form__label' style={{ marginBottom: '2rem' }} htmlFor="name">Capacity (Ac.ft)</label>
                            </div>
                            <h3>Date Measured</h3>
                            <div className="form__control">
                                <Calendar onChange={setDate} value={date} />
                            </div>
                            <div style={{ marginTop: '2rem' }}>
                                <Button variant='contained' color='primary' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    {sheet}
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <TankList />
                                </Menu>
                            </div>
                            <div className="btn__box">
                                <button aria-current={check.tankWater[1]} type='submit' aria-label='tankWater' id='submit' className='m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Submit</button>
                            </div>
                        </div>
                    }
                    {formData['stationName'] === 'addedList' &&
                        <>
                            <Rainfall sheetList={check.sheetName} rainCheck={check.rainFall[0]} tankCheck={check.tankWater[0]} email={check.email} id={cookies.EditorID} />
                        </>
                    }
                </form>
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontWeight: 700 }}>
                        Rainfall : {formData.rainfall}
                        <br />
                        Sheet Name : {sheet}
                        <br />
                        Date Measured : {date.toDateString()}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {loader ?
                        <CircularProgress color="inherit" /> :
                        <Button color='primary' variant="contained" onClick={handleInfo} >
                            Submit
                        </Button>
                    }
                    <Button color='secondary' variant='contained' onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openTank} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ fontWeight: 700 }}>
                        Water Level : {formData.waterLevel}
                        <br />
                        Water Capacity : {formData.waterCapacity}
                        <br />
                        Sheet Name : {sheet}
                        <br />
                        Date Measured : {date.toDateString()}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {loader ?
                        <CircularProgress color="inherit" /> :
                        <Button color='primary' variant="contained" onClick={handleInfoTank} >
                            Submit
                        </Button>
                    }
                    <Button color='secondary' variant='contained' onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Saved Successfully !!
                </Alert>
            </Snackbar>
        </>

    )
}

export default Editor