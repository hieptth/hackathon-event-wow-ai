export function smoothAnchor() {
  document.querySelectorAll("a").forEach(function (ele) {
    const href = ele.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const id = href.substring(1);
    const target = document.getElementById(id);
    if (!target) return;

    ele.addEventListener("click", function (evt) {
      evt.preventDefault();
      target.scrollIntoView({
        top: target.getBoundingClientRect().y,
        behavior: "auto",
      });
    });
  });
}

export function entranceAnimation(items, activeClass) {
  let timeout;

  function checkState() {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (i === 0) window.item = item;

      if (item.getBoundingClientRect().y + 32 < window.innerHeight) {
        !item.classList.contains(activeClass) &&
          item.classList.add(activeClass);
      } else {
        item.classList.contains(activeClass) &&
          item.classList.remove(activeClass);
      }
    }
  }

  window.addEventListener("scroll", function () {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      checkState();
    }, 25);
  });

  checkState();
}

export function startTyping(
  element,
  text,
  initialText = "",
  caret = "|",
  cbFinish = null
) {
  element.innerHTML = initialText;
  let i = 0;
  let isFinished = false;
  let timeout;
  const eleContent = document.createElement("SPAN");
  const caretElement = document.createElement("SPAN");
  caretElement.innerHTML = caret;
  element.appendChild(eleContent);

  function next() {
    window.requestAnimationFrame(function () {
      element.insertAdjacentElement("beforeend", caretElement);
      let currentChar = text.charAt(i);

      if (currentChar === "<") {
        // If the current character is the beginning of an HTML tag, find the end of the tag and insert it into the element
        let endIndex = text.indexOf(">", i) + 1;
        let tag = text.substring(i, endIndex);
        eleContent.innerHTML += tag;
        i = endIndex;
      } else {
        // If the current character is not the beginning of an HTML tag, insert it into the element
        eleContent.innerHTML += currentChar;
        i++;
      }

      if (i < text.length) {
        timeout = setTimeout(function () {
          next();
        }, 50);
      } else {
        isFinished = true;
        eleContent.outerHTML = eleContent.innerHTML;
        cbFinish && cbFinish();
        element.removeChild(caretElement);
      }
    });
  }

  next();

  return function () {
    if (isFinished) return;
    clearTimeout(timeout);
    eleContent.outerHTML = text;
    element.removeChild(caretElement);
  };
}

export function openTab(evt, value, curBtn, hideClass, deactivateBtn) {
  // Declare all variables
  var i, tabContent, tabLinks;

  // Get all elements with class="tabContent" and hide them
  tabContent = document.getElementsByClassName(hideClass);
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tabLinks" and remove the class "active"
  tabLinks = document.getElementsByClassName(deactivateBtn);
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(value).style.display = "block";
  document.getElementById(curBtn).classList.add("active");
}

const timer = document.getElementById("timer");

export function countdownTimer() {
  // Set the date we're counting down to
  var countDownDate = new Date("Sep 28, 2023 09:00:00").getTime();

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    timer.innerHTML =
      days + "D : " + hours + "h : " + minutes + "m :" + seconds + "s";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "EXPIRED";
    }
  }, 1000);
}
