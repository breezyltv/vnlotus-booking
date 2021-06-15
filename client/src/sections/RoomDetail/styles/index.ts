import styled from "styled-components";
import { Carousel, Card, Space } from "antd";
import { colorSchemes } from "../../../styles";

export const RoomContainer = styled.div`
  max-width: calc(1100px + 5.6rem);
  margin: auto;
  padding: 0 1rem;
`;

export const SpinDiv = styled.div`
  padding: 8rem 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
`;

export const CarouselRoomStyled = styled(Carousel)`
  background-color: #2f3640;
  padding: 4px 0;
  img {
    height: 420px;
  }
  /* the slides */
  .slick-slide {
    padding: 0 2px;
  }
  /* the parent */
  .slick-list {
    margin: 0 -2px;
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
    margin-left: 100px;
  }

  .slick-next {
    width: auto;
    height: auto;
    z-index: 5;
    margin-top: -20px;
    margin-right: 100px;
  }
  .slick-prev:hover,
  .slick-next:hover,
  .slick-prev:focus,
  .slick-next:focus {
    color: ${colorSchemes["main-color"]};
    background: rgba(255, 255, 255, 0.55);
  }
  @media (max-width: 575px) {
    img {
      height: 250px;
    }
    .slick-next,
    .slick-prev {
      z-index: -1;
    }
  }
`;
export const InfoDiv = styled(Space)`
  span.ant-typography {
    svg {
      font-size: 1.2em;
      margin-right: 1rem;
    }
  }
`;
export const AmenitiesDiv = styled.div`
  margin-bottom: 2rem;
`;
export const AmenitiesHeaderDiv = styled.div`
  margin: 2rem 0;
`;
export const FacilitiesDiv = styled.div``;
export const FacilitiesList = styled.ul`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  font-size: 0.875rem;
  color: #555;
  li {
    flex-basis: 33.33333%;
    margin-top: 12px;
    line-height: 2rem;
    span {
      margin-left: 0.75rem;
    }
  }
`;

export const RoomHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  align-items: center;
  background: linear-gradient(
    90deg,
    #ffa801,
    ${colorSchemes["main-color"]} 51%,
    #ffa801
  );

  box-shadow: 0 4px 12px 0 rgb(238 167 15 / 40%);
  span.ant-typography {
    font-size: 1.1em;
    font-weight: 500;
  }
  span:last-child {
    align-self: flex-end;
  }
`;

export const RequestBookingCard = styled(Card)``;
export const RequestBookingInput = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  button.ant-btn {
    margin-top: 2rem;
  }
`;

export const PickerCellStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 3px;

  span {
    margin: 0;
    padding: 0;
    z-index: 1;
  }
  span:last-child {
    font-size: 9pt;
    color: ${colorSchemes["second-main-color"]};
  }
`;

export const PriceBarDiv = styled.div`
  .price-banner {
    font-size: 2em;
    margin-right: 0.5rem;
  }
`;
