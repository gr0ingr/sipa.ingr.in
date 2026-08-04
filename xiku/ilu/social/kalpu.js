// txtLoader.js - Load and parse TXT files
export async function loadFromTxt(file) {
  try {
    const resp = await fetch(file);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = await resp.text();
    const data = {};
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const parts = trimmed.split(':').map(s => s.trim());
      if (parts.length >= 2) {
        const platform = parts[0];
        const username = parts.slice(1).join(':');
        if (platform && username) {
          data[platform] = username;
        }
      }
    }
    return data;
  } catch (e) {
    console.warn('TXT load error:', e);
    return null;
  }
}