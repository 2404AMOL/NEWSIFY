import React from 'react'
import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faInstagram,faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="Footer container-fluid" >
        <div className="row">
            <div className="col">
                <p>�� 2024 Newsify. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                </ul>
            </div>
            <div className="col">
                <p>� Newsify is a news website that delivers real-time updates.</p>
                <ul className="social-media-links">
                <li>
                    <FontAwesomeIcon className='icons' icon={faFacebook}/>
                    <a href="">Facebook</a>
                </li>
                <li>
                    <FontAwesomeIcon className='icons' icon={faTwitter}/>
                    <a href="">Twitter</a></li>
                <li>
                    <FontAwesomeIcon className='icons' icon={faInstagram}/>
                    <a href="">Instagram</a>
                </li>
                <li>
                    <FontAwesomeIcon className='icons' icon={faYoutube}/>
                    <a href="">Youtube</a>
                </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
