// main.js - Main entry point
import { loadSocialLinks } from 'https://www.sipa.ingr.in/janvikantumae.js';
import { renderSocialLinks } from './janvikantumae.js';
import { updateYear } from 'https://www.sipa.ingr.in/varsha.js';

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
