import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import Agromet from './pages/Agromet'
import Drought from './pages/Drought'
import Rainfall from './pages/Rainfall'
import Tank from './pages/Tank'
import Weather from './pages/Weather'
import Forecast from './pages/Forecast'
import Login from './pages/Login'

import '../styles/Nav.css'

import logo from '../img/logo.png'
import { Link } from 'react-router-dom'

const handleResponse = (evt) => {

    const el = document.querySelector('.ul').classList;
    if (el.contains('bar__ul')) {
        el.toggle('bar__ul');
        el.toggle('bar__ul__phone');
    } else {
        el.toggle('bar__ul');
        el.toggle('bar__ul__phone');
    }
}

const Nav = () => {

    const navItems = ["Agromet Advisory", "Rainfall Measurements", "Tank-Water Levels", "Weather forecast", "Drought Bulletin", "weather around your location"];
    const [active, setActive] = useState("0");
    const [open, setOpen] = useState(false)

    const handleClick = (btn) => {
        setOpen(false)
        handleResponse()
        const className = btn.currentTarget.id
        setActive(className)
        const arr = document.getElementsByClassName("bar__list");

        for (let i = 0; i < arr.length; i++) {
            if (i === 6) {
                document.querySelector('.bar__list__selected').classList.remove('bar__list__selected');
            }
            else if (i === className) {
                arr[i].classList.add("bar__list__selected")
            } else {
                arr[i].classList.remove("bar__list__selected")
            }
        }
    }

    const handleOpen = () => {
        handleResponse()
        setOpen(!open)
    }

    return (
        <>
            <div className="container">
                <div className='Nav'>
                    <div className="Nav__logobox" >
                        <a href="/" className="Nav__home">
                            <img src={logo} alt="logo" className='Nav__logo' />
                        </a>
                    </div>

                    <div >
                        <button onClick={handleClick} id={6} className="login">LOGIN</button>
                    </div>
                </div>
                <div className="bar media_">
                    <div className="bar__items">
                        <ul className="ul bar__ul">
                            {open === false && (
                                <li key='10' onClick={handleOpen} className='bar__bar'><a href="#" className='bar__link'><FontAwesomeIcon icon={faBars} /> </a></li>
                            )
                            }
                            {navItems.map((x, i) => (
                                <li onClick={handleClick} id={i} key={i} className={`bar__list ${i == 0 ? 'bar__list__selected' : null}`}><a href="#" className='bar__link'>{x}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {active === "0" && <Agromet />}
                    {active === "2" && <Tank />}
                    {active === "1" && <Rainfall />}
                    {active === "4" && <Drought />}
                    {active === "5" && <Weather />}
                    {active === "3" && <Forecast />}
                    {active === "6" && <Login />}
                </div>
            </div>
        </>
    )
}

export default Nav;