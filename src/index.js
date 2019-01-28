// Imports
import clipboardCopy from "clipboard-copy";

// Globals
var ALERT_TIMER;

// Load
window.onload = function init() {
  loadEvents();
};

function loadEvents() {
  var ctaEmailButton = document.querySelector("[data-cta-email-button]");

  ctaEmailButton.addEventListener("keypress", function(e) {
    launchCopyIfEnterPressed(e, ctaEmailButton);
  });
  ctaEmailButton.addEventListener("click", function() {
    launchCopy(ctaEmailButton);
  });

  setTimeout(loadHome, 3000);
}

// Remove the slapshscreen and show home
function loadHome() {
  var selectorHome = document.querySelector(".home");
  selectorHome.classList.add("home--loaded");
}

// Copy methods: launch copy for keyboard nav
function launchCopyIfEnterPressed(event, element) {
  var key = event.which || event.keyCode;
  if (key === 13) {
    launchCopy(element);
  }
}

// Copy methods: launch copy if no one has been already launched
function launchCopy(element) {
  if (ALERT_TIMER) {
    return;
  }

  clipboardCopy(element.innerText.trim()).then(
    function() {
      element.classList.add("active");
      setTimeout(function() {
        element.classList.remove("active");
        element.blur();
      }, 5000);
    },
    function() {
      // do nothing
    }
  );
}
