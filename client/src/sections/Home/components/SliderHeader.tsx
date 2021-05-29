import { Image, Typography, Space, Spin } from "antd";
import { SlideContentDiv, CarouselStyled } from "../styles";
import slide7 from "../assets/slide/slide-7.jpg";
import slide8 from "../assets/slide/slide-8.jpg";
import slide9 from "../assets/slide/slide-9.jpg";
import { CustomButton } from "../../../styles/";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const SliderHeader = () => {
  return (
    <CarouselStyled
      autoplay
      //speed={500}
      lazyLoad="progressive"
      dots
      dotPosition="top"
      prevArrow={<LeftOutlined />}
      nextArrow={<RightOutlined />}
      arrows
      effect="fade"
      draggable
    >
      <SlideContentDiv>
        <div className="slide-detail">
          <Space direction="vertical" size={30}>
            <Text className="slide-title">A Gourmet Dining Experience</Text>
            <CustomButton type="primary" size="large">
              Explore The Menu
            </CustomButton>
          </Space>
        </div>
        <Image alt="1" src={slide8} preview={false} />
      </SlideContentDiv>
      <SlideContentDiv>
        <div className="slide-detail">
          <Space direction="vertical" size={30}>
            <Text className="slide-title">Modern Rooms & Spacious Suites</Text>
            <CustomButton type="primary" size="large">
              See Accommodation
            </CustomButton>
          </Space>
        </div>
        <Image alt="1" src={slide7} preview={false} />
      </SlideContentDiv>
      <SlideContentDiv>
        <div className="slide-detail">
          <Space direction="vertical" size={30}>
            <Text className="slide-title">Make your holyday special</Text>
            <CustomButton type="primary" size="large">
              Explore The Hotel
            </CustomButton>
          </Space>
        </div>
        <Image alt="1" src={slide9} preview={false} />
      </SlideContentDiv>
    </CarouselStyled>
  );
};
