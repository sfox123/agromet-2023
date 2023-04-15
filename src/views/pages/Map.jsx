import React, { useState, useEffect } from 'react'
import BarGraph from '../Graph/BarGraph'
import LineGraph from '../Graph/LineGraph'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Axios from '../../api/api';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function Map(props) {
    const { href } = props;
    const classes = useStyles();
    const [age, setAge] = React.useState(1);
    const [graph, setGraph] = React.useState(1);
    const [value, setValue] = useState([])
    const [apiData, setApiData] = useState([])

    const handleChange = (event) => {
        const val = event.target.value
        setAge(val);
        setValue(apiData[val])
    };

    const handleChangeGraph = (event) => {
        setGraph(event.target.value)
    };

    useEffect(async () => {
        await Axios.get('/weatherAPI').then(res => {
            setApiData(res.data)
            setValue(res.data[1])
        }).catch(err => console.error(err))
    }, [])
    return (
        <>
            <div className="chart__container">
                <h3>Chart</h3>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Station</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Alutwewa</MenuItem>
                        <MenuItem value={2}>Thanamalvila</MenuItem>
                        <MenuItem value={3}>Maduruketiya</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={graph}
                        onChange={handleChangeGraph}
                    >
                        <MenuItem value={1}>Bar Graph</MenuItem>
                        <MenuItem value={2}>Line Graph</MenuItem>
                    </Select>
                </FormControl>
                <Button variant='contained' href={href} target='_blank' color='primary'>Master File</Button>
                <div>
                    {graph == 1 ?
                        <BarGraph value={value} /> :
                        <LineGraph />}
                </div>
            </div>
        </>
    )
}