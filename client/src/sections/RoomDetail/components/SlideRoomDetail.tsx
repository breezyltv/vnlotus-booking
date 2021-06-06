import { Image, Typography, Space, Spin } from "antd";
import { CarouselRoomStyled } from "../styles";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const SlideRoomDetail = () => {
  return (
    <CarouselRoomStyled
      //autoplay
      //speed={500}
      lazyLoad="progressive"
      dots
      dotPosition="bottom"
      prevArrow={<LeftOutlined />}
      nextArrow={<RightOutlined />}
      arrows
      draggable
      centerMode={true}
      infinite={true}
      slidesToShow={3}
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      <Image
        alt="1"
        src="https://cdn.luxstay.com/rooms/25418/large/room_25418_51_1562063937.jpg"
        preview={false}
      />
      <Image
        alt="1"
        src="https://cdn.luxstay.com/rooms/25418/large/room_25418_51_1562063937.jpg"
        preview={false}
      />
      <Image
        alt="1"
        src="https://cdn.luxstay.com/users/208376/Oy17y9GoAcWL1DOPses8zVSR.jpeg"
        preview={false}
      />
      <Image
        alt="1"
        src="https://cdn.luxstay.com/rooms/25418/large/room_25418_51_1562063937.jpg"
        preview={false}
      />
      <Image
        alt="1"
        src="https://cdn.luxstay.com/rooms/25418/large/room_25418_51_1562063937.jpg"
        preview={false}
      />
    </CarouselRoomStyled>
  );
};
