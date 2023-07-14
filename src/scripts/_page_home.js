import Splide from "@splidejs/splide";
import { startTyping } from "./_shared.js";
import { entranceAnimation as baseEntranceAnimation } from "./_shared.js";

export function entranceAnimation() {
  baseEntranceAnimation(
    document.getElementsByClassName("entrance-animation"),
    "entrance-animation--show"
  );
}

export function partnersSlide(id) {
  const partnersCarousel = document.getElementById(id);

  if (partnersCarousel) {
    requestAnimationFrame(function () {
      new Splide(partnersCarousel, {
        autoplay: true,
        arrows: false,
        pagination: true,
        interval: 5000,
        pauseOnHover: true,
        type: "slide",
        gap: "3rem",
        perPage: 3,
        height: "124%",
        autoWidth: true,
        breakpoints: {
          480: {
            perPage: 1,
          },
          768: {
            perPage: 2,
          },
        },
      }).mount();
    });
  }
}

export function attendSlide() {
  const attendCarousel = document.getElementById("attend__list");

  if (attendCarousel) {
    requestAnimationFrame(function () {
      const carousel = new Splide(attendCarousel, {
        autoplay: false,
        arrows: false,
        pauseOnHover: true,
        drag: true,
        type: "slide",
        gap: "1.5rem",
        pagination: false,
        perPage: 3,
        height: "124%",
        breakpoints: {
          480: {
            perPage: 1,
          },
          768: {
            perPage: 2,
          },
        },
      });

      //attach events to custom buttons
      document.getElementById("btnNext").addEventListener("click", (e) => {
        carousel.go(">");
      });

      document.getElementById("btnPrev").addEventListener("click", (e) => {
        carousel.go("<");
      });

      carousel.mount();
    });
  }
}

export function sponsorsSlide() {
  const sponsorsCarousel = document.getElementById("sponsors__list");

  if (sponsorsCarousel) {
    requestAnimationFrame(function () {
      new Splide(sponsorsCarousel, {
        autoplay: true,
        arrows: false,
        pagination: true,
        drag: true,
        interval: 5000,
        pauseOnHover: true,
        type: "slide",
        perPage: 5,
        width: "100%",
        height: "124%",
        breakpoints: {
          768: {
            perPage: 2,
          },
          1024: {
            perPage: 3,
          },
        },
      }).mount();
    });
  }
}

export function outletsSlide(id) {
  const partnersCarousel = document.getElementById(id);

  if (partnersCarousel) {
    requestAnimationFrame(function () {
      new Splide(partnersCarousel, {
        autoplay: false,
        arrows: false,
        pagination: true,
        interval: 5000,
        pauseOnHover: true,
        type: "slide",
        gap: "3rem",
        perPage: 6,
        height: "124%",
        autoWidth: true,
        breakpoints: {
          480: {
            perPage: 2,
          },
          768: {
            perPage: 4,
          },
        },
      }).mount();
    });
  }
}

export function typingHeroText() {
  const eleText = document.querySelector(".hero__text");
  if (!eleText) return;
  const textContent = eleText.innerHTML;
  let stopTyping, nextTimeout;

  function setHeight() {
    eleText.style.height = eleText.clientHeight + "px";
  }

  function start() {
    eleText.innerHTML = "";

    stopTyping = startTyping(eleText, textContent, "", "|", function () {
      nextTimeout = setTimeout(function () {
        start();
      }, 5000);
    });
  }

  setHeight();
  start();
}
