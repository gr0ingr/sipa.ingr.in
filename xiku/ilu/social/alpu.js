// jsonLoader.js - Load JSON files
export async function loadFromJson(file) {
  try {
    const resp = await fetch(file);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.warn('JSON load error:', e);
    return null;
  }
}