const CLASS_NAVBAR = "c-navbar";
const CLASS_NAVBAR_LINKS = "c-navbar__links";
const CLASS_NAVBAR_LINKS_OPEN = "c-navbar__links--open";
const CLASS_NAVBAR_OPEN_TRIGGER = "c-navbar__right-menu";
const CLASS_NAVBAR_CONTACT = "c-navbar__right-contact"
const CLASS_NAVBAR_CLOSE_TRIGGER = "c-navbar__links-close";

export default function initComponentNavbar() {
  const navbar = document.querySelector("." + CLASS_NAVBAR);
  if (!navbar) return;
  const navbarLinks = navbar.querySelector("." + CLASS_NAVBAR_LINKS);
  if (!navbarLinks) return;
  const opener = navbar.querySelector("." + CLASS_NAVBAR_OPEN_TRIGGER);

  function open() {
    navbarLinks.classList.add(CLASS_NAVBAR_LINKS_OPEN);
  }

  function close() {
    navbarLinks.classList.remove(CLASS_NAVBAR_LINKS_OPEN)
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

  const navEl = document.querySelector('.c-navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 80) {
      navEl.classList.add('navbar-scrolled');
    } else if (window.scrollY <= 80) {
      navEl.classList.remove('navbar-scrolled');
    }
  });
}
