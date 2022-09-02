import { MdHome } from "react-icons/md";

const CommsSubMenuItems = [
  {
    title: "All requests",
    path: "/comms#all-requests",
    cName: "sub-nav-links",
  },
  {
    title: "Make a request",
    path: "/comms#make-a-request",
    cName: "sub-nav-links",
  },
];

export const MenuItems = [
  {
    title: "Cakee",
    path: "/",
    cName: "nav-links",
    icon: <MdHome />,
  },
  {
    title: "Commissions",
    path: "/comms",
    cName: "nav-links",
    subMenu: CommsSubMenuItems,
  },
  {
    title: "Artworks",
    path: "/artworks",
    cName: "nav-links",
  },
];
