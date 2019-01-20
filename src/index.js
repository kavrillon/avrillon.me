import clipboardCopy from "clipboard-copy";

var ALERT_TIMER;

// Load
window.onload = function init() {
  loadEvents();
};
// Methods

function loadEvents() {
  var ctaEmail = document.querySelector("[data-cta-email]");
  var body = document.querySelector(".home");

  ctaEmail.addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      launchCopy(ctaEmail);
    }
  });

  ctaEmail.addEventListener("click", function() {
    launchCopy(ctaEmail);
  });

  setTimeout(function() {
    body.classList.add("loaded");
  }, 3000);
}

function launchCopy(button) {
  if (ALERT_TIMER) {
    return;
  }

  var previousText = button.innerHTML;
  clipboardCopy(button.innerText.trim()).then(
    function() {
      alertText(
        button,
        previousText,
        "Email copied.<br />Drop me a word!",
        3000
      );
    },
    function() {
      // do nothing
    }
  );
}

function alertText(element, previousText, alertText, timer) {
  element.classList.add("active");
  element.innerHTML = alertText;

  ALERT_TIMER = setTimeout(function() {
    element.classList.remove("active");
    element.innerHTML = previousText;
    ALERT_TIMER = null;
  }, timer);
}
