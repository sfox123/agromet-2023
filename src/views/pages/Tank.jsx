import React, { useEffect, useState } from 'react'
import logo from '../../img/1.png'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import BarChart from './Chart'
import FormControl from '@material-ui/core/FormControl';

import Axios from '../../api/api';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    marginBottom: {
        marginBottom: '2rem'
    }
}));
//https://docs.google.com/spreadsheets/d/1z_GnYRfXM-KveUH0sFe73hfIZwdhnoxW4FRM4f2xA7g/export?format=xlsx
const mS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const mY = ['2021', '2022', '2023', '2024', '2025']
const url = 'https://docs.google.com/spreadsheets/d/1QzLYOrijo-dZJNh9Qs_jiB1RuruGsljyYYqRXoSQ3ms/export?format=xlsx';
const Tank = () => {
    const classes = useStyles()
    const [apiData, setApiData] = useState([])
    const [value, setValue] = React.useState('January');
    const [valueYear, setValueYear] = React.useState('2021');
    const [data, setData] = useState([])

    useEffect(async () => {
        let dataArr = [];
        let tmpArr = [];

        if (apiData.length === 0) {
            await Axios.get('/getRowMaster').then(({ data }) => { dataArr.push(data) }).catch(err => console.error(err)).finally(() => { setApiData(dataArr) });
        }

        if (data.length === 0) {
            apiData.map((x, i) => {
                tmpArr.push(['Tank-Name', `Early-January`, `Mid-January`]);
                x.map((y, z) => {
                    if (z > 0) {
                        tmpArr.push([y[0], parseInt(y[3]), parseInt(y[4])]);
                    }
                })
            })
            setData(tmpArr);
        }

    }, [data, apiData]);

    const handleChange = (event) => {
        let tmpArr = [];
        const val = event.target.value
        let index = mS.indexOf(val);

        setValue(val);
        apiData.map((x, i) => {
            tmpArr.push(['Tank-Name', `Early-${val}`, `Mid-${val}`]);
            x.map((y, z) => {
                if (z > 0) {
                    tmpArr.push([y[0], parseInt(y[(index * 2) + 3]), parseInt(y[(index * 2) + 4])])
                }
            })
        })
        setData(tmpArr);
    };

    const handleChangeYear = (event) => {
        let tmpArr = [];
        const val = event.target.value
        let index = mY.indexOf(val);

        setValueYear(val);
        if (index > 0) {
            alert("The Year Exceeding Current year")
            setValueYear('2021')
        }
        // apiData.map((x, i) => {
        //     tmpArr.push(['Station-Name', `${val}`]);
        //     x.map((y, z) => {
        //         if (z > 0) {
        //             tmpArr.push([y[0], parseInt(y[(index) + 3])])
        //         }
        //     })
        // })
        // setData(tmpArr);
    };


    return (
        <div className="section">
            <div className="section__title__box">
                <h1 className="section__title">Tank-Water Level</h1>
                <img className="section__title__image" src={logo} alt="sun" />
            </div>
            <div className="content__api">
                <FormControl className={classes.formControl, classes.marginBottom}>
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label='January'
                        onChange={handleChange}
                    >
                        {mS.map((x, i) => (
                            <MenuItem key={i} value={x}>{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl, classes.marginBottom}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valueYear}
                        label='January'
                        onChange={handleChangeYear}
                    >
                        {mY.map((x, i) => (
                            <MenuItem key={i} value={x}>{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button href={url} target='_blank' variant='contained' style={{ marginLeft: '2rem', marginTop: '1rem' }} color='primary'>Download Sheet</Button>
                <BarChart data={data} title='Tank-Water Level' />
            </div>
        </div>
        // </div >
    )

}

export default Tank;