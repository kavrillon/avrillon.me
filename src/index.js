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
  window.addEventListener('online', () => setNetworkMode(true, true));
  window.addEventListener('offline', () => setNetworkMode(false, true));
}

// Set the network mode (class + notif)
function setNetworkMode(isOnline, notify) {
  if (notify) {
    notifyNetworkChange(isOnline);
  }
  setNetworkClass(isOnline);
}

// Notify the network change (online/offline)
function notifyNetworkChange(isOnline) {
  const selectorHome = document.querySelector('.home');
  selectorHome.classList.remove('home--notify-offline', 'home--notify-online');
  if (isOnline) {
    selectorHome.classList.add('home--notify-online');
  } else {
    selectorHome.classList.add('home--notify-offline');
  }
}

// Set the mode of the app visually (online/offline)
function setNetworkClass(isOnline) {
  const selectorHome = document.querySelector('.home');
  selectorHome.classList.remove('home--offline', 'home--online');
  if (isOnline) {
    selectorHome.classList.add('home--online');
  } else {
    selectorHome.classList.add('home--offline');
  }
}

// Remove the splashscreen and show home
function loadHome() {
  const selectorHome = document.querySelector('.home');
  selectorHome.classList.add('home--loaded');

  // Network detection (notify when offline)
  setTimeout(() => {
    const isOnline = navigator.onLine;
    setNetworkMode(isOnline, !isOnline);
  }, 2000);
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
