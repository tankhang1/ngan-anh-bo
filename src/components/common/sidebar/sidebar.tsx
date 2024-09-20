import { FC, Fragment, useContext, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeChanger } from "../../../redux/action";
import store, { RootState } from "../../../redux/store";
// import logo1 from "../../../assets/images/brand-logos/desktop-logo.png";
// import logo2 from "../../../assets/images/brand-logos/toggle-logo.png";
// import logo3 from "../../../assets/images/brand-logos/desktop-dark.png";
// import logo4 from "../../../assets/images/brand-logos/toggle-dark.png";
import NganAnhLogo from "../../../assets/images/brand-logos/ngan-anh-logo.png";
import SimpleBar from "simplebar-react";
import { MENU_KEY, MENUITEMS } from "./sidemenu";
import Menuloop from "./menuloop";
import { ToastContext } from "../../AppToast";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({ local_varaiable, ThemeChanger }: any) => {
  const { permission } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const toast = useContext(ToastContext);
  const [menuitems, setMenuitems] = useState<any>(MENUITEMS);

  function closeMenuFn() {
    const closeMenuRecursively = (items: any) => {
      items?.forEach((item: any) => {
        item.active = false;
        closeMenuRecursively(item.children);
      });
    };
    closeMenuRecursively(MENUITEMS);
    setMenuitems((arr: any) => [...arr]);
  }

  useEffect(() => {
    window.addEventListener("resize", menuResizeFn);
  }, []);

  // const location = useLocation();
  const location = useLocation();
  function Onhover() {
    const theme = store.getState().theme;
    if (
      (theme.toggled == "icon-overlay-close" ||
        theme.toggled == "detached-close") &&
      theme.iconOverlay != "open"
    ) {
      ThemeChanger({ ...theme, iconOverlay: "open" });
    }
  }
  function Outhover() {
    const theme = store.getState().theme;

    if (
      (theme.toggled == "icon-overlay-close" ||
        theme.toggled == "detached-close") &&
      theme.iconOverlay == "open"
    ) {
      ThemeChanger({ ...theme, iconOverlay: "" });
    }
  }

  function menuClose() {
    const theme = store.getState().theme;

    if (window.innerWidth <= 992) {
      ThemeChanger({ ...theme, toggled: "close" });
    }
    const overlayElement = document.querySelector(
      "#responsive-overlay"
    ) as HTMLElement | null;
    if (overlayElement) {
      overlayElement.classList.remove("active");
    }
    if (
      theme.dataNavLayout == "horizontal" ||
      theme.dataNavStyle == "menu-click" ||
      theme.dataNavStyle == "icon-click"
    ) {
      closeMenuFn();
    }
  }
  useEffect(() => {
    menuClose();
  }, []);
  const WindowPreSize = [window.innerWidth];

  function isPermitAccess(key?: string) {
    if (key) {
      switch (key) {
        case MENU_KEY.MAIN_TITLE:
          return permission.viewDashboard;
        case MENU_KEY.DASHBOARD:
          return permission.viewDashboard;
        case MENU_KEY.MANAGE_TITLE:
          if (
            //Accounts
            permission.viewAccounts ||
            permission.viewListAccounts ||
            //Operators
            permission.viewOperatorGiftToday ||
            permission.viewOperatorSMSGateway ||
            permission.viewOperatorSMSBrandname ||
            permission.viewOperatorSearchIQRToday ||
            permission.viewOperatorSearchTopupToday ||
            permission.viewOperatorSearchCustomerUnValidateToday ||
            permission.viewOperatorSearchCustomerValidateToday ||
            // Customer
            permission.viewSearchCustomer ||
            permission.viewValidateCustomer ||
            permission.viewListValidateCustomer ||
            permission.viewListUnValidateCustomer ||
            permission.viewListValidateCustomer ||
            //employee
            permission.viewEmployee ||
            permission.viewListEmployee ||
            //employee role & department
            permission.viewRoles ||
            permission.viewDepartment ||
            // products
            permission.viewSearchProduct ||
            permission.viewProductsMarketingInfo ||
            permission.viewListProductsMarketingInfo ||
            permission.viewProductsProductionInfo ||
            permission.viewListProductsProductionInfo ||
            // warehouse
            permission.viewWarehouseCreateMaterial ||
            permission.viewWarehouseFillMaterial ||
            permission.viewSearchBatchNumber ||
            permission.viewSearchCustomer ||
            permission.viewSearchRetailer1 ||
            permission.viewCreateManufacturOrder ||
            permission.viewProductsProductionInfo ||
            permission.viewListProductsProductionInfo ||
            permission.viewWarehouseReportIngredient ||
            permission.viewWarehouseReportIngredientPacking ||
            permission.warehouseSearchExport ||
            permission.warehouseSearchImport ||
            permission.warehouseListImport ||
            permission.warehouseListExport ||
            permission.warehouseReportExport ||
            permission.warehouseInventoryInfo ||
            permission.viewWarehouseSearchToday ||
            permission.viewWarehouseReportInventory ||
            // program
            permission.viewProgramPoint ||
            permission.viewProgramTopup ||
            permission.viewProgramChance ||
            permission.viewListProgramPoint ||
            permission.viewListProgramTopup ||
            permission.viewListProgramChance
          )
            return true;
          return false;
        case MENU_KEY.ACCOUNTS:
          return permission.viewAccounts || permission.viewListAccounts;
        case MENU_KEY.MANAGE_OPERATOR:
          return (
            permission.viewOperatorGiftToday ||
            permission.viewOperatorSMSGateway ||
            permission.viewOperatorSMSBrandname ||
            permission.viewOperatorSearchIQRToday ||
            permission.viewOperatorSearchTopupToday ||
            permission.viewOperatorSearchCustomerUnValidateToday ||
            permission.viewOperatorSearchCustomerValidateToday
          );
        //operator
        case MENU_KEY.OPERATORS_TOPUP_TODAY:
          return permission.viewOperatorSearchTopupToday;
        case MENU_KEY.OPERATORS_CUSTOMER_VALIDATE_TODAY:
          return permission.viewOperatorSearchCustomerValidateToday;
        case MENU_KEY.OPERATORS_CUSTOMER_UNVALIDATE_TODAY:
          return permission.viewOperatorSearchCustomerUnValidateToday;
        case MENU_KEY.OPERATORS_GIFT_TODAY:
          return permission.viewOperatorGiftToday;
        case MENU_KEY.OPERATORS_SMS_GATEWAY:
          return permission.viewOperatorSMSGateway;
        case MENU_KEY.OPERATORS_SMS_BRANDNAME:
          return permission.viewOperatorSMSBrandname;
        case MENU_KEY.OPERATORS_iQr_TODAY:
          return permission.viewOperatorSearchIQRToday;

        case MENU_KEY.CUSTOMERS:
          return (
            permission.viewListValidateCustomer ||
            permission.viewValidateCustomer ||
            permission.viewUnValidateCustomer ||
            permission.viewListUnValidateCustomer ||
            permission.viewSearchCustomer
          );
        case MENU_KEY.CUSTOMERS_SEARCH: {
          return permission.viewSearchCustomer;
        }
        case MENU_KEY.CUSTOMERS_VALIDATE:
          return (
            permission.viewValidateCustomer ||
            permission.viewListValidateCustomer
          );
        case MENU_KEY.CUSTOMERS_UNVALIDATE:
          return (
            permission.viewUnValidateCustomer ||
            permission.viewListUnValidateCustomer
          );
        case MENU_KEY.MANAGE_PERSONEL:
          return (
            permission.viewEmployee ||
            permission.viewListEmployee ||
            permission.viewRoles ||
            permission.viewDepartment
          );
        case MENU_KEY.EMPLOYEES_INFO:
          return permission.viewEmployee || permission.viewListEmployee;
        case MENU_KEY.EMPLOYEES_ROLES:
          return permission.viewRoles;
        case MENU_KEY.EMPLOYEES_DEPARTMENTS:
          return permission.viewDepartment;

        case MENU_KEY.PRODUCTS:
          return (
            permission.viewSearchProduct ||
            permission.viewProductsMarketingInfo ||
            permission.viewListProductsMarketingInfo ||
            permission.viewProductsProductionInfo ||
            permission.viewListProductsProductionInfo
          );
        case MENU_KEY.PRODUCTS_MARKETING_INFO:
          return (
            permission.viewListProductsMarketingInfo ||
            permission.viewProductsMarketingInfo
          );
        case MENU_KEY.PRODUCTS_PRODUCTION_INFO:
          return (
            permission.viewListProductsProductionInfo ||
            permission.viewProductsProductionInfo
          );

        case MENU_KEY.PRODUCTS_SEARCH_PRODUCT:
          return permission.viewSearchProduct;
        case MENU_KEY.MANAGE_PROGRAM:
          return (
            permission.viewProgramPoint ||
            permission.viewProgramTopup ||
            permission.viewProgramChance ||
            permission.viewListProgramChance ||
            permission.viewListProgramPoint ||
            permission.viewListProgramTopup
          );
        case MENU_KEY.PROGRAMS_POINTS:
          return permission.viewProgramPoint || permission.viewListProgramPoint;
        case MENU_KEY.PROGRAMS_TOPUPS:
          return permission.viewProgramTopup || permission.viewListProgramTopup;
        case MENU_KEY.PROGRAM_CHANCE:
          return (
            permission.viewProgramChance || permission.viewListProgramChance
          );
        case MENU_KEY.MANAGE_WAREHOUSE:
          return (
            permission.warehouseSearchExport ||
            permission.warehouseSearchImport ||
            permission.warehouseListExport ||
            permission.warehouseListImport ||
            permission.warehouseReportExport ||
            permission.warehouseInventoryInfo ||
            permission.viewCreateManufacturOrder ||
            permission.viewSearchBatchNumber ||
            permission.viewSearchRetailer1 ||
            permission.viewCreateManufacturOrder ||
            permission.viewWarehouseSearchToday ||
            permission.viewWarehouseCreateMaterial ||
            permission.viewWarehouseFillMaterial ||
            permission.viewWarehouseReportIngredient ||
            permission.viewWarehouseReportIngredientPacking
          );
        
        case MENU_KEY.REPORT_TITLE:
          if (
            permission.reportCustomer ||
            permission.reportIQR ||
            permission.reportProgramPoint ||
            permission.reportProgramTopup ||
            permission.reportProgramChance ||
            permission.reportSMSBrandname||
            permission.reportSMSBrandname
          )
            return true;
          return false;
        case MENU_KEY.REPORTS_CUSTOMER:
          return permission.reportCustomer;

        case MENU_KEY.REPORTS_IQR:
          return permission.reportIQR;
        case MENU_KEY.REPORTS_POINT:
          return permission.reportProgramPoint;
        case MENU_KEY.REPORTS_TOPUP:
          return permission.reportProgramTopup;
        case MENU_KEY.REPORTS_CHANCE:
          return permission.reportProgramChance;
        case MENU_KEY.REPORTS_SMS:
          return permission.reportSMSGateway;
        case MENU_KEY.REPORTS_SMS_BRANDNAME:
          return permission.reportSMSBrandname
        case MENU_KEY.SETTINGS_AREA:
          return permission.settingArea;
        case MENU_KEY.SETTINGS_GROUP_CUSTOMER:
          return permission.settingGroupCustomer;
        case MENU_KEY.SETTINGS_RETAILER_GROUP:
          return permission.viewRetailerGroup;
        case MENU_KEY.MANAGE_REPORT:
          return (
            permission.reportCustomer ||
            permission.reportIQR ||
            permission.reportProgramPoint ||
            permission.reportProgramTopup ||
            permission.reportProgramChance ||
            permission.reportSMSGateway||
            permission.reportSMSBrandname
          );
        case MENU_KEY.MANAGE_SETTING:
          return (
            permission.settingArea ||
            permission.settingGroupCustomer ||
            permission.viewRetailerGroup ||
            permission.viewBrand ||
            permission.viewIndication ||
            permission.viewFormulation
          );
        case MENU_KEY.SETTINGS_BRAND:
          return permission.viewBrand;
        case MENU_KEY.SETTINGS_INDICATION:
          return permission.viewIndication;
        case MENU_KEY.SETTINGS_FORMULATION:
          return permission.viewFormulation;
        case MENU_KEY.SETTING_TITLE:
          if (
            permission.settingArea ||
            permission.settingGroupCustomer ||
            permission.viewRetailerGroup ||
            permission.viewBrand ||
            permission.viewIndication ||
            permission.viewFormulation
          )
            return true;
          return false;
        case MENU_KEY.REPORTS_SMS:
          return permission.reportSMSGateway
        case MENU_KEY.REPORTS_SMS_BRANDNAME:
          return permission.reportSMSBrandname
        case MENU_KEY.WAREHOUSES_MATERIAL:
          return (
            permission.viewSearchBatchNumber ||
            permission.viewCreateManufacturOrder
          );
        case MENU_KEY.WAREHOUSES_SEARCH_BATCH_NUMBER: {
          return permission.viewSearchBatchNumber;
        }
        case MENU_KEY.WAREHOUSES_CREATE_MANUFACTURE_ORDER: {
          return permission.viewCreateManufacturOrder;
        }
        case MENU_KEY.WAREHOUSES_REPORT_INGREDIENT:
          return permission.viewWarehouseReportIngredient;
        case MENU_KEY.WAREHOUSES: {
          return (
            permission.viewWarehouseSearchImport ||
            permission.viewWarehouseSearchExport ||
            permission.viewSearchRetailer1 ||
            permission.viewWarehouseListExport ||
            permission.viewWarehouseListImport ||
            permission.viewWarehouseSearchToday
          );
        }
        case MENU_KEY.WAREHOUSES_SEARCH_EXPORT:
          return permission.warehouseSearchExport;
        case MENU_KEY.WAREHOUSES_SEARCH_IMPORT:
          return permission.warehouseSearchImport;
        case MENU_KEY.WAREHOUSES_LIST_IMPORT:
          return permission.warehouseListImport;
        case MENU_KEY.WAREHOUSES_LIST_EXPORT:
          return permission.warehouseListExport;
        case MENU_KEY.WAREHOUSES_REPORT_EXPORT:
          return permission.warehouseReportExport;
        case MENU_KEY.WAREHOUSES_REPORT_INVENTORY:
          return permission.warehouseInventoryInfo;
        case MENU_KEY.WAREHOUSES_SEARCH_RETAILER_1:
          return permission.viewSearchRetailer1
        case MENU_KEY.WAREHOUSES_SEARCH_TODAY:
          return permission.viewWarehouseSearchToday
        default:
          return true;
      }
    }
    return true;
  }

  const navItem = (path: string, key?: string) => {
    if (isPermitAccess(key)) {
      navigate(path);
    } else toast.showToast("Bạn không được quyền truy cập tính năng này");
  };

  function menuResizeFn() {
    const theme = store.getState().theme;

    WindowPreSize.push(window.innerWidth);
    if (WindowPreSize.length > 2) {
      WindowPreSize.shift();
    }

    if (WindowPreSize.length > 1) {
      if (
        WindowPreSize[WindowPreSize.length - 1] < 992 &&
        WindowPreSize[WindowPreSize.length - 2] >= 992
      ) {
        // less than 992;
        ThemeChanger({ ...theme, toggled: "close" });
      }

      if (
        WindowPreSize[WindowPreSize.length - 1] >= 992 &&
        WindowPreSize[WindowPreSize.length - 2] < 992
      ) {
        // greater than 992
        ThemeChanger({
          ...theme,
          toggled:
            theme.dataVerticalStyle == "doublemenu" ? "double-menu-open" : "",
        });
      }
    }
  }

  function switcherArrowFn(): void {
    // Used to remove is-expanded class and remove class on clicking arrow buttons
    function slideClick(): void {
      const slide = document.querySelectorAll<HTMLElement>(".slide");
      const slideMenu = document.querySelectorAll<HTMLElement>(".slide-menu");

      slide.forEach((element) => {
        if (element.classList.contains("is-expanded")) {
          element.classList.remove("is-expanded");
        }
      });

      slideMenu.forEach((element) => {
        if (element.classList.contains("open")) {
          element.classList.remove("open");
          element.style.display = "none";
        }
      });
    }

    slideClick();
  }

  function slideRight(): void {
    const menuNav = document.querySelector<HTMLElement>(".main-menu");
    const mainContainer1 = document.querySelector<HTMLElement>(".main-sidebar");

    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(
          window.getComputedStyle(menuNav).marginInlineStart.split("px")[0]
        )
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataVerticalStyle.dir === "rtl")) {
          if (Math.abs(check) > Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineEnd = "0";

            if (
              !(
                Math.abs(check) >
                Math.abs(marginLeftValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
              const slideRightButton =
                document.querySelector<HTMLElement>("#slide-right");
              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";

            const slideRightButton =
              document.querySelector<HTMLElement>("#slide-right");
            if (slideRightButton) {
              slideRightButton.classList.remove("hidden");
            }
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineEnd = "0";

            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);
              const slideRightButton =
                document.querySelector<HTMLElement>("#slide-right");
              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";

            const slideLeftButton =
              document.querySelector<HTMLElement>("#slide-left");
            if (slideLeftButton) {
              slideLeftButton.classList.remove("hidden");
            }
          }
        }
      }

      const element = document.querySelector<HTMLElement>(
        ".main-menu > .slide.open"
      );
      const element1 = document.querySelector<HTMLElement>(
        ".main-menu > .slide.open > ul"
      );
      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
  }

  function slideLeft(): void {
    const menuNav = document.querySelector<HTMLElement>(".main-menu");
    const mainContainer1 = document.querySelector<HTMLElement>(".main-sidebar");

    if (menuNav && mainContainer1) {
      const marginLeftValue = Math.ceil(
        Number(
          window.getComputedStyle(menuNav).marginInlineStart.split("px")[0]
        )
      );
      const marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginInlineEnd.split("px")[0])
      );
      const check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(local_varaiable.dataVerticalStyle.dir === "rtl")) {
          if (Math.abs(check) <= Math.abs(marginLeftValue)) {
            menuNav.style.marginInlineStart = "0px";
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginInlineStart = "0";

            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);
              const slideRightButton =
                document.querySelector<HTMLElement>("#slide-right");
              if (slideRightButton) {
                slideRightButton.classList.add("hidden");
              }
            }

            menuNav.style.marginInlineStart =
              Number(menuNav.style.marginInlineStart.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";

            const slideLeftButton =
              document.querySelector<HTMLElement>("#slide-left");
            if (slideLeftButton) {
              slideLeftButton.classList.remove("hidden");
            }
          }
        }
      }

      const element = document.querySelector<HTMLElement>(
        ".main-menu > .slide.open"
      );
      const element1 = document.querySelector<HTMLElement>(
        ".main-menu > .slide.open > ul"
      );
      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
  }

  const Topup = () => {
    if (window.scrollY > 30 && document.querySelector(".app-sidebar")) {
      const Scolls = document.querySelectorAll(".app-sidebar");
      Scolls.forEach((e) => {
        e.classList.add("sticky-pin");
      });
    } else {
      const Scolls = document.querySelectorAll(".app-sidebar");
      Scolls.forEach((e) => {
        e.classList.remove("sticky-pin");
      });
    }
  };
  window.addEventListener("scroll", Topup);

  const level = 0;
  let hasParent = false;
  let hasParentLevel = 0;

  function setSubmenu(event: any, targetObject: any, MENUITEMS = menuitems) {
    const theme = store.getState().theme;

    if (
      (window.screen.availWidth <= 992 || theme.dataNavStyle != "icon-hover") &&
      (window.screen.availWidth <= 992 || theme.dataNavStyle != "menu-hover")
    ) {
      if (!event?.ctrlKey) {
        for (const item of MENUITEMS) {
          if (item === targetObject) {
            item.active = true;
            item.selected = true;
            // setMenuAncestorsActive(MENUITEMS,item);
            setMenuAncestorsActive(item);
          } else if (!item.active && !item.selected) {
            item.active = false; // Set active to false for items not matching the target
            item.selected = false; // Set active to false for items not matching the target
          } else {
            // removeActiveOtherMenus(MENUITEMS,item);
            removeActiveOtherMenus(item);
          }
          if (item.children && item.children.length > 0) {
            setSubmenu(event, targetObject, item.children);
          }
        }
      }
    }

    setMenuitems((arr: any) => [...arr]);
  }
  function getParentObject(obj: any, childObject: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          typeof obj[key] === "object" &&
          JSON.stringify(obj[key]) === JSON.stringify(childObject)
        ) {
          return obj; // Return the parent object
        }
        if (typeof obj[key] === "object") {
          const parentObject: any = getParentObject(obj[key], childObject);
          if (parentObject !== null) {
            return parentObject;
          }
        }
      }
    }
    return null; // Object not found
  }
  function setMenuAncestorsActive(targetObject: any) {
    const parent = getParentObject(menuitems, targetObject);

    if (parent) {
      if (hasParentLevel > 2) {
        hasParent = true;
      }
      parent.active = true;
      parent.selected = true;
      hasParentLevel += 1;
      setMenuAncestorsActive(parent);
    } else if (!hasParent) {
      const theme = store.getState().theme;

      if (theme.dataVerticalStyle == "doublemenu") {
        // console.log("closee")
        // html.setAttribute('data-toggled', 'double-menu-close');
        ThemeChanger({ ...theme, toggled: "double-menu-close" });
      }
    }
  }
  function removeActiveOtherMenus(item: any) {
    if (item) {
      if (Array.isArray(item)) {
        for (const val of item) {
          val.active = false;
          val.selected = false;
        }
      }
      item.active = false;
      item.selected = false;

      if (item.children && item.children.length > 0) {
        removeActiveOtherMenus(item.children);
      }
    } else {
      return;
    }
  }
  //
  function setMenuUsingUrl(currentPath: any) {
    hasParent = false;
    hasParentLevel = 1;
    // Check current url and trigger the setSidemenu method to active the menu.
    const setSubmenuRecursively = (items: any) => {
      items?.forEach((item: any) => {
        if (item.path == "") {
        } else if (item.path === currentPath) {
          setSubmenu(null, item);
        }
        setSubmenuRecursively(item.children);
      });
    };
    setSubmenuRecursively(MENUITEMS);
  }
  const [previousUrl, setPreviousUrl] = useState("/");

  useEffect(() => {
    // Select the target element
    const targetElement = document.documentElement;

    // Create a MutationObserver instance
    const observer = new MutationObserver(handleAttributeChange);

    // Configure the observer to watch for attribute changes
    const config = { attributes: true };

    // Start observing the target element
    observer.observe(targetElement, config);
    let currentPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;

    if (currentPath !== previousUrl) {
      setMenuUsingUrl(currentPath);
      setPreviousUrl(currentPath);
    }

    // ... the rest of your useEffect code
  }, [location]);

  //
  function toggleSidemenu(
    event: any,
    targetObject: any,
    MENUITEMS = menuitems
  ) {
    const theme = store.getState().theme;

    let element = event.target;
    if (
      (theme.dataNavStyle !== "icon-hover" &&
        theme.dataNavStyle !== "menu-hover") ||
      window.innerWidth < 992 ||
      theme.dataNavLayout !== "horizontal" ||
      (theme.toggled !== "icon-hover-closed" &&
        theme.toggled !== "menu-hover-closed")
    ) {
      for (const item of MENUITEMS) {
        if (item === targetObject) {
          if (theme.dataVerticalStyle == "doublemenu" && item.active) {
            return;
          }
          item.active = !item.active;

          if (item.active) {
            closeOtherMenus(MENUITEMS, item);
          } else {
            if (theme.dataVerticalStyle == "doublemenu") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            }
          }
          setAncestorsActive(MENUITEMS, item);
        } else if (!item.active) {
          if (theme.dataVerticalStyle != "doublemenu") {
            item.active = false; // Set active to false for items not matching the target
          }
        }
        if (item.children && item.children.length > 0) {
          toggleSidemenu(event, targetObject, item.children);
        }
      }
      if (targetObject?.children && targetObject.active) {
        if (
          theme.dataVerticalStyle == "doublemenu" &&
          theme.toggled != "double-menu-open"
        ) {
          ThemeChanger({ ...theme, toggled: "double-menu-open" });
        }
      }
      if (
        element &&
        theme.dataNavLayout == "horizontal" &&
        (theme.dataNavStyle == "menu-click" ||
          theme.dataNavStyle == "icon-click")
      ) {
        const listItem = element.closest("li");
        if (listItem) {
          // Find the first sibling <ul> element
          const siblingUL = listItem.querySelector("ul");
          let outterUlWidth = 0;
          let listItemUL = listItem.closest("ul:not(.main-menu)");
          while (listItemUL) {
            listItemUL = listItemUL.parentElement.closest("ul:not(.main-menu)");
            if (listItemUL) {
              outterUlWidth += listItemUL.clientWidth;
            }
          }
          if (siblingUL) {
            // You've found the sibling <ul> element
            let siblingULRect = listItem.getBoundingClientRect();
            if (theme.dir == "rtl") {
              if (
                siblingULRect.left - siblingULRect.width - outterUlWidth + 150 <
                  0 &&
                outterUlWidth < window.innerWidth &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                  window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            } else {
              if (
                outterUlWidth + siblingULRect.right + siblingULRect.width + 50 >
                  window.innerWidth &&
                siblingULRect.right >= 0 &&
                outterUlWidth + siblingULRect.width + siblingULRect.width <
                  window.innerWidth
              ) {
                targetObject.dirchange = true;
              } else {
                targetObject.dirchange = false;
              }
            }
          }
          setTimeout(() => {
            let computedValue = siblingUL.getBoundingClientRect();
            if (computedValue.bottom > window.innerHeight) {
              siblingUL.style.height =
                window.innerHeight - computedValue.top - 8 + "px";
              siblingUL.style.overflow = "auto";
            }
          }, 100);
        }
      }
    }
    setMenuitems((arr: any) => [...arr]);
  }

  function setAncestorsActive(MENUITEMS: any, targetObject: any) {
    const theme = store.getState().theme;

    const parent = findParent(MENUITEMS, targetObject);
    if (parent) {
      parent.active = true;
      if (parent.active) {
        ThemeChanger({ ...theme, toggled: "double-menu-open" });
      }

      setAncestorsActive(MENUITEMS, parent);
    } else {
      if (theme.dataVerticalStyle == "doublemenu") {
        ThemeChanger({ ...theme, toggled: "double-menu-close" });
      }
    }
  }

  function closeOtherMenus(MENUITEMS: any, targetObject: any) {
    for (const item of MENUITEMS) {
      if (item !== targetObject) {
        item.active = false;
        if (item.children && item.children.length > 0) {
          closeOtherMenus(item.children, targetObject);
        }
      }
    }
  }

  function findParent(MENUITEMS: any, targetObject: any) {
    for (const item of MENUITEMS) {
      if (item.children && item.children.includes(targetObject)) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const parent: any = findParent(
          (MENUITEMS = item.children),
          targetObject
        );
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }

  const Sideclick = () => {
    if (window.innerWidth > 992) {
      let html = document.documentElement;
      if (html.getAttribute("data-icon-overlay") != "open") {
        html.setAttribute("data-icon-overlay", "open");
      }
    }
  };
  function handleAttributeChange(mutationsList: any) {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        (mutation.attributeName === "data-nav-layout" ||
          mutation.attributeName === "data-vertical-style")
      ) {
        const newValue = mutation.target.getAttribute("data-nav-layout");
        if (newValue == "vertical") {
          let currentPath = location.pathname.endsWith("/")
            ? location.pathname.slice(0, -1)
            : location.pathname;
          currentPath = !currentPath ? "/dashboard/ecommerce" : currentPath;
          setMenuUsingUrl(currentPath);
        } else {
          closeMenuFn();
        }
      }
    }
  }
  return (
    <Fragment>
      <div
        id="responsive-overlay"
        onClick={() => {
          menuClose();
        }}
      ></div>
      <aside
        className="app-sidebar"
        id="sidebar"
        onMouseEnter={() => Onhover()}
        onMouseLeave={() => Outhover()}
      >
        <div className="main-sidebar-header">
          <div
            onClick={() =>
              navItem(
                `${import.meta.env.BASE_URL}dashboards`,
                MENU_KEY.DASHBOARD
              )
            }
            className="header-logo"
          >
            <img
              src={NganAnhLogo}
              alt="logo"
              className="desktop-logo"
              style={{ height: 50 }}
            />
            <img
              src={NganAnhLogo}
              alt="logo"
              className="toggle-logo"
              style={{ height: 50 }}
            />
            <img
              src={NganAnhLogo}
              alt="logo"
              className="desktop-dark"
              style={{ height: 50 }}
            />
            <img
              src={NganAnhLogo}
              alt="logo"
              className="toggle-dark"
              style={{ height: 50 }}
            />
          </div>
        </div>
        <SimpleBar
          className="main-sidebar"
          id="sidebar-scroll"
          style={{ height: "100%" }}
        >
          <nav className="main-menu-container nav nav-pills flex-column sub-open">
            <div
              className="slide-left"
              id="slide-left"
              onClick={() => {
                slideLeft();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </div>

            <ul className="main-menu" onClick={() => Sideclick()}>
              {MENUITEMS.map((levelone: any) => (
                <Fragment key={Math.random()}>
                  <li
                    className={`${
                      levelone.menutitle ? "slide__category" : ""
                    } ${levelone.type === "link" ? "slide" : ""}
                       ${levelone.type === "sub" ? "slide has-sub" : ""} ${
                      levelone?.active ? "open" : ""
                    } ${levelone?.selected ? "active" : ""}`}
                  >
                    {levelone.menutitle && isPermitAccess(levelone?.key) ? (
                      <span className="category-name">
                        {levelone.menutitle}
                      </span>
                    ) : (
                      ""
                    )}
                    {levelone.type === "link" &&
                    isPermitAccess(levelone?.key) ? (
                      <Link
                        to={levelone.path + "/"}
                        className={`side-menu__item ${
                          levelone.selected ? "active" : ""
                        } `}
                      >
                        <span className="side-menu__icon">{levelone.icon}</span>
                        <span className="side-menu__label">
                          {levelone.title}
                          {levelone.badgetxt ? (
                            <span className={levelone.class}>
                              {levelone.badgetxt}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                    ) : (
                      ""
                    )}
                    {levelone.type === "empty" ? (
                      <Link to="#" className="side-menu__item">
                        {levelone.icon}
                        <span className="">
                          {levelone.title}
                          {levelone.badgetxt ? (
                            <span className={levelone.class}>
                              {levelone.badgetxt}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                    ) : (
                      ""
                    )}
                    {levelone.type === "sub" &&
                    isPermitAccess(levelone?.key) ? (
                      <Menuloop
                        MENUITEMS={levelone}
                        level={level + 1}
                        toggleSidemenu={toggleSidemenu}
                        isPermitAccess={isPermitAccess}
                      />
                    ) : (
                      ""
                    )}
                  </li>
                </Fragment>
              ))}
            </ul>
            <div
              className="slide-right"
              id="slide-right"
              onClick={() => {
                slideRight();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </nav>
        </SimpleBar>
      </aside>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state.theme,
});

export default connect(mapStateToProps, { ThemeChanger })(Sidebar);
