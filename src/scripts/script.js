import initComponentNavbar from "./_c_navbar.js";
import {
  attendSlide,
  entranceAnimation,
  outletsSlide,
  partnersSlide,
  sponsorsSlide,
  typingHeroText,
} from "./_page_home.js";
import { smoothAnchor, openTab } from "./_shared.js";

window.addEventListener("DOMContentLoaded", function () {
  initComponentNavbar();
});

window.site = {
  shared: {
    smoothAnchor: smoothAnchor,
    openTab: openTab,
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
