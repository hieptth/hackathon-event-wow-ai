import initComponentNavbar from "./_c_navbar.js";
import {
  attendSlide,
  entranceAnimation,
  outletsSlide,
  partnersSlide,
  sponsorsSlide,
  typingHeroText,
} from "./_page_home.js";
import { smoothAnchor, openTab, countdownTimer } from "./_shared.js";

window.addEventListener("DOMContentLoaded", function () {
  initComponentNavbar(
    "landing__nav",
    "landing__nav__links",
    "landing__nav__links--open",
    "landing__nav__btnGroup-menu",
    "landing__nav__links--close"
  );
  initComponentNavbar(
    "c-navbar",
    "c-navbar__links",
    "c-navbar__links--open",
    "c-navbar__right-menu",
    "c-navbar__links-close"
  );
});

window.site = {
  shared: {
    smoothAnchor: smoothAnchor,
    openTab: openTab,
    countdownTimer: countdownTimer,
  },
  home: {
    entranceAnimation: entranceAnimation,
    attendSlide: attendSlide,
    sponsorsSlide: sponsorsSlide,
    partnersSlide: partnersSlide,
    outletsSlide: outletsSlide,
    typingHeroText: typingHeroText,
  },
};
