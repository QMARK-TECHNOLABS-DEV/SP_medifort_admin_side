import {
  Home,
  User,
  LayoutGrid,
  FileText,
  TicketSlash,
  TvMinimalPlay,
  UserSearch
} from "lucide-react";
export const NavData = [
  {
    id: 1,
    name: "Home",
    link: "/",
    icon: <Home />,
    list: []
  },
  {
    id: 2,
    name: "Doctor profile",
    link: "/doctors",
    icon: <User />,
    list: []
  },
  {
    id: 3,
    name: "Department",
    link: "/department",
    icon: <LayoutGrid />,
    list: []
  },
  {
    id: 4,
    name: "Content Management",
    link: "/content-management",
    icon: <TvMinimalPlay />,
    list: []
  },
  {
    id: 5,
    name: "Banner Management",
    link: "/banner-management",
    icon: <TicketSlash />,
    list: []
  },
  {
    id: 6,
    name: "Testimonials",
    link: "/testimonials",
    icon: <FileText />,
    list: []
  },
  {
    id: 7,
    name: "Enquiries",
    link: "/enquiry",
    icon: <UserSearch />,
    list: []
  }
  // {
  //     "id": 4,
  //     "title": "WSO Initiatives",
  //     "link": "/user/wso-initiatives",
  //     "list": [
  //         {
  //             "lid": 1,
  //             "subTitle": "NSC",
  //             "subLink": "/user/nsc"
  //         },
  //     ]
  // },
];
