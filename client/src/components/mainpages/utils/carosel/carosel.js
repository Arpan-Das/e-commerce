import React, { useContext,} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { GlobalState } from "../../../../GlobalState";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./carosel.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Carosel() {
  const state = useContext(GlobalState);
  const [carosel] = state.caroselAPI.carosel;

  return (
    <div className="swiper">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        <div padding="10px" margin-top="15px">
          {carosel.map((carosel) => (
            <SwiperSlide>
              <div key={carosel.id}>
                <img src={carosel.images.url} alt=" " />
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
