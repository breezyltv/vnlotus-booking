import { Link } from "react-router-dom";
import { CarouselStyled, InstructionDiv, HeaderTitleSpace } from "../styles";
import { Typography, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ins1 from "../assets/instruction/ins-booking.jpg";
import ins2 from "../assets/instruction/ins-coupons.jpg";
import ins3 from "../assets/instruction/ins-bank.jpg";
import ins4 from "../assets/instruction/ins-online.jpg";
import ins5 from "../assets/instruction/ins-faq.jpg";
const { Text, Title } = Typography;
const services = [ins1, ins2, ins3, ins4, ins5];
export const Instruction = () => {
  return (
    <InstructionDiv>
      <HeaderTitleSpace direction="vertical">
        <Title level={2}>Service Guild</Title>
        <Text>Swift booking, simple payment</Text>
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
        {services.map((item, idx) => (
          <Link key={idx} to="/faq/">
            <div>
              <Image alt="faq" src={item} preview={false} />
            </div>
          </Link>
        ))}
      </CarouselStyled>
    </InstructionDiv>
  );
};
