import styled, { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";
import { Input, Button, Layout, Spin } from "antd";
export const colorSchemes = {
  "color-white": "#ffffff",
  "color-light": "#f5f6fa",
  "color-black": "#121212",
  "color-night": "#001632",
  "color-red": "#ff4757",
  "color-blue": "#34ace0",
  "color-green": "#00b894",
  "drk-green": "#20bf6b",
  "drk-blue": "#1b9cfc",
  "middle-night": "#2C3A47",
  "color-gray": "#808e9b",
  "color-grayish": "#dadce0",
  "main-color": "#f6b93b",
  "second-main-color": "#34495e",
  "main-text-color": "#2c2c54",
  "shadow-normal":
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "shadow-medium":
    "0 9px 46px 8px rgba(0,0,0,.02),0 24px 38px 3px rgba(0,0,0,.04),0 11px 15px -7px rgba(0,0,0,.05)",
  "shadow-large": "0 1rem 3rem rgba(0, 0, 0, 0.175)",
};

export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Droid Sans", "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
    ::selection{
      background: #f8c291;
    }
    /* .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: ${colorSchemes["main-color"]} ;
    }
    .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
      box-shadow: 0 0 0 2px rgba(253, 181, 27, 0.2);;
    } */
`;

export const Container = styled(Layout.Content)`
  max-width: calc(1296px + 5.6rem);
  margin: auto;
`;
export const ContainerMd = styled(Container)`
  max-width: calc(1520px + 5.6rem);
`;

export const ContentSpinner = styled(Container)`
  height: 70vh;
`;

export const SpinnerStyled = styled(Spin)`
  position: fixed;
  top: 45%;
  left: 50%;
  /* The translate value for transform is based off the size of the element, so that will center nicely */
  transform: translate(-50%, -50%);
  color: ${colorSchemes["main-text-color"]};
`;

export const CustomInput = styled(Input)`
  border-radius: 3rem;
  padding: 8px 20px;
  margin-top: 1rem;
  svg {
    margin-right: 5px;
  }
`;
export const CustomInputPassword = styled(Input.Password)`
  border-radius: 3rem;
  padding: 8px 20px;
  margin-top: 1rem;
  svg {
    margin-right: 5px;
  }
`;

export const CustomButton = styled(Button)`
  background: linear-gradient(
    90deg,
    #ffa801,
    ${colorSchemes["main-color"]} 51%,
    #ffa801
  );
  margin-top: 1rem;
  border-color: ${colorSchemes["main-color"]};
  border-radius: 3rem;
  box-shadow: 0 4px 12px 0 rgb(238 167 15 / 40%);
  :hover,
  :focus {
    background: ${colorSchemes["main-color"]};
    border-color: ${colorSchemes["main-color"]};
    color: ${colorSchemes["second-main-color"]};
  }
`;

export const CustomButtonDefault = styled(Button)`
  border-radius: 3rem;
  :hover {
    color: ${colorSchemes["main-color"]};
    border-color: ${colorSchemes["main-color"]};
  }
`;
export const CustomButtonGoogle = styled(CustomButtonDefault)`
  border-radius: 3rem;
  :hover {
    color: ${colorSchemes["second-main-color"]};
    background-color: ${colorSchemes["color-red"]};
    border-color: ${colorSchemes["color-red"]};
  }
  :focus {
    color: ${colorSchemes["second-main-color"]};
    border-color: ${colorSchemes["color-red"]};
  }
`;
