// main.js - Main entry point
import { loadSocialLinks } from 'https://www.sipa.ingr.in/xiku/ilu/social/janvikantumae.js';
import { renderSocialLinks } from 'https://www.sipa.ingr.in/xiku/ilu/social/jgpri.js';
import { updateYear } from 'https://www.sipa.ingr.in/xiku/ilu/social/varsha.js';

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
