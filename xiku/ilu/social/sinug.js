// main.js - Main entry point
import { loadSocialLinks } from './socialLoader.js';
import { renderSocialLinks } from './socialRenderer.js';
import { updateYear } from './yearUpdater.js';

(function() {
  "use strict";

  const sinuElem = document.querySelector('sinu');
  const dataFile = sinuElem ? sinuElem.getAttribute('prem') : 'prem';

  document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadSocialLinks(sinuElem, dataFile);
    renderSocialLinks(data);
    updateYear();
  });

})();