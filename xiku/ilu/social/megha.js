// dataSource.js - Data source detection
export function getDataSource(sinuElem, dataFile) {
  const premAttr = sinuElem ? sinuElem.getAttribute('prem') : null;
  if (premAttr && premAttr.toLowerCase() === 'txt') return 'txt';
  if (dataFile && dataFile.toLowerCase().endsWith('.txt')) return 'txt';
  return 'json';
}