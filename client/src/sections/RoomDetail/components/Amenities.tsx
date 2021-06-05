import { Typography, Space } from "antd";
import {
  AmenitiesDiv,
  AmenitiesHeaderDiv,
  FacilitiesList,
  FacilitiesDiv,
} from "../styles";
import SvgWifi from "../assets/facilities/svgexport-15.svg";
import SvgTV from "../assets/facilities/svgexport-16.svg";
import SvgAC from "../assets/facilities/svgexport-17.svg";
import SvgWM from "../assets/facilities/svgexport-18.svg";
import SvgShampoo from "../assets/facilities/svgexport-19.svg";
import SvgToiletPaper from "../assets/facilities/svgexport-20.svg";
import SvgNapkins from "../assets/facilities/svgexport-21.svg";
import SvgBottledWater from "../assets/facilities/svgexport-22.svg";
import SvgTowels from "../assets/facilities/svgexport-23.svg";
import SvgToothpaste from "../assets/facilities/svgexport-24.svg";
import SvgSoap from "../assets/facilities/svgexport-25.svg";
import SvgHairdryer from "../assets/facilities/svgexport-26.svg";

const { Text, Title } = Typography;

const facilities = [
  {
    icon: SvgWifi,
    title: "Wifi",
  },
  {
    icon: SvgTV,
    title: "TV",
  },
  {
    icon: SvgAC,
    title: "Air-conditioning",
  },
  {
    icon: SvgWM,
    title: "Washing machine",
  },
  {
    icon: SvgShampoo,
    title: "Shampoo, Conditioner",
  },
  {
    icon: SvgToiletPaper,
    title: "Toilet Paper",
  },
  {
    icon: SvgNapkins,
    title: "Napkins",
  },
  {
    icon: SvgBottledWater,
    title: "Bottled Water",
  },
  {
    icon: SvgTowels,
    title: "Towels",
  },
  {
    icon: SvgToothpaste,
    title: "Toothpaste",
  },
  {
    icon: SvgSoap,
    title: "Soap",
  },
  {
    icon: SvgHairdryer,
    title: "Hair dryer",
  },
];

export const Amenities = () => {
  return (
    <AmenitiesDiv>
      <AmenitiesHeaderDiv>
        <Title level={3}>Amenities</Title>
        <Text>Amenities and services at the accommodation</Text>
      </AmenitiesHeaderDiv>
      <FacilitiesDiv>
        <Title level={4}>Facilities</Title>
        <FacilitiesList>
          {facilities.map((item) => (
            <li>
              <img src={item.icon} alt={item.title} /> <span>{item.title}</span>
            </li>
          ))}
        </FacilitiesList>
      </FacilitiesDiv>
    </AmenitiesDiv>
  );
};
