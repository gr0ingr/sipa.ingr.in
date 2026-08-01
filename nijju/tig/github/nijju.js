// api.js - Fetches GitHub user data

async function api(username) {
  username = encodeURIComponent(username.trim());

  if (!username) {
    console.error("No username provided");
    return;
  }

  const loading = document.getElementById("loading");
  const errorMessage = document.getElementById("errorMessage");
  const errorText = document.getElementById("errorText");
  const profileContainer = document.getElementById("profileContainer");
  // Show loading
  if (loading) loading.classList.add("active");
  if (errorMessage) errorMessage.classList.remove("show");
  if (profileContainer) profileContainer.classList.remove("active");

  try {
    // Fetch user data and repos in parallel
    const [userResponse, repoResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),

      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=9`,
      ),
    ]);

    // Handle user response errors
    if (!userResponse.ok) {
      switch (userResponse.status) {
        case 404:
          throw new Error("GitHub user not found.");
        case 403:
          throw new Error(
            "GitHub API rate limit exceeded. Please try again later.",
          );
        default:
          throw new Error(
            `Failed to fetch GitHub profile (${userResponse.status})`,
          );
      }
    }

    // Handle repo response errors
    if (!repoResponse.ok) {
      throw new Error("Unable to fetch repositories.");
    }

    const user = await userResponse.json();
    const repos = await repoResponse.json();

    // Calculate total stars
    const totalStars = repos.reduce(
      (sum, repo) => sum + (repo.stargazers_count || 0),
      0,
    );

    // Update the profile UI
    updateProfileUI(user, repos, totalStars);

    // Auto-navigate to profile card (card 2)
    if (typeof goToCard === "function") {
      goToCard(2);
    }
  } catch (err) {
    console.error("API Error:", err);
    if (errorText) errorText.textContent = err.message;
    if (errorMessage) errorMessage.classList.add("show");
  } finally {
    if (loading) loading.classList.remove("active");
  }
}

// Separate function to update UI
function updateProfileUI(user, repos, totalStars) {
  // Get all elements
  const userAvatar = document.getElementById("userAvatar");
  const userName = document.getElementById("userName");
  const userLogin = document.getElementById("userLogin");
  const userBio = document.getElementById("userBio");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");
  const publicRepos = document.getElementById("publicRepos");
  const totalStarsEl = document.getElementById("totalStars");
  const reposContainer = document.getElementById("reposContainer");
  const profileContainer = document.getElementById("profileContainer");

  // Update user info
  if (userAvatar) {
    userAvatar.src = user.avatar_url || "https://github.com/github.png";
    userAvatar.alt = user.name || user.login;
  }

  if (userName) userName.textContent = user.name || user.login;

  if (userLogin) {
    userLogin.textContent = `@${user.login}`;
    userLogin.href = user.html_url;
  }

  if (userBio) userBio.textContent = user.bio || "No bio available";

  // Update stats
  if (followers)
    followers.textContent = user.followers?.toLocaleString() || "0";
  if (following)
    following.textContent = user.following?.toLocaleString() || "0";
  if (publicRepos) publicRepos.textContent = user.public_repos || "0";
  if (totalStarsEl) totalStarsEl.textContent = totalStars.toLocaleString();

  // Update repositories
  if (reposContainer) {
    if (Array.isArray(repos) && repos.length > 0) {
      reposContainer.innerHTML = repos
        .map(
          (repo) => `
        <a href="${repo.html_url}" target="_blank" class="repo-card">
          <div class="repo-name"><i class="fas fa-book"></i> ${repo.name}</div>
          <div class="repo-description">${repo.description ? repo.description.substring(0, 55) + (repo.description.length > 55 ? "…" : "") : "No description"}</div>
          <div class="repo-stats">
            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            <span><i class="fas fa-circle" style="color: ${repo.language ? "#667eea" : "#ccc"}; font-size: 0.6rem;"></i> ${repo.language || "N/A"}</span>
          </div>
        </a>
      `,
        )
        .join("");
    } else {
      reposContainer.innerHTML =
        '<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:16px;">No repositories found</p>';
    }
  }

  // Show profile container
  if (profileContainer) profileContainer.classList.add("active");
}
