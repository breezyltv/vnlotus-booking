import styled from "styled-components";
import { ContainerMd, colorSchemes } from "../../../styles";
import { Menu } from "antd";
export const MenuDiv = styled.div`
  background-color: #fff;
  border-bottom: solid 1px #e8e8e8;
  box-shadow: 0 0 30px #f3f1f1;
  @media (max-width: 767px) {
    padding-bottom: 1rem;
  }
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

export const AccountSubMenuStyled = styled(ContainerMd)`
  padding: 0 55px;
`;

export const SearchNav = styled.div`
  align-self: center;
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
    line-height: 35px;
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

export const MenuUserLink = styled.a`
  //font-size: 0.875rem;
  background: #f6f6f6;
  //padding: 0.3125rem 1.75rem 0.3125rem 0.3125rem;
  padding: 0 10px;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 2px;
  }
  span:last-child {
    margin-right: 0;
    margin-top: 3px;
  }
`;

export const AccountBarRight = styled.div`
  margin-left: auto;
`;

export const AccountMenuStyled = styled(Menu)`
  .ant-menu-root.ant-menu-vertical {
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%) !important;
  }
`;
