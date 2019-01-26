// Imports
import clipboardCopy from "clipboard-copy";

// Globals
var ALERT_TIMER;

// Load
window.onload = function init() {
  loadEvents();
};

function loadEvents() {
  var ctaEmail = document.querySelector("[data-cta-email]");

  ctaEmail.addEventListener("keypress", launchCopyIfEnterPressed);
  ctaEmail.addEventListener("click", launchCopy);

  setTimeout(loadHome, 3000);
}

// Remove the slapshscreen and show home
function loadHome() {
  var selectorHome = document.querySelector(".home");
  selectorHome.classList.add("home--loaded");
}

// Copy methods: launch copy for keyboard nav
function launchCopyIfEnterPressed(event) {
  console.log(event);
  var key = event.which || event.keyCode;
  if (key === 13) {
    launchCopy(event);
  }
}

// Copy methods: launch copy if no one has been already launched
function launchCopy(event) {
  if (ALERT_TIMER) {
    return;
  }

  var previousText = event.target.innerHTML;
  clipboardCopy(event.target.innerText.trim()).then(
    function() {
      alertText(event.target, previousText, "Copied, drop me a word!", 3000);
    },
    function() {
      // do nothing
    }
  );
}

// Show text in div after copy
function alertText(element, previousText, alertText, timer) {
  element.classList.add("active");
  element.innerHTML = alertText;

  ALERT_TIMER = setTimeout(function() {
    element.classList.remove("active");
    element.innerHTML = previousText;
    ALERT_TIMER = null;
  }, timer);
}
