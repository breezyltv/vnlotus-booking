import { useContext } from "react";
import { AuthContext } from "../../lib/auth/AuthProvider";
import { HomeContainer } from "./styles";
import {
  SliderHeader,
  TopDestinations,
  IntroHeader,
  PromoBecomeHost,
  Instruction,
} from "./components/";

import { Divider, Row, Col } from "antd";

export const Home = () => {
  const { viewer } = useContext(AuthContext);
  return (
    <>
      <Row>
        <Col sm={24} md={24} lg={24}>
          <HomeContainer>
            <SliderHeader />
            <IntroHeader viewer={viewer} />
            <Divider />
            <TopDestinations />
            <PromoBecomeHost />
            <Instruction />
          </HomeContainer>
        </Col>
      </Row>
    </>
  );
};
