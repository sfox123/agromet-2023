import React, { useEffect, useState } from 'react'
import logo from '../../img/2.png'
import BarChart from './Chart'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Donut from './Donut'
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

const mS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const mY = ['2021', '2022', '2023', '2024', '2025']

const Rainfall = () => {
    const classes = useStyles()
    const [apiData, setApiData] = useState([])
    const [valueYear, setValueYear] = React.useState('2021');
    const [url, setUrl] = useState('https://docs.google.com/spreadsheets/d/1z_GnYRfXM-KveUH0sFe73hfIZwdhnoxW4FRM4f2xA7g/export?format=xlsx')
    const [data, setData] = useState([]);
    const [menuItem, setMenuItem] = useState([]);
    const [value, setValue] = React.useState('Station-Name');
    const [item, setItem] = useState([]);

    // useEffect(async () => {
    //     let dataArr = [];
    //     let tmpArr = [];

    //     if (apiData.length === 0) {
    //         await Axios.get('/getRainMaster').then(({ data }) => { dataArr.push(data) }).catch(err => console.error(err)).finally(() => { setApiData(dataArr) });
    //     }

    //     if (data.length === 0) {
    //         apiData.map((x, i) => {
    //             tmpArr.push(['Month', `Station-Name`]);
    //             x.map((y, z) => {
    //                 if (z > 0) {
    //                     tmpArr.push([y[0], parseInt(y[3])]);
    //                 }
    //             })
    //         })
    //         setData(tmpArr);
    //     }

    //     if (menuItem.length === 0) {
    //         let menuArr = [];
    //         let MonthArr = [];
    //         apiData.map((x, i) => {
    //             x.map((y, z) => {
    //                 if (z > 0) {
    //                     menuArr.push(y[0]);
    //                     y.map((o, p) => {
    //                         if (p > 2 && y[0] === menuArr[0]) {
    //                             MonthArr.push([mS[p - 3], parseInt(o)]);
    //                         }
    //                     })
    //                 }
    //             })
    //         })
    //         setValue(menuArr[0])
    //         MonthArr.unshift([`Month`, menuArr[0]])
    //         setItem(MonthArr);
    //         setMenuItem(menuArr)
    //     }

    // }, [apiData, data, menuItem])

    const handleChange = (event) => {
        const val = event.target.value

        let menuArr = [];
        let MonthArr = [];
        apiData.map((x, i) => {
            x.map((y, z) => {
                if (z > 0) {
                    menuArr.push(y[0]);
                    y.map((o, p) => {
                        if (p > 2 && y[0] === val) {
                            MonthArr.push([mS[p - 3], parseInt(o)]);
                        }
                    })
                }
            })
        })
        setValue(val)
        MonthArr.unshift([`Month`, val])
        setItem(MonthArr);
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
    };

    return (
        <div className="section">
            <div className="section__title__box">
                <h1 className="section__title">Rainfall Analysis</h1>
                <img className="section__title__image" src={logo} alt="sun" />
            </div>
            <div className="content__api">
                <FormControl className={[classes.formControl, classes.marginBottom]}>
                    <InputLabel id="demo-simple-select-label">Station Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label='Station Name'
                        onChange={handleChange}
                    >
                        {menuItem.map((x, i) => (
                            <MenuItem key={i} value={x}>{x}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={[classes.formControl, classes.marginBottom]}>
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
                <Button href={url} variant='contained' style={{ marginLeft: '2rem', marginTop: '1rem' }} color='primary'>Download Sheet</Button>
                <BarChart data={item} title='Rainfall - Measurements' />
                {/* <div className="content__national">
                    <div className="content__picture content__picture__1">
                        &nbsp;
                    </div>
                    <h4 className="content__title content__title__1">
                        <span>Local Level</span>
                    </h4>
                    <div className="content__body">
                        <a target='_blank' href={apiData[0]} className='content__btn'>Moneragala</a>
                        <a target='_blank' href={apiData[1]} className='content__btn'>Mulaitivu</a>
                    </div>
                </div> */}
            </div>
        </div>
    )

}

export default Rainfall