import styled from "styled-components";
import { Carousel, Space } from "antd";
import { Container, colorSchemes } from "../../../styles";
import promo_host from "../assets/promo/host3.jpg";
export const HomeContainer = styled(Container)`
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const CarouselStyled = styled(Carousel)`
  /* the slides */
  .slick-slide {
    padding: 0 0.5rem;
  }
  /* the parent */
  .slick-list {
    margin: 0 -0.5rem;
  }
  .slick-arrow {
    color: ${colorSchemes["second-main-color"]};
    z-index: 10;
    //border: 1px solid ${colorSchemes["second-main-color"]};
    font-size: 12pt;
    background: rgba(255, 255, 255, 0.75);
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 7px -4px #000;
  }
  .slick-dots {
    z-index: 5;
  }
  .slick-dots li.slick-active button {
    background: ${colorSchemes["main-color"]};
  }
  .slick-dots li button {
    height: 5px;
    background: ${colorSchemes["second-main-color"]};
  }
  .slick-prev {
    width: auto;
    height: auto;
    z-index: 5;
    margin-top: -20px;
  }

  .slick-next {
    width: auto;
    height: auto;
    z-index: 5;
    margin-top: -20px;
  }
  .slick-prev:hover,
  .slick-next:hover,
  .slick-prev:focus,
  .slick-next:focus {
    color: ${colorSchemes["main-color"]};
    background: rgba(255, 255, 255, 0.55);
  }
  .slick-active .slide-detail {
    animation-name: fadeInUpSD;
    animation-duration: 1s;
    opacity: 1;
  }

  @-webkit-keyframes fadeInUpSD {
    0% {
      opacity: 0;
      -webkit-transform: translateY(100px);
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInUpSD {
    0% {
      opacity: 0;
      -webkit-transform: translateY(100px);
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @media (max-width: 768px) {
    .slick-prev,
    .slick-next {
      display: none !important;
      z-index: -19;
    }
  }
`;

export const TopDestinationsDiv = styled.div`
  margin: 3rem 0;
`;

export const InstructionDiv = styled.div`
  margin: 3rem 0;
`;

export const HeaderTitleSpace = styled(Space)`
  margin: 20px 0;
`;

export const SlideMultiItemDiv = styled.div`
  //padding: 6px;
  .ant-image-img {
    border-radius: 8px;
    height: 290px;
    object-fit: cover;
    object-position: top center;
  }
`;

export const SlideTopDestinationsContentDiv = styled.div`
  position: absolute;
  z-index: 19;
  bottom: 10%;
  margin-left: 1.2rem;
  h3.ant-typography,
  span.ant-typography {
    color: #fff;
    font-weight: 500;
  }
`;

export const SlideContentDiv = styled.div`
  text-align: center;

  .slide-detail {
    position: absolute;
    width: 100%;
    z-index: 19;
    top: 40%;
    color: ${colorSchemes["main-text-color"]};
    .slide-title {
      padding: 5px 17px 10px;
      font: italic 40px/45px "Poly", georgia;
      letter-spacing: -0.5px;
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 1px 1px 0 rgb(0 0 0 / 10%);
      border-radius: 5px;
    }
  }
  .ant-image-img {
    height: 600px;
    border-radius: 8px;
    object-fit: cover;
    object-position: top center;
  }
  @media (max-width: 768px) {
    .slide-detail {
      .slide-title {
        font-size: 1.5em;
      }
    }
  }
`;

export const IntroHeaderSpace = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: -70px;

  .intro-header-detail {
    z-index: 20;
    text-align: center;
    margin: 0 4rem;
    //border: 2px solid ${colorSchemes["main-color"]};
    color: ${colorSchemes["second-main-color"]};
    border-radius: 10px;
    //border: 1px solid ${colorSchemes["main-text-color"]};
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25); //1px 1px 0 rgb(0 0 0 / 10%);
    padding: 1rem 1.2rem;
    span.ant-typography {
      font-size: 1.1em;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: -145px;
    .intro-header-detail {
      padding: 0.8rem;
      margin: 15px 10px;
      h2.ant-typography {
        font-size: 2em;
      }
    }
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    margin-top: -110px;
    .intro-header-detail {
      padding: 0.8rem;
      margin: 15px 10px;
      h2.ant-typography {
        font-size: 2em;
      }
    }
  }
`;

export const RoomTypeMenuSpace = styled(Space)`
  min-width: 350px;
  justify-content: center;
  z-index: 29;
  a {
    font-size: 1.2em;
    font-weight: 500;
    padding: 5px 10px;
    color: ${colorSchemes["color-black"]};
    //border: 1px solid ${colorSchemes["second-main-color"]};
    background: rgba(255, 255, 255, 0.35);
    border-radius: 10px;
    transition: background 0.3s;
  }
  a:hover {
    color: ${colorSchemes["second-main-color"]};
    background: rgba(246, 185, 59, 0.55);
  }
`;

export const PromoBecomeHostDiv = styled.div`
  margin: 4rem 0;
  border-radius: 10px;
  background-image: url(${promo_host});
  min-height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  .promo-host-content {
    margin: 170px 50px;
    h2.ant-typography,
    span.ant-typography {
      color: #fff;
    }
    h2.ant-typography {
      font-size: 3em;
    }
    span.ant-typography {
      font-size: 1.2em;
    }
  }
`;
