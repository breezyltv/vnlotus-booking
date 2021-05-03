import styled from "styled-components";
import { ContainerMd, colorSchemes } from "../../../styles";

export const MenuDiv = styled.div`
  border-bottom: solid 1px #e8e8e8;
  box-shadow: 0 0 30px #f3f1f1;
`;

export const Nav = styled(ContainerMd)`
  padding: 0 55px;

  overflow: auto;
  //box-shadow: 0 0 30px #f3f1f1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    padding: 0 0 10px 0;
  }
`;

export const Logo = styled.div`
  display: flex;
  margin: 0.7rem;
  width: 150px;
  @media (max-width: 767px) {
  }
`;

export const NavImg = styled.img`
  width: 3rem;
  @media (max-width: 767px) {
    width: 2.5rem;
  }
`;

export const NavTitle = styled.span`
  font-size: 20pt;
  font-weight: 500;
  color: #282c34;
  margin-left: 5px;
  letter-spacing: 5px;
  vertical-align: middle;
`;

export const NavSubMenu = styled.div`
  width: calc(100% - 150px);
  display: flex;
  flex-direction: row;

  .ant-menu-item {
    margin: 0 10px !important;
  }
  .ant-menu-submenu-title {
    padding: 10px 20px;
  }
  .ant-menu-horizontal {
    border-bottom: none;
  }
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected,
  .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
    border-bottom: 2px solid transparent;
  }
  /* .ant-menu-horizontal > .ant-menu-item-selected a {
    color: ${colorSchemes["main-color"]};
  } */
  .ant-menu-item:hover {
    border-bottom: 2px solid transparent !important;
  }
  .leftMenu {
    flex-grow: 1;
  }
  .rightMenu {
    align-self: flex-end;
  }
  .barsMenu {
    float: right;
    padding: 0 10px;
    display: none;
    background: none;
  }

  @media (max-width: 767px) {
    width: 100%;
    justify-content: center;
    .barsMenu {
      display: inline-block;
    }
    .leftMenu,
    .rightMenu {
      display: none;
    }
  }
`;
