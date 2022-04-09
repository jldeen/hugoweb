if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  console.log('🎉 Dark mode is supported');
}

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener("change", (e) => {
  const darkModeOn = e.matches;
  console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
});
