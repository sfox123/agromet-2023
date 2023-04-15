import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import logo from '../../img/0.png'
import Axios from '../../api/api'
import { Button, Link } from '@material-ui/core'

const Agromet = (props) => {
    const [archOne, setArchOne] = useState(true);
    const [apiData, setApiData] = useState([])
    const [info, setInfo] = useState([])
    const [load, setLoad] = useState(true)
    const [aList, setAList] = useState([]);
    const [open, setOpen] = useState(false);
    const [dLoad, setDLoad] = useState(true);
    const [link, setLink] = useState({});
    const [linkHead, setLinkHead] = useState([])
    const [head, setHead] = useState('');

    useEffect(() => {
        const fetchData = async () =>{
            const tmp = [];
            let TMP = [];
            let tmpLink = {};
            await Axios.get('/getWeather/0').then(({ data }) => { setApiData(data) }).catch(err => console.error(err));
            await Axios.get('/getAdvisory').then(({ data }) => { setInfo(data) }).catch(err => console.error(err))
            if (aList.length == 0) {
                info.map((x, i) => { tmp.push(x.author) })
    
                TMP = tmp.filter(function (item, pos, self) {
                    return self.indexOf(item) === pos;
                })
    
                info.map((x, i) => {
                    tmpLink[`${x.author + "-" + i}`] = [x.name, x.link];
                })
                setAList(TMP)
                setLink(tmpLink);
            }
            setLoad(false)
        }
        fetchData()
    }, [])

    const handleClick = (evt) => {
        setArchOne(!archOne)
        let node = evt.target.parentNode.parentNode;
        const elTime = {
            duration: 400,
        }
        node.animate([
            {
                transform: 'rotate(0)',
            },
            {
                transform: 'rotateY(-180deg)',
            }
        ], elTime)

    }

    function handleClose() {
        setOpen(false);
    }

    function handleList(e) {
        const label = e.target.ariaLabel;
        setHead(label);
        setOpen(true);

    }

    function handleOpen() {
        setDLoad(false);
        setOpen(true);
    }

    return (
        <>
            
                <div className="section">
                    <div className="section__title__box">
                        <h1 className="section__title">Agromet Advisory</h1>
                        <img className="section__title__image" src={logo} alt="sun" />
                    </div>
                    <div className="content">
                        <div className="content__national">
                            <div className="content__picture content__picture__1">
                                &nbsp;
                            </div>
                            <h4 className="content__title content__title__1">
                                <span>National Level</span>
                            </h4>
                            {load ?
                            <div className="content__body content__body__loading">
                                <h2 className='content__body__loading__h2'></h2>
                                <p className='content__body__loading__p'></p>
                                <p className='content__body__loading__p'></p>
                            </div> :
                            <div className="content__body">
                                <a href={apiData[0]} target='_blank' rel="noreferrer" className='content__btn'>Sinhala Version</a>
                                <a href={apiData[1]} target='_blank' rel="noreferrer" className='content__btn'>Tamil Version</a>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="content">
                        <div className="content__local">
                            {archOne ?
                                <>
                                    <div className="content__picture content__picture__2">
                                        &nbsp;
                                    </div>
                                    <h4 className="content__title content__title__2">
                                        <span>Local Level</span>
                                    </h4>
                                    <div className="content__body">
                                        {aList.map((x, i) => (
                                            <a href='#' key={i} aria-label={x} onClick={handleList} className='content__btn'>{x}</a>
                                        ))}
                                    </div>
                                </> :
                                <div className='content__arch'>
                                    <h4 className='content__arch__title'>
                                        Archived Advisories
                                    </h4>
                                    <div className="content__arch__body">
                                        {info.map((x, i) => (
                                            <a href={x.link} key={i} className='content__arch__link'>{x.name}</a>
                                        ))}
                                        <a id='close' onClick={handleClick} className='m-bot content__btn content__btn__archive'>{'<<- Back'}<span className='content__btn__archive__span'>{'->>'}</span></a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{head}</DialogTitle>
                <DialogContent>
                    {Object.keys(link).map((x, i) => (
                        x.split("-")[0] == head && <Button target='_blank' rel='noreferr' href={link[x][1]} key={i}>{link[x][0]}</Button>
                    ))}

                </DialogContent>
            </Dialog>
        </>
    )
}

export default Agromet;