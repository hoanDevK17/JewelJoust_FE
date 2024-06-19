import React from "react";
import Slider from "react-slick";
import "./carousel.scss";
import { Products } from "../../share-data/productData";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from "@mui/material";
import { Typography } from "antd";
// export default function MyCarousel() {
//   const navigate = useNavigate();
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           arrows: false,
//           centerMode: true,
//           centerPadding: "40px",
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           arrows: false,
//           centerMode: true,
//           centerPadding: "40px",
//           slidesToShow: 3,
//         },
//       },
//     ],
//   };
//   return (
//     <div className="slider-container">
//       <Slider {...settings}>
//         {Products.map((product, index) => (
//           <div
//             key={index}
//             className="card"
//             style={{}}
//             onClick={() => {
//               console.log("oke");
//               navigate(`/detail/${product.id}`);
//             }}
//           >
//             <img src={product.image} alt={product.name} />
//             <div className="info">
//               <h1>{product.name}</h1>
//               <p>Start price :{product.price}</p>
//               <p>Time : {product.time}</p>
//             </div>
//             <div className="button-outside">
//               {/* <Link to={``}>
//                 <p>
//                   <button className="button-detail">Detail</button>
//                 </p>
//               </Link> */}
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }


export default function MyCarousel() {
  const navigate = useNavigate();
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
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {Products.map((product, id) => (
          <div className="cards"
          key={id}
            onClick={() => {
              console.log("oke");
              navigate(`/detail/${product.id}`);
            }}
          >
            <Card  sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h1" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
