const setDarkMode = (active = false) => {
  const wrapper = document.querySelector(":root");
  if (active) {
    wrapper.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    wrapper.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
};

const query = window.matchMedia("(prefers-color-scheme: dark)");
const themePreference = localStorage.getItem("theme");

let active = query.matches;

if (themePreference === "dark") {
  active = true;
}

if (themePreference === "light") {
  active = false;
}

setDarkMode(active);
query.addEventListener("change", (e) => setDarkMode(e.matches));

const toggleDarkMode = () => {
  const theme = document.querySelector(":root").getAttribute("data-theme");
  setDarkMode(theme === "light");
};

const toggleButton = document.querySelector(".js__dark-mode-toggle");
toggleButton.addEventListener("click", toggleDarkMode);
