// Imports
import clipboardCopy from 'clipboard-copy';

// Globals
let ALERT_TIMER;

// Load
window.onload = init;

function init() {
  // Service worker registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js');
  }

  // Network detection
  setNetworkMode(isOnline());

  // Loading
  bindEvents();
  setTimeout(loadHome, 3000);
}

// Global event binding
function bindEvents() {
  // Email
  const ctaEmailButton = document.querySelector('[data-cta-email-button]');

  ctaEmailButton.addEventListener('keypress', e => {
    launchCopyIfEnterPressed(e, ctaEmailButton);
  });
  ctaEmailButton.addEventListener('click', () => {
    launchCopy(ctaEmailButton);
  });

  // Network binding
  window.addEventListener('online', () => setNetworkMode(true));
  window.addEventListener('offline', () => setNetworkMode(false));
}

// Return true if online, else otherwise
function isOnline() {
  return navigator.onLine;
}

// Set the mode of the app visually (online/offline)
function setNetworkMode(isOnline) {
  const selectorHome = document.querySelector('.home');
  if (isOnline) {
    selectorHome.classList.remove('home--offline');
  } else {
    selectorHome.classList.add('home--offline');
  }
}

// Remove the splashscreen and show home
function loadHome() {
  const selectorHome = document.querySelector('.home');
  selectorHome.classList.add('home--loaded');
}

// Copy methods: launch copy for keyboard nav
function launchCopyIfEnterPressed(event, element) {
  const key = event.which || event.keyCode;
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
    () => {
      element.classList.add('active');
      setTimeout(() => {
        element.classList.remove('active');
        element.blur();
      }, 5000);
    },
    () => {
      // do nothing
    },
  );
}
