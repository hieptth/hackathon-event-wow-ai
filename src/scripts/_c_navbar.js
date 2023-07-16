export default function initComponentNavbar(
  CLASS_NAVBAR,
  CLASS_NAVBAR_LINKS,
  CLASS_NAVBAR_LINKS_OPEN,
  CLASS_NAVBAR_OPEN_TRIGGER,
  CLASS_NAVBAR_CLOSE_TRIGGER
) {
  const navbar = document.querySelector("." + CLASS_NAVBAR);
  if (!navbar) return;
  const navbarLinks = navbar.querySelector("." + CLASS_NAVBAR_LINKS);
  if (!navbarLinks) return;
  const opener = navbar.querySelector("." + CLASS_NAVBAR_OPEN_TRIGGER);

  function open() {
    navbarLinks.classList.add(CLASS_NAVBAR_LINKS_OPEN);
  }

  function close() {
    navbarLinks.classList.remove(CLASS_NAVBAR_LINKS_OPEN);
  }

  for (let i = 0; i < navbarLinks.children.length; i++) {
    navbarLinks.children[i].addEventListener("click", function () {
      close();
    });
  }

  if (opener) {
    opener.addEventListener("click", function () {
      open();
    });
  }

  const closer = navbar.querySelector("." + CLASS_NAVBAR_CLOSE_TRIGGER);

  if (closer) {
    closer.addEventListener("click", function () {
      close();
    });
  }

  const navEl = document.querySelector(".c-navbar");

  window.addEventListener("scroll", () => {
    var section1 = document.getElementById("landingPage");
    var section1Height = section1.offsetHeight;

    // if (window.scrollY < window.document.body.clientHeight) {
    //   console.log("hehe");
    //   document.getElementById("attend").scrollIntoView();
    // }

    if (window.scrollY > section1Height - 150) {
      navEl.style.display = "block";
      document.getElementById("landingPage").style.display = "none";
    } else {
      navEl.style.display = "none";
    }

    if (window.scrollY >= section1Height + 80) {
      navEl.classList.add("navbar-scrolled");
    } else if (window.scrollY <= section1Height + 80) {
      navEl.classList.remove("navbar-scrolled");
    }
  });
}
