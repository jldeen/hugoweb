// https://tomhazledine.com/dark-mode/

// Set Dark Mode
const setDarkMode = (active = false) => {
  const wrapper = document.querySelector(":root");
  const icon = document.getElementById("dark-mode-toggle");
  if (active) {
    wrapper.setAttribute("data-theme", "dark");
    // If icon class list has "ion-md-sunny", remove it so "ion-md-moon" can be added
    if (icon.classList.contains("ion-md-sunny")) {
      icon.classList.remove("ion-md-sunny");
    }
    icon.classList.add("ion-md-moon");
    localStorage.setItem("theme", "dark");
  } else {
    wrapper.setAttribute("data-theme", "light");
    icon.classList.add("ion-md-sunny");
    localStorage.setItem("theme", "light");
  }
};

// Query user preference and see if theme preference has been set
const query = window.matchMedia("(prefers-color-scheme: dark)");
const themePreference = localStorage.getItem("theme");

let active = query.matches;

if (themePreference === "dark") {
  active = true;
}

if (themePreference === "light") {
  active = false;
}

// Set theme based on user preference or override
setDarkMode(active);

// Watch for user preference changes
query.addEventListener("change", (e) => setDarkMode(e.matches));

// Toggle Dark Mode Logic
const toggleDarkMode = () => {
  const theme = document.querySelector(":root").getAttribute("data-theme");
  setDarkMode(theme === "light");
};

// Toggle Dark Mode Button with event listener
const toggleButton = document.querySelector(".js__dark-mode-toggle");
toggleButton.addEventListener("click", toggleDarkMode);
