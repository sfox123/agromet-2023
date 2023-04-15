import React, { useEffect, useState } from 'react'
import logo from '../../img/3.png'
import axios from 'axios';
import Axios from '../../api/api';
const Drought = () => {
    const [checked, setChecked] = useState(0)
    const [apiData, setApiData] = useState('')
    const words = {
        0: { phrase: 'A drought is an event of prolonged shortages in the water supply, whether atmospheric (below-average precipitation), surface water or ground water. A drought can last for months or years, or may be declared after as few as 15 days. It can have a substantial impact on the ecosystem and agriculture of the affected region and harm to the local economy.' },
        1: { phrase: 'வறட்சி என்பது வளிமண்டல (சராசரிக்குக் குறைவான மழைப்பொழிவு), மேற்பரப்பு நீர் அல்லது நிலத்தடி நீர் என நீர்வழங்கல் நீடித்த பற்றாக்குறையின் ஒரு நிகழ்வாகும். வறட்சி மாதங்கள் அல்லது ஆண்டுகள் நீடிக்கும், அல்லது 15 நாட்களுக்குப் பிறகு அறிவிக்கப்படலாம்.' },
        2: { phrase: 'නියඟය යනු වායුගෝලීය (සාමාන්‍ය වර්ෂාපතනයට වඩා අඩු), මතුපිට ජලය හෝ භූගත ජලය වේවා ජල සැපයුමේ දීර් ages හිඟයකි. නියඟයක් මාස හෝ අවුරුදු ගණනක් පැවතිය හැකිය, නැතහොත් දින 15 කට පසුව ප්‍රකාශයට පත් කළ හැකිය. එය බලපෑමට ලක් වූ කලාපයේ පරිසර පද්ධතියට හා කෘෂිකර්මාන්තයට සැලකිය යුතු බලපෑමක් ඇති කළ හැකි අතර දේශීය ආර්ථිකයට හානියක් විය හැකිය.' }
    }
    const { phrase } = words[checked];

    const handleChange = (evt) => {
        const english = document.querySelector('.radio__btn');
        english.classList.contains('radio__selected') && english.classList.remove('radio__selected')
        setChecked(evt)
    }
    // useEffect(() => {
    //     async function getData() {
    //         await Axios.get('/getWeather/3').then(({ data }) => setApiData(data)).catch(err => console.error(err));
    //     }
    //     getData();
    // }, [])
    return (
        <section className='section__drought'>
            <div className='section__drought__main section__drought__main__img'>
                <div className="drought">
                    <div className="drought__title">
                        <h1 className="section__title">Drought Analysis</h1>
                        <img className="section__title__image" src={logo} alt="sun" />
                    </div>
                    <div className="drought__para">
                        <p>{phrase}</p>
                    </div>
                    <div className="drought__radio">
                        <div className="drought__radio__group">
                            <input className='radio' type="radio" name="lang" id="english" />
                            <label onClick={() => handleChange(0)} htmlFor="english" className='radio__label'>
                                <span className="radio__btn radio__selected"></span>
                                English
                            </label>
                        </div>
                        <div className="drought__radio__group">
                            <input className='radio' type="radio" name="lang" id="sin" />
                            <label onClick={() => handleChange(2)} htmlFor="sin" className='radio__label'>
                                <span className="radio__btn"></span>
                                Sinhala
                            </label>
                        </div>
                        <div className="drought__radio__group">
                            <input className='radio' type="radio" name="lang" id="tamil" />
                            <label onClick={() => handleChange(1)} htmlFor="tamil" className='radio__label'>
                                <span className="radio__btn"></span>
                                Tamil
                            </label>
                        </div>
                    </div>
                    <div className="drought__box">
                        <a className='drought__btn' rel="noreferrer" target='_blank' href={apiData[0]}>Drought Bulletin 2021</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Drought;