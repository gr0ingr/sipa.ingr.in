// socialLoader.js - Main social links loader
import { getDataSource } from 'https://www.sipa.ingr.in/xiku/ilu/social/megha.js';
import { loadFromTxt } from 'https://www.sipa.ingr.in/xiku/ilu/social/kalpu.js';
import { loadFromJson } from 'https://www.sipa.ingr.in/xiku/ilu/social/alpu.js';

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