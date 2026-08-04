// yearUpdater.js - Update copyright year
export function updateYear() {
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}