import React from 'react'
import '../css/Home.css'
import HomeLogo from '../assets/images/11.png'
import Image from "react-bootstrap/esm/Image";
export default function Home() {
  return (
    <>
        <div className="Home">
        <div className="HomeContainer container">
          <div className="row">
            <div className="col">
              <h1 className="text-center home-heading">
                Welcome to Newsify! Your World. <br /> Your News. Delivered
                Instantly.
              </h1>
              <p className="text-center home-desc">
                At Newsify, we believe in keeping you informed with the news
                that matters most—tailored just for you. From breaking headlines
                to deep-dive features, Newsify brings you real-time updates,
                personalized to your interests. Get the latest news, anytime,
                anywhere.
              </p>
              <Image src={HomeLogo} className="home-logo" fluid />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
