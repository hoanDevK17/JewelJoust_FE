import React from 'react'
import Slider from "react-slick";
import './carousel.scss'
import { Products } from '../../share-data/productData';
import { Link } from 'react-router-dom';
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


                {Products.map((product) => (
                    <div className='card' style={{

                    }}>
                        <img src={product.image} alt={product.name} />
                        <div className='info'>
                            <h1>{product.name}</h1>
                            <p>Start price :{product.price}</p>
                            <p>Time : {product.time}</p>
                        </div>
                        <div className='button-outside'>
                            <Link to={`detail/${product.id}`}>
                                <p><button className='button-detail'>Detail</button></p>
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider >
        </div >
    )
}
