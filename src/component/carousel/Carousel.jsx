import React from 'react'
import Slider from "react-slick";
import './carousel.scss'

export default function MyCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <div className='card'>
                        <img src='https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg' alt=''></img>
                    </div>
                    <h1>Diamond A</h1>
                    <p>Price:</p>
                    <button>Detail</button>
                </div>
                <div>
                    <div className='card'>
                        <img src='https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg' alt=''></img>
                    </div>
                    <h1>Diamond A</h1>
                    <p>Price: 2000$</p>
                </div>
                <div>
                    <div className='card'>
                        <img src='https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg' alt=''></img>
                    </div>
                    <h1>Diamond A</h1>
                    <p>Price: 2000$</p>
                </div>
                <div>
                    <div className='card'>
                        <img src='https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg' alt=''></img>
                    </div>
                    <h1>Diamond A</h1>
                    <p>Price: 2000$</p>
                </div>

            </Slider>
        </div>
    )
}
