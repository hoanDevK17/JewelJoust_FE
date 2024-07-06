import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./carousel.scss";
import { Products } from "../../share-data/productData";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Typography } from "antd";
import { APIgetallSessionByStatus } from "../../api/api";
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
  const [data, setData] = useState();
  const fetchData = async () => {
    APIgetallSessionByStatus("INITIALIZED").then((response) => {
      console.log(response);
      setData(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return data?.length > 0 ? (
    <div className="slider-container">
      <Slider {...settings}>
        {data?.map((session, index) => {
          return (
            <div
              className="cards"
              key={index}
              onClick={() => {
                console.log("oke");
                navigate(`/detail/${session.id}`);
              }}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={session.auctionRequest.resources[0]?.path}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h1" component="div">
                      {session.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          );
        })}
      </Slider>
    </div>
  ) : (
    <></>
  );
}
