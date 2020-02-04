// ativar modo escuro
const isDarkThemeEnabled = () => {
  return Boolean(document.querySelector('html').hasAttribute('dark'));
};

const isMenuButtonAvailableInDom = () => {
  return Boolean(document.querySelectorAll('ytd-topbar-menu-button-renderer')[2]);
};

const openCloseMenu = () => {
  document.querySelectorAll('ytd-topbar-menu-button-renderer')[2].click();
  document.querySelectorAll('ytd-topbar-menu-button-renderer')[2].click();
};

const isCompactLinkAvailableInDom = () => {
  return Boolean(document.querySelector('ytd-toggle-theme-compact-link-renderer'));
};

const openCloseRenderer = () => {
  document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
  document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
};

const isSwitchAvailableInDom = () => {
  return Boolean(document.querySelector(
    'paper-toggle-button.ytd-toggle-item-renderer',
  ));
};

const switchToDarkTheme = () => {
  if (isCompactLinkAvailableInDom() && isSwitchAvailableInDom()) {
    document.querySelector('ytd-toggle-theme-compact-link-renderer').click();
    document
      .querySelector('paper-toggle-button.ytd-toggle-item-renderer')
      .click();
  }
};
    
let start = null;
const trySwitchingToDark = (timestamp) => {

  if (isDarkThemeEnabled()) {
    return;
  }

  if (!start) {
    start = timestamp;
  }
  const runtime = timestamp - start;
  
  if(runtime < 10000) {
    if (!isMenuButtonAvailableInDom()) {
      window.requestAnimationFrame(trySwitchingToDark);
    } else if (!isCompactLinkAvailableInDom()) {
      openCloseMenu();
      window.requestAnimationFrame(trySwitchingToDark);
    } else if (!isSwitchAvailableInDom()) {
      openCloseRenderer();
      window.requestAnimationFrame(trySwitchingToDark);
    } else {
      switchToDarkTheme();
    }
  }
};

window.requestAnimationFrame(trySwitchingToDark);