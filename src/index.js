// Imports
import clipboardCopy from 'clipboard-copy';

// Globals
let ALERT_TIMER;

// Load
window.onload = loadEvents;

function loadEvents() {
  const ctaEmailButton = document.querySelector('[data-cta-email-button]');

  ctaEmailButton.addEventListener('keypress', e => {
    launchCopyIfEnterPressed(e, ctaEmailButton);
  });
  ctaEmailButton.addEventListener('click', () => {
    launchCopy(ctaEmailButton);
  });

  setTimeout(loadHome, 3000);
}

// Remove the slapshscreen and show home
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
