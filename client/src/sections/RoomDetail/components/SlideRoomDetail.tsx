import { Image, Typography, Space, Spin } from "antd";
import { CarouselRoomStyled } from "../styles";

import {
  LeftOutlined,
  RightOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { RoomDetail } from "../../../lib/api/graphql/queries";

interface Props {
  roomDetail: RoomDetail;
}

const slidesToShow = 3;

export const SlideRoomDetail = ({ roomDetail }: Props) => {
  const collection = roomDetail.room.image?.collection;
  const mainSlide = [];

  if (!collection) {
    for (let i = 0; i < slidesToShow + 1; i++) {
      mainSlide.push(
        <Image
          alt={roomDetail.room?.title}
          src={roomDetail.room?.image?.main}
          preview={false}
        />
      );
    }
  } else {
    mainSlide.push(
      <Image
        alt={roomDetail.room?.title}
        src={roomDetail.room?.image?.main}
        preview={false}
      />
    );
  }

  const gallery =
    collection &&
    collection.map((image, idx) => (
      <Image
        key={idx}
        alt={roomDetail.room?.title}
        src={image}
        preview={false}
      />
    ));

  return (
    <CarouselRoomStyled
      //autoplay
      //speed={500}
      lazyLoad="ondemand"
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
      {mainSlide}
      {gallery}
    </CarouselRoomStyled>
  );
};
