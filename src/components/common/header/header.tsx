import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import {
  Dropdown,
  InputGroup,
  Modal,
  Nav,
  Offcanvas,
  Tab,
} from "react-bootstrap";
import { MENUITEMS } from "../sidebar/sidemenu";
import DatePicker from "react-datepicker";
import store from "../../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "../../../redux/action";
//IMAGES

import ngananhlogo from "../../../assets/images/brand-logos/ngan-anh-logo.png";
import {
  IconArrowRightFromArc,
  IconArrowsMinimize,
  IconMaximize,
  IconMenu2,
  IconMoon,
  IconSearch,
  IconSettings,
  IconSun,
  IconUserPlus,
} from "@tabler/icons-react";
interface HeaderProps {}

const Header: FC<HeaderProps> = ({ local_varaiable, ThemeChanger }: any) => {
  const [startDatei, setStartDatei] = useState(new Date());
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);

  const [show3, setShow3] = useState(false);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  function menuClose() {
    const theme = store.getState().theme;
    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }
    if (window.innerWidth >= 992) {
      ThemeChanger({
        ...theme,
        toggled: local_varaiable.toggled ? local_varaiable.toggled : "",
      });
    }
  }
  //Dark Model
  const ToggleDark = () => {
    console.log(local_varaiable);
    ThemeChanger({
      ...local_varaiable,
      dataThemeMode: local_varaiable.dataThemeMode == "dark" ? "light" : "dark",
      dataHeaderStyles:
        local_varaiable.dataThemeMode == "dark" ? "light" : "gradient",
      dataMenuStyles:
        local_varaiable.dataNavLayout == "horizontal"
          ? local_varaiable.dataThemeMode == "dark"
            ? "gradient"
            : "dark"
          : "dark",
    });
    const theme = store.getState().theme;

    if (theme.dataThemeMode != "dark") {
      ThemeChanger({
        ...theme,
        bodyBg: "",
        Light: "",
        darkBg: "",
        inputBorder: "",
        dataHeaderStyles: "gradient",
      });
      localStorage.removeItem("velvetdarktheme");
      localStorage.removeItem("darkBgRGB1");
      localStorage.removeItem("darkBgRGB2");
      localStorage.removeItem("darkBgRGB3");
      localStorage.removeItem("darkBgRGB4");
      localStorage.removeItem("velvetMenu");
      localStorage.removeItem("velvetHeader");
    } else {
      localStorage.setItem("velvetdarktheme", "dark");
      localStorage.removeItem("velvetlighttheme");
      localStorage.removeItem("velvetHeader");
      localStorage.removeItem("velvetMenu");
    }
  };

  const [_menuitems, setMenuitems] = useState(MENUITEMS);

  function closeMenuFn() {
    const closeMenuRecursively = (items: any[]) => {
      items?.forEach((item: { active: boolean; children: any }) => {
        item.active = false;
        closeMenuRecursively(item.children);
      });
    };
    closeMenuRecursively(MENUITEMS);
    setMenuitems((arr: any) => [...arr]);
  }
  const toggleSidebar = () => {
    const theme = store.getState().theme;
    const sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      if (sidemenuType === "vertical") {
        const verticalStyle = theme.dataVerticalStyle;
        const navStyle = theme.dataNavStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, toggled: "", iconOverlay: "" });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({
                  ...theme,
                  toggled: "icon-overlay-close",
                  iconOverlay: "",
                });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            } else {
              const sidemenu = document.querySelector(
                ".side-menu__item.active"
              );
              if (sidemenu) {
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    "double-menu-active"
                  );
                  ThemeChanger({ ...theme, toggled: "double-menu-open" });
                } else {
                  ThemeChanger({ ...theme, toggled: "double-menu-close" });
                }
              }
            }

            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({
                ...theme,
                toggled: "detached-close",
                iconOverlay: "",
              });
            }
            break;
          // default
          case "default":
            ThemeChanger({ ...theme, toggled: "" });
        }
        switch (navStyle) {
          case "menu-click":
            if (theme.toggled === "menu-click-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "menu-click-closed" });
            }
            break;
          // icon-overlay
          case "menu-hover":
            if (theme.toggled === "menu-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" });
              closeMenuFn();
            } else {
              ThemeChanger({ ...theme, toggled: "menu-hover-closed" });
              // setMenuUsingUrl();
            }
            break;
          case "icon-click":
            if (theme.toggled === "icon-click-closed") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-click-closed" });
            }
            break;
          case "icon-hover":
            if (theme.toggled === "icon-hover-closed") {
              ThemeChanger({ ...theme, toggled: "" });
              closeMenuFn();
            } else {
              ThemeChanger({ ...theme, toggled: "icon-hover-closed" });
              // setMenuUsingUrl();
            }
            break;
        }
      }
    } else {
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, toggled: "open" });

        setTimeout(() => {
          if (theme.toggled == "open") {
            const overlay = document.querySelector("#responsive-overlay");

            if (overlay) {
              overlay.classList.add("active");
              overlay.addEventListener("click", () => {
                const overlay = document.querySelector("#responsive-overlay");

                if (overlay) {
                  overlay.classList.remove("active");
                  menuClose();
                }
              });
            }
          }

          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              const overlay = document.querySelector("#responsive-overlay");

              if (overlay) {
                overlay.classList.remove("active");
              }
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, toggled: "close" });
      }
    }
  };
  /****fullscreeen */
  const [fullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().then(() => setFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setFullScreen(false));
    }
  };

  const handleFullscreenChange = () => {
    setFullScreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const Switchericon = () => {
    document.querySelector(".offcanvas-end")?.classList.toggle("show");
    if (
      document.querySelector(".switcher-backdrop")?.classList.contains("d-none")
    ) {
      document.querySelector(".switcher-backdrop")?.classList.add("d-block");
      document.querySelector(".switcher-backdrop")?.classList.remove("d-none");
    }
  };

  const cartProduct = [
    {
      id: 1,
      src: "",
      name: "Cactus mini plant",
      quantity: "02",
      price: "$1,299.00",
      oldpr: "$1,799",
      newpr: "$1,229",
    },
    {
      id: 2,
      src: "",
      name: "Sports shoes for men",
      quantity: "01",
      price: "$179.29",
      oldpr: "$799",
      newpr: "$10,229",
    },
    {
      id: 3,
      src: "",
      name: "Pink color smart watch",
      quantity: "03",
      oldpr: "$599",
      newpr: "$5,500",
    },
    {
      id: 4,
      src: "",
      name: "Red Leafs plant",
      quantity: "01",
      oldpr: "$799",
      newpr: "$15,300",
    },
    {
      id: 5,
      src: "",
      name: "Good luck mini plant",
      quantity: "02",
      oldpr: "$99",
      newpr: "$600",
    },
  ];

  const [cartItems, setCartItems] = useState([...cartProduct]);
  const [cartItemCount, setCartItemCount] = useState(cartProduct.length);

  const handleRemove = (itemId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    setCartItemCount(updatedCart.length);
  };

  const img1 = <img src={""} alt="" />;
  const img2 = <img src={""} alt="" />;

  const initialNotifications = [
    {
      id: 1,
      src: img1,
      icon: "",
      name: "Olivia James",
      text1: "Congratulate for New template start",
      text2: "",
      text3: "2 min ago",
      avatarcolor: "secondary",
    },
    {
      id: 2,
      src: "",
      icon: "bx bx-pyramid fs-18",
      name: "Order Placed",
      text1: "Order Placed Successfully",
      text2: "ID: #1116773",
      text3: "5 min ago",
      avatarcolor: "warning",
    },
    {
      id: 3,
      src: img2,
      icon: "",
      name: "Elizabeth Lewis",
      text1: "added new schedule realease date",
      text2: "",
      text3: "10 min ago",
      avatarcolor: "secondary",
    },
    {
      id: 4,
      src: "",
      icon: "bx bx-pulse fs-18",
      name: "Your Order Has Been Shipped",
      text1: "Order No: 123456 Has Shipped To Your Delivery Address",
      text2: "",
      text3: "12 min ago",
      avatarcolor: "primary",
    },
    {
      id: 5,
      src: "",
      icon: "bx bx-badge-check",
      name: "Account Has Been Verified",
      text1: "Your Account Has Been Verified Sucessfully",
      text2: "",
      text3: "20 min ago",
      avatarcolor: "pink",
    },
  ];

  const [notifications, setNotifications] = useState([...initialNotifications]);

  const handleNotificationClose = (index: number) => {
    // Create a copy of the notifications array and remove the item at the specified index
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  const searchRef = useRef(null);

  const handleClick = (event: any) => {
    const searchInput: any = searchRef.current;

    if (
      searchInput &&
      (searchInput === event.target || searchInput.contains(event.target))
    ) {
      document.querySelector(".header-search")?.classList.add("searchdrop");
    } else {
      document.querySelector(".header-search")?.classList.remove("searchdrop");
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  // search Functionality
  const [showa, setShowa] = useState(false);
  const [InputValue, setInputValue] = useState("");
  const [show2, setShow2] = useState(false);
  const [searchcolor, setsearchcolor] = useState("text-dark");
  const [searchval, setsearchval] = useState("Type something");
  const [NavData, setNavData] = useState([]);

  const myfunction = (inputvalue: string) => {
    document.querySelector(".search-result")?.classList.remove("d-none");

    const i: any = [];
    const allElement2: any = [];

    MENUITEMS.forEach((mainLevel) => {
      if (mainLevel.children) {
        setShowa(true);
        mainLevel.children.forEach((subLevel: any) => {
          i.push(subLevel);
          if (subLevel.children) {
            subLevel.children.forEach((subLevel1: any) => {
              i.push(subLevel1);
              if (subLevel1.children) {
                subLevel1.children.forEach((subLevel2: any) => {
                  i.push(subLevel2);
                });
              }
            });
          }
        });
      }
    });

    for (const allElement of i) {
      if (allElement.title.toLowerCase().includes(inputvalue.toLowerCase())) {
        if (
          allElement.title.toLowerCase().startsWith(inputvalue.toLowerCase())
        ) {
          setShow2(true);

          // Check if the element has a path and doesn't already exist in allElement2 before pushing
          if (
            allElement.path &&
            !allElement2.some(
              (el: { title: any }) => el.title === allElement.title
            )
          ) {
            allElement2.push(allElement);
          }
        }
      }
    }

    if (!allElement2.length || inputvalue === "") {
      if (inputvalue === "") {
        setShow2(false);
        setsearchval("Type something");
        setsearchcolor("text-dark");
      }
      if (!allElement2.length) {
        setShow2(false);
        setsearchcolor("text-danger");
        setsearchval("There is no component with this name");
      }
    }
    setNavData(allElement2);
  };

  //   sticky-pin
  const Topup = () => {
    if (window.scrollY > 30 && document.querySelector(".app-header")) {
      const Scolls = document.querySelectorAll(".app-header");
      Scolls.forEach((e) => {
        e.classList.add("sticky-pin");
      });
    } else {
      const Scolls = document.querySelectorAll(".app-header");
      Scolls.forEach((e) => {
        e.classList.remove("sticky-pin");
      });
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", Topup);
  }

  return (
    <Fragment>
      <header className="app-header">
        <div className="main-header-container container-fluid">
          <div className="header-content-left">
            <div className="header-element">
              <div className="horizontal-logo">
                <Link
                  to={`${import.meta.env.BASE_URL}dashboards`}
                  className="header-logo"
                >
                  <img src={ngananhlogo} alt="logo" className="desktop-logo" />
                  <img src={ngananhlogo} alt="logo" className="toggle-logo" />
                  <img src={ngananhlogo} alt="logo" className="desktop-dark" />
                  <img src={ngananhlogo} alt="logo" className="toggle-dark" />
                </Link>
              </div>
            </div>

            <div className="header-element">
              <Link
                aria-label="anchor"
                to="#"
                className="sidemenu-toggle header-link"
                data-bs-toggle="sidebar"
                onClick={() => toggleSidebar()}
              >
                <span className="open-toggle me-2">
                  <IconMenu2 className="header-link-icon" />
                </span>
              </Link>
            </div>
            <div
              className="header-element header-search d-lg-none d-block"
              onClick={handleShow3}
            >
              <Link
                aria-label="anchor"
                to="#"
                className="header-link"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <IconSearch className="header-link-icon" />
              </Link>
            </div>
          </div>

          <div className="header-content-right">
            <div className="header-element header-theme-mode">
              <Link
                aria-label="anchor"
                to="#"
                className="header-link layout-setting"
                onClick={() => ToggleDark()}
              >
                <IconSun className="bx-flip-horizontal header-link-icon ionicon  dark-layout" />
                <IconMoon className="bx-flip-horizontal header-link-icon ionicon light-layout" />
              </Link>
            </div>

            <div className="header-element header-fullscreen">
              <Link
                aria-label="anchor"
                onClick={toggleFullScreen}
                to="#"
                className="header-link"
              >
                {fullScreen ? (
                  <IconArrowsMinimize className="header-link-icon  full-screen-close" />
                ) : (
                  <IconMaximize className="header-link-icon  full-screen-open" />
                )}
              </Link>
            </div>

            <Dropdown className="header-element mainuserProfile">
              <Dropdown.Toggle
                variant=""
                as="a"
                className="header-link dropdown-toggle"
                id="mainHeaderProfile"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <div className="d-sm-flex wd-100p">
                    <div className="avatar avatar-sm">
                      <img alt="avatar" src={ngananhlogo} />
                    </div>
                    <div className="ms-2 my-auto d-none d-xl-flex">
                      <h6 className=" font-weight-semibold mb-0 fs-13 user-name d-sm-block d-none">
                        {store.getState().auth.username}
                      </h6>
                    </div>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                as="ul"
                className="dropdown-menu  border-0 main-header-dropdown  overflow-hidden header-profile-dropdown"
                aria-labelledby="mainHeaderProfile"
              >
                <Dropdown.Item
                  as="li"
                  className="border-0"
                  onClick={() => navigate(import.meta.env.BASE_URL)}
                >
                  <IconArrowRightFromArc className="fs-13 me-2" size={14} />{" "}
                  Thoát
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="header-element">
              <Link
                aria-label="anchor"
                to="#"
                className="header-link switcher-icon ms-1"
                data-bs-toggle="offcanvas"
                data-bs-target="#switcher-canvas"
                onClick={() => Switchericon()}
              >
                <IconSettings className="bx-spin" color="white" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state.theme,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
