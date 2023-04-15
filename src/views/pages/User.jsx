import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from '../../api/api'

export default function FormDialog(props) {
    const { open, setOpen, name, passWord, Id, model } = props
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')

    const updateHandler = async (e) => {
        e.preventDefault()
        await Axios.post(`/users/${name}`, { 'password': password, 'model': model }).then(({ data }) => {
            window.location.reload();
        }).catch(err => console.error(err))
    }

    return (
        <div>
            <form onSubmit={updateHandler}>
                <Dialog open={open} onClose={() => { setOpen(false); setShowPassword(false) }}
                    aria-labelledby="form-dialog-title"
                    disablePortal
                >
                    <DialogTitle id="form-dialog-title">User Details</DialogTitle>
                    <DialogContent
                        style={{ height: '125px', width: '300px' }}
                    >
                        <InputLabel htmlFor="name">Email</InputLabel>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            type="text"
                            value={name}
                            fullWidth
                        />
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            defaultValue={passWord}
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={(e) => e.preventDefault}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" type="submit" color='secondary'>
                            Update
                        </Button>
                        <Button variant="contained" onClick={() => setOpen(false)} color='secondary'>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}