import { Button, Carousel } from 'antd';
import React from 'react'
import './headeCarousel.scss'
import { useNavigate } from 'react-router-dom';
export default function HeadCarousel() {
    const navigate = useNavigate()
    return (
        <div className=" banner">
            <Carousel autoplay className="carousel">
                <div >
                    <img src="https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg" alt="" />
                    <div  style={{ position: "absolute", zIndex: "10000", top: "85px" }}>
                        <h1 className="annouce">Auction Registeration</h1>
                        <div   className='inside-item' >
                            <button  className='button-num1'onClick={() => {
                                navigate('/registration')
                            }}>
                              <p>Register</p>
                            </button>
                            </div>
                    </div>
                </div>
                <div>
                    <img src="https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2024/04/042324_ec_lab-diamonds_feat.jpg?w=1440&ssl=1" alt="" />
                </div>
            </Carousel>
        </div>
    )
}
