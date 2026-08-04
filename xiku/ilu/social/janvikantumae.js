// socialLoader.js - Main social links loader
import { getDataSource } from './dataSource.js';
import { loadFromTxt } from 'https://www.sipa.ingr.in/kalpu.js';
import { loadFromJson } from 'https://www.sipa.ingr.in/alpu.js';

export async function loadSocialLinks(sinuElem, dataFile) {
  const sourceType = getDataSource(sinuElem, dataFile);
  if (sourceType === 'txt') {
    return await loadFromTxt(dataFile);
  } else {
    let jsonData = await loadFromJson(dataFile);
    if (jsonData) return jsonData;
    console.log('JSON not found, trying TXT fallback...');
    return await loadFromTxt(dataFile);
  }
}