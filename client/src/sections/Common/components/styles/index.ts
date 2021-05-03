import styled from "styled-components";
import { colorSchemes, Container } from "../../../../styles";
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

export const BannerContainer = styled(Container)`
  padding: 1rem;
`;

export const MediaDiv = styled.div`
  margin-top: 3rem;
  .ant-image-img {
    width: 55px;
    height: 70px;
  }
`;
