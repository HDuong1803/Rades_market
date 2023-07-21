import Image from "next/image";
import React, { useContext, useState } from "react";
import Link from "next/link";

import Logo from "../../../public/Logo.png";
import {GrHomeRounded} from "react-icons/gr"
import {HiOutlineShoppingCart, } from "react-icons/hi"
import {RiAuctionLine, RiCoinsLine} from "react-icons/ri"
import {MdOutlineKeyboardArrowLeft} from "react-icons/md"
import { SidebarContext } from "./SidebarContext";
import {HiOutlineBanknotes} from "react-icons/hi2";

const sidebarItems = [
  {
    name: "Market",
    href: "/",
    icon: HiOutlineShoppingCart,
  },
  {
    name: "ICO",
    href: "../invests",
    icon: RiCoinsLine,
  },
  {
    name: "Auction",
    href: "../auction",
    icon: RiAuctionLine,
  },
  {
    name: "Staking",
    href: "../staking",
    icon: HiOutlineBanknotes,
  },
  {
    name: "Home",
    href: "../home",
    icon: GrHomeRounded,
  },
]

export default function Sidebar() {
  const {isCollapsedSidebar, toogleSidebarCollapseHandler} = useContext(SidebarContext);

  return (
    <div className="sidebar_wrapper">
      <button className="btn" onClick={toogleSidebarCollapseHandler}>
        <MdOutlineKeyboardArrowLeft />
      </button>
      <aside className="sidebar" data-collapse={isCollapsedSidebar}>
        <div className="sidebar_top">
          <Image src={Logo} width={80} height={80} className="sidebar_logo" alt="logo"/>
          <p className="sidebar_logo-name">RADES</p>
        </div>
        <ul className="sidebar_list">
          {sidebarItems.map(({name, href, icon: Icon}) => (
            <li className="sidebar_item" key={name}>
            <Link href={href} className="sidebar_link">
              <span className="sidebar_icon">
                <Icon />
              </span>
              <span className="sidebar_name">{name}</span>
            </Link>
          </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
