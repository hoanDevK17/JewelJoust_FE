import { Carousel, Image } from "antd";
import React from "react";
const contentStyle = {
  height: "400px",
  color: "#fff",
  display: "flex",
  textAlign: "center",
  background: "#364d79",
  justifyContent: "center",
  alignItems: "center",

  //   borderRadius: "16px",
};
let data = [
  {
    src: "/banner2.jpg",
  },
  {
    src: "https://dam.bluenile.com/images/public/20446/5_loose_diamonds_in_varying_cuts_and_1_round_engagement_ring.jpeg",
  },
  {
    src: "https://dam.bluenile.com/images/public/21095/Blue%20Nile%20Diamond%20Jewelry.jpeg",
  },

  // {
  //   // src: "/banner6.jpg",
  // },
  // {
  //   src: "/banner4.jpg",
  // },
  {
    src: "/banner6.jpg",
  },
];
export default function CarouselAntd() {
  return (
    <Carousel
      autoplay
      autoplaySpeed={2000}
      dots={false}
      arrows={true}
      style={{ borderRadius: "25px", overflow: "hidden", height: "400px" }}
    >
      {data?.map((banner) => (
        <>
          <Image
            // height={300}
            width={"100%"}
            about=""
            preview={false}
            src={banner.src}
          ></Image>
        </>
      ))}
    </Carousel>
  );
}
