import React from 'react';
import Iphone from '../assets/images/iphone-14.jpg';
import HoldingIphone from '../assets/images/iphone-hand.png'
function Jumbotron() {
    return (
        <div className="jumbotron-section wrapper">
            <h2 className='title'>New</h2>
            <img src={Iphone} className='logo' alt="14pro" />
            <p className='text'>Big and bigger</p>
            <span className='description'>
                From $41.62/mo. for 24 mo. or $999 before trade‑in.
            </span>
            <ul className='links'>
                <li>
                    <button className='button'>Buy</button>
                </li>
                <li>
                    <a className='link'>Learn more</a>
                </li>
            </ul>
            <img src={HoldingIphone} className='iphone-img' alt="holding iphone" />
        </div>
    );
}

export default Jumbotron;