
import React, { useState, useContext } from 'react'
import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router'
import { ApiContext } from '../../context/ApiContext'
import Axios from '../../api/api'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import User from './User'
import Loader from './Loader'
import addUser from '../../img/AddUser.svg'
import uuid from 'react-uuid'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: '2rem'
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        textTransform: 'uppercase'
    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        marginTop: '2rem'
    }
});

const handleClick = async () => {
    document.querySelector('.form__input').classList.toggle('none')
    document.querySelector('.form__input').classList.toggle('input__anime')
}
const handleChange = () => {
    setTimeout(() => {
        document.querySelector('.admin__btn').classList.add('none')
    }, 500);
    setTimeout(() => {
        document.querySelector('.btn__box').classList.remove('none')
    }, 501);
    document.querySelector('.admin__btn').animate([
        {
            opacity: 1,
            transform: 'translate(0)'
        },
        {
            opacity: 0,
            transform: 'translateY(150px)'
        }
    ], { duration: 500, easing: 'cubic-bezier(1,1,1,1)' });

    document.querySelector('.btn__box').animate([
        {
            opacity: 0,
        },
        {
            opacity: 1,
        }
    ], { duration: 1200, })
}

const animeReverse = () => {
    document.querySelector('.admin__btn').classList.remove('none')
    document.querySelector('.btn__box').classList.add('none')
    handleClick()

    document.querySelector('.admin__btn').animate([
        {
            opacity: 0,
            transform: 'translateY(150px)'
        },
        {
            opacity: 1,
            transform: 'translate(0)'
        }
    ], { duration: 500, easing: 'cubic-bezier(1,1,1,1)' });

    document.querySelector('.btn__box').animate([
        {
            opacity: 1,
        },
        {
            opacity: 0,
        }
    ], { duration: 1200, })
}

const sheet = 'https://docs.google.com/spreadsheets/d/'
const fileUri = 'https://drive.google.com/drive/u/0/folders/'



const Admin = props => {
    const { setUser, apiData } = useContext(ApiContext)
    const [name, setName] = useState('')
    const [cookies, setCookie, removeCookie] = useCookies(['isLoggedin'])
    const [load, setLoad] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, setUserName] = useState('')
    const [passWord, setPassword] = useState('')
    const [openEl, setOpenEl] = useState(false)
    const [elDelete, setElDelete] = useState('')
    // const provideHistory = useNavigate()
    const idDecode = uuid().split('-')[0]
    const classes = useStyles();

    const handleClose = () => {
        setOpenEl(false)
    }

    const handleSubmit = (evt) => {
        setName(evt.target.value)
    }

    const handleUser = async () => {

        setLoad(true)
        animeReverse()
        Axios.post(`/apiCall/${name}/${idDecode}`).then(res => window.location.reload()).catch(err => console.error(err))
        document.querySelector('.form__input').value = ''
        setName('');
    }

    const handleLogout = () => {
        // provideHistory('/')
        setUser('')
        removeCookie('isLoggedinAdmin')
    }

    const handleDelete = async (evt) => {
        setOpenEl(false)
        await Axios.delete(`/apiCall/${elDelete}`).then(res => window.location.reload()).catch(err => console.error(err))
    }

    const handleOpen = async (evt) => {
        const userName = evt.target.parentElement.parentElement.parentElement.parentElement.querySelector('[name=mail]').value
        const password = evt.target.parentElement.parentElement.parentElement.parentElement.querySelector('[name=pass]').value

        setUserName(userName)
        setPassword(password)
        setOpen(true)

    }

    return (
        <>
            <User name={user} passWord={passWord} model='admin' open={open} setOpen={setOpen} />
            <div className="asc__container">
                <div className="asc__nav">
                    <h1 className='asc__nav__heading'>Welcome </h1>
                    <button id='submit' onClick={handleLogout} className='asc__btn asc__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Logout</button>
                </div>
            </div>
            <div className="admin__container">

                {load ? <Loader /> :
                    <div className="admin__header">
                        <button onClick={handleClick} className='admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Create User</button>
                        <div className="form__control">
                        </div>
                        <input placeholder='ASC Name' onChange={handleSubmit} onClick={handleChange} type="text" className='none form__input' name="admin" id="admin" />
                        <label className='form__label' htmlFor="name">ASC Name</label>
                        <div className="none btn__box">
                            <button id='submit' onClick={handleUser} className='m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Submit</button>
                            <button id='cancel' onClick={animeReverse} className='m-top admin__btn'><img className='admin__btn__img' src={addUser} alt="addUser" /> Cancel</button>
                        </div>
                    </div>
                }
                <div className="admin__users">
                    {Object.entries(apiData).map((x, i) => (
                        <Card key={uuid()} id={x[1].email} className={classes.root}>
                            <input type="hidden" name="pass" value={x[1].decoded} />
                            <input type="hidden" name="mail" value={x[1].email} />
                            <CardContent>
                                <Typography className={classes.title} color="textPrimary" gutterBottom>
                                    {x[1].email}
                                </Typography>
                                <CardActions>
                                    <Button target='_blank' color="primary" href={sheet + x[1].rainFall} variant="contained" size="small">RainFall Sheet</Button>
                                    <Button target='_blank' color="primary" href={sheet + x[1].tankWater} variant="contained" size="small">TankWater Sheet</Button>
                                </CardActions>
                                <CardActions className={classes.margin}>
                                    <Button onClick={handleOpen} variant="contained" size="small">User Details</Button>
                                    <Button target='_blank' href={fileUri + x[1].file} variant="contained" size="small">User Files</Button>
                                </CardActions>
                                <CardActions className={classes.margin}>
                                    <Button aria-label={x[1].email} onClick={() => {
                                        setOpenEl(true)
                                        setElDelete(x[1].email)
                                    }} variant="contained" color='secondary' size="small">Delete User</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    ))}
                    <Dialog open={openEl} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle>Warning !!!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Action Cannot be reversed !
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color='secondary' variant="contained" onClick={handleDelete}>
                                Delete User
                            </Button>
                            <Button color='primary' variant='contained' onClick={handleClose}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>

    )
}

export default Admin