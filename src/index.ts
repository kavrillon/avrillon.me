// Imports

import clipboardCopy from 'clipboard-copy';

// Load
window.onload = loadEvents;

function loadEvents() {
  const ctaEmailButton: HTMLElement = document.querySelector('[data-cta-email-button]');

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
function launchCopyIfEnterPressed(event: KeyboardEvent, element: HTMLElement) {
  const key = event.which || event.keyCode;
  if (key === 13) {
    launchCopy(element);
  }
}

// Copy methods: launch copy if no one has been already launched
function launchCopy(element: HTMLElement) {
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
