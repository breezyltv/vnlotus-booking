import { Link } from "react-router-dom";
import {
  CarouselStyled,
  SlideMultiItemDiv,
  SlideTopDestinationsContentDiv,
  TopDestinationsDiv,
  HeaderTitleSpace,
} from "../styles";
import { Typography, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import top1 from "../assets/top-destinations/location_1.jpg";
import top2 from "../assets/top-destinations/location_2.png";
import top3 from "../assets/top-destinations/location_6.png";
import top4 from "../assets/top-destinations/location_7.jpg";
import top5 from "../assets/top-destinations/location_22.png";
import top6 from "../assets/top-destinations/location_31.png";
const { Text, Title } = Typography;
const topLocations = [top1, top2, top3, top4, top5, top6];
export const TopDestinations = () => {
  return (
    <TopDestinationsDiv>
      <HeaderTitleSpace direction="vertical">
        <Title level={2}>Top Destinations</Title>
        <Text>
          "See the world: It's more fantastic than any dream made or paid for in
          factories" - Ray Bradbury
        </Text>
      </HeaderTitleSpace>
      <CarouselStyled
        dots={false}
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        arrows
        slidesToShow={5}
        slidesToScroll={1}
        draggable
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {topLocations.map((location) => (
          <Link to="/rooms/top-destinations/">
            <SlideMultiItemDiv>
              <SlideTopDestinationsContentDiv>
                <Title level={3}>San Diego</Title>
                <Text>10 Listings</Text>
              </SlideTopDestinationsContentDiv>
              <Image alt="top-destinations" src={location} preview={false} />
            </SlideMultiItemDiv>
          </Link>
        ))}
      </CarouselStyled>
    </TopDestinationsDiv>
  );
};
