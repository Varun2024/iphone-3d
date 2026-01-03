import React from 'react'
import Logo from '../assets/images/logo.svg';
import Search from '../assets/images/search.svg';
import Store from '../assets/images/store.svg';
function Nav() {
    return (
        // NAV: for semantic purposes of nav bar
        <nav
            className="nav-wrapper">
            {/* for styling purposes */}
            <div className="nav-content">
                <ul className='list-styled'>
                    <li>
                        <img
                            src={Logo}
                            alt="Logo"
                        />
                    </li>
                    <li>
                        <a className='link-styled'>Store</a>
                    </li>
                    <li>
                        <a className='link-styled'>Mac</a>
                    </li>
                    <li>
                        <a className='link-styled'>iPad</a>
                    </li>
                    <li>
                        <a className='link-styled'>iPhone</a>
                    </li>
                    <li>
                        <a className='link-styled'>Airpods</a>
                    </li>
                    <li>
                        <a className='link-styled'>TV & Home</a>
                    </li>
                    <li>
                        <a className='link-styled'>Entertainment</a>
                    </li>
                    <li>
                        <a className='link-styled'>Accessories</a>
                    </li>
                    <li>
                        <a className='link-styled'>Support</a>
                    </li>
                    <li>
                        <img src={Search} alt="Search" />
                    </li>
                    <li>
                        <img src={Store} alt="Store" />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;