import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
const slideData = [
  {
    title: "레시피",
    pic: "https://i.namu.wiki/i/WGsJjdq_YZ55OqLwDcVy03tPUDeuy2bFGjbv7hGdqeTxhugt9oQVd9skQTplZArzk64Id35mmLbkbcMwWEo2-g.webp",
  },
  {
    title: "레시피",
    pic: "https://file2.nocutnews.co.kr/newsroom/image/2023/01/21/202301210408091762_0.jpg",
  },
  {
    title: "레시피",
    pic: "https://img.sbs.co.kr/newsnet/etv/upload/2023/08/28/30000871570_1280.jpg",
  },
];
const Slide = () => {
  const [data, setData] = slideData;
  return (
    <div>
      <h1>Slide</h1>
      <div>
        {data && (
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.pic} alt={item.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Slide;
