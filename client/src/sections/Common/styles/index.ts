import styled from "styled-components";
import { Container, colorSchemes } from "../../../styles";
import { Card, Button, Row } from "antd";
export const BannerStyled = styled.section`
  background: linear-gradient(90deg, #ffa801, #ffc048 51%, #ffa801);
  padding: 3rem 0 5rem;
  h1 {
    font-size: 20pt;
  }
  span {
    font-size: 13pt;
  }
  /* @media (max-width: 767px) {
    margin-top: -2.875rem;
  } */
`;

export const CommonContainer = styled(Container)`
  padding: 1rem;
`;

export const MediaDiv = styled.div`
  margin-top: 1rem;
  .ant-image-img {
    width: 55px;
    height: 70px;
  }
`;

export const ListingCardWrapper = styled(Card)`
  border-radius: 5px;
  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .ant-card-body {
    padding: 0 1rem 1rem 1rem;
  }
  .ant-card-meta-description {
    span {
      font-size: 12pt;
      font-weight: 600;
    }
  }
  .ant-card-cover .ant-image-error:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 66.2069%;
    img.ant-image-img {
      z-index: -1;
    }
  }
`;

export const MetaInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 10pt;
  span:first-child {
    color: ${colorSchemes["color-gray"]};
    svg {
      margin-right: 7px;
    }
  }
`;

export const MetaPromoDiv = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  justify-content: space-between;
  padding: 0.4rem 1rem 1rem 1rem;
  align-items: center;
  font-size: 14pt;
  .promo__label {
    font-size: 0.75rem;
    background: ${colorSchemes["main-color"]};
    color: #fff;
    border-radius: 1.5rem;
    letter-spacing: 0.5px;
    line-height: 1.375rem;
    padding: 0 0.5rem;
  }
`;

export const WishlistButton = styled(Button)`
  color: #fafafa;
  padding: 0;
  span {
    font-size: 16pt;
    animation: add-to-wishlist 0.5s steps(30);
    transition: 0.5s ease steps(30);
  }
  :hover {
    color: ${colorSchemes["color-red"]};
  }
  :focus {
    color: #fafafa;
  }
  .add-heart-animation {
    animation: add-to-wishlist-heart 0.6s steps(30);
    transition: 0.6s ease steps(30);
  }

  @keyframes add-to-wishlist-heart {
    0% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1);
    }
  }
  @keyframes add-to-wishlist {
    0% {
      opacity: 0.5;
      width: 20px;
      height: 10px;
      left: 0;
      transform: rotate(0deg);
      top: 0%;
    }

    100% {
      opacity: 0;
      width: 5px;
      height: 5px;
      left: 100%;
      transform: rotate(40deg);
      top: -50%;
    }
  }
`;

export const MetaPriceDiv = styled.div`
  display: flex;
  justify-content: space-between;

  span:last-child {
    font-size: 11pt;
    font-weight: 500;
    //color: ${colorSchemes["color-gray"]};
    svg {
      margin-right: 7px;
    }
  }
`;

export const SearchHeaderRow = styled(Row)`
  margin: 2rem 0;
  .order__by {
    margin-left: auto;
    width: 100%;
  }
`;

export const CoverImageFallbackDiv = styled.div`
  text-align: center;
  background: ${colorSchemes["color-grayish"]};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  span {
    font-size: 2em;
    padding: 6rem 8rem;
    margin-left: auto;
    margin-right: auto;
    color: ${colorSchemes["color-gray"]};
  }
`;
