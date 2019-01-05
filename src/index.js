import clipboardCopy from "clipboard-copy";

var ALERT_TIMER;

// Load
window.onload = function init() {
  loadImages();

  loadEvents();
};
// Methods

function loadImages() {
  var win, doc, img, header, enhancedClass;
  // Quit early if older browser (e.g. IE8).
  if (!("addEventListener" in window)) {
    return;
  }

  win = window;
  doc = win.document;
  img = new Image();
  header = doc.querySelector(".splash");
  enhancedClass = "splash--loaded";

  // Rather convoluted, but parses out the first mention of a background
  // image url for the enhanced header, even if the style is not applied.
  var bigSrc = (function() {
    // Find all of the CssRule objects inside the inline stylesheet
    var styles = doc.querySelector("style").sheet.cssRules;
    // Fetch the background-image declaration...
    var bgDecl = (function() {
      // ...via a self-executing function, where a loop is run
      var bgStyle,
        i,
        l = styles.length;
      for (i = 0; i < l; i++) {
        // ...checking if the rule is the one targeting the
        // enhanced header.
        if (
          styles[i].selectorText &&
          styles[i].selectorText === "." + enhancedClass + "::before"
        ) {
          // If so, set bgDecl to the entire background-image
          // value of that rule
          bgStyle = styles[i].style.backgroundImage;
          // ...and break the loop.
          break;
        }
      }
      // ...and return that text.
      return bgStyle;
    })();
    // Finally, return a match for the URL inside the background-image
    // by using a fancy regex i Googled up, if the bgDecl variable is
    // assigned at all.
    return bgDecl && bgDecl.match(/(?:\(['|"]?)(.*?)(?:['|"]?\))/)[1];
  })();

  // Assign an onLoad handler to the dummy image *before* assigning the src
  img.onload = function() {
    header.className += " " + enhancedClass;
  };
  // Finally, trigger the whole preloading chain by giving the dummy
  // image its source.
  if (bigSrc) {
    img.src = bigSrc;
  }
}

function loadEvents() {
  var ctaContact = document.getElementById("CTA_Contact");

  setTimeout(function() {
    ctaContact.classList.add("copyable");
    ctaContact.setAttribute("tabindex", "0");
    ctaContact.addEventListener("keypress", function(e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        launchCopy(ctaContact);
      }
    });

    ctaContact.addEventListener("click", function() {
      launchCopy(ctaContact);
    });
  }, 1000);
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
