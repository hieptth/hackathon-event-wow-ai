import initComponentNavbar from "./_c_navbar.js";
import { atcb_action } from "./atcb/atcb.js";
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

document.querySelectorAll(".schedule__btn").forEach(function (eleButton) {
  eleButton.addEventListener("click", addCalendar);
});

document.getElementById("add2cal").addEventListener("click", addCalendar);

function addCalendar() {
  const config = {
    name: this.getAttribute("data-name"),
    description: this.getAttribute("data-description"),
    options: [
      "Apple",
      "Google",
      "iCal",
      "Microsoft365",
      "MicrosoftTeams",
      "Outlook.com",
      "Yahoo",
    ],
    inline: true,
    timeZone: "America/Los_Angeles",
  };

  if (this.getAttribute("data-start-time")) {
    config["startTime"] = this.getAttribute("data-start-time");
  }

  if (this.getAttribute("data-start-date")) {
    config["startDate"] = this.getAttribute("data-start-date");
  }

  if (this.getAttribute("data-end-time")) {
    config["endTime"] = this.getAttribute("data-end-time");
  }

  if (this.getAttribute("data-end-date")) {
    config["endDate"] = this.getAttribute("data-end-date");
  }

  if (this.getAttribute("data-filename")) {
    config["iCalFileName"] = this.getAttribute("data-filename");
  }

  atcb_action(config, this);
}
