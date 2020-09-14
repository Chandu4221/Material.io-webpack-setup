// default index.hmtl page
import index from "../index.html";
// seperate html file
import page from "../page.html";
// default scs styles
import css from "../scss/style.scss";

//MATERIAL WEB COMPONENTS CODE GOES HERE
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";
import { MDCList } from "@material/list";
import { MDCDataTable } from "@material/data-table";
import { MDCMenu } from "@material/menu";

// drodpwn menus
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const dropdownTrigger = dropdown.querySelector(".dropdown-trigger");
  const dropdownMenu = dropdown.querySelector(".dropdown-menu");
  dropdownTrigger.addEventListener("click", () => {
    const m = new MDCMenu(dropdownMenu);
    m.setAbsolutePosition(100, 100);
    m.open = true;
  });
});

// topAppBar Setup
const topAppBars = document.querySelectorAll(".mdc-top-app-bar");
topAppBars.forEach((topAppBar) => {
  new MDCTopAppBar(topAppBar);
});

// data tables
const dataTables = document.querySelectorAll(".mdc-data-table");
dataTables.forEach((dataTable) => {
  new MDCDataTable(dataTable);
});

// lists;
const lists = document.querySelectorAll(".mdc-list");
lists.forEach((list) => {
  MDCList.attachTo(list);
  list.wrapFocus = true;
});

//
const drawerTogglers = document.querySelectorAll(".drawer-toggler");
drawerTogglers.forEach((drawerToggler) => {
  // drawer ID from data attribute
  const drawerId = drawerToggler.dataset.targetdrawer;
  // topbar ID from data attribute
  const topbarId = drawerToggler.dataset.topappbar;
  // main content id from data attribute
  const mainId = drawerToggler.dataset.maincontent;
  // drawer Element
  const drawerElement = document.querySelector(drawerId);
  // drawer list Element
  const drawerListElement = drawerElement.querySelector(".mdc-list");
  // top app bar
  const topAppBarElement = document.querySelector(topbarId);
  // mainContentEl
  const mainContentEl = document.querySelector(mainId);

  // initialize permanent drawer
  const initPermanentDrawer = () => {
    drawerElement.classList.remove("mdc-drawer--modal");
    const list = new MDCList(drawerListElement);
    list.wrapFocus = true;
    return list;
  };

  // initialize modal drawer
  const initModalDrawer = () => {
    drawerElement.classList.add("mdc-drawer--modal");
    const drawer = MDCDrawer.attachTo(drawerElement);
    drawer.open = false;
    const topAppBar = MDCTopAppBar.attachTo(topAppBarElement);
    topAppBar.setScrollTarget(mainContentEl);
    topAppBar.listen("MDCTopAppBar:nav", () => {
      drawer.open = !drawer.open;
    });
    drawerListElement.addEventListener("click", () => {
      drawer.open = false;
    });
    return drawer;
  };

  // initialize the drawer
  let drawer = window.matchMedia("(max-width: 900px)").matches
    ? initModalDrawer()
    : initPermanentDrawer();

  const resizeHandler = () => {
    if (
      window.matchMedia("(max-width: 900px)").matches &&
      drawer instanceof MDCList
    ) {
      drawer.destroy();
      drawer = initModalDrawer();
    } else if (
      window.matchMedia("(min-width: 900px)").matches &&
      drawer instanceof MDCDrawer
    ) {
      drawer.destroy();
      drawer = initPermanentDrawer();
    }
  };
  window.addEventListener("resize", resizeHandler);
});
