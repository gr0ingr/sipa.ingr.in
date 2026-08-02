// api.sinu - Fetch and display social media links
const Sinu= document.querySelector('sinu').getAttribute('prem');
async function loadSocialLinks() {
  try {
    const response = await fetch('Sinu');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading social links:', error);
    return null;
  }
}

function renderSocialLinks(data) {
  const container = document.getElementById('social');
  if (!container) return;

  // Clear container
  container.innerHTML = '';

  // Define URL patterns for each platform
  const urlPatterns = {
    youtube: (username) => `https://youtube.com/@${username}`,
    instagram: (username) => `https://instagram.com/${username}`,
    facebook: (username) => `https://facebook.com/${username}`,
    twitter: (username) => `https://twitter.com/${username}`,
    linkedin: (username) => `https://linkedin.com/in/${username}`,
    github: (username) => `https://github.com/${username}`
  };

  // Platform display names
  const displayNames = {
    youtube: 'YouTube',
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    github: 'GitHub'
  };

  // Platform icons (using emojis or you can use FontAwesome)
  const icons = {
    youtube: '▶️',
    instagram: '📷',
    facebook: '👍',
    twitter: '🐦',
    linkedin: '💼',
    github: '🐙'
  };

  // Create and append links
  for (const [platform, username] of Object.entries(data)) {
    if (username && urlPatterns[platform]) {
      const link = document.createElement('a');
      link.href = urlPatterns[platform](username);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'social-link';
      link.innerHTML = `${icons[platform] || '🔗'} ${displayNames[platform] || platform}`;
      
      // Add platform class for styling
      link.classList.add(`platform-${platform}`);
      
      container.appendChild(link);
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadSocialLinks();
  if (data) {
    renderSocialLinks(data);
  }
});
