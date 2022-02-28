document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  var html = document.querySelector('html'),
    menuOpenIcon = document.querySelector(".icon__menu"),
    menuCloseIcon = document.querySelector(".nav__icon-close"),
    menuList = document.querySelector(".main-nav"),
    searchOpenIcon = document.querySelector(".icon__search"),
    searchCloseIcon = document.querySelector(".search__close"),
    searchInput = document.querySelector(".search__text"),
    search = document.querySelector(".search"),
    searchBox = document.querySelector(".search__box"),
    toggleTheme = document.querySelector(".toggle-theme"),
    btnScrollToTop = document.querySelector(".top");


  /* =======================================================
  // Menu + Search + Theme Switcher
  ======================================================= */
  menuOpenIcon.addEventListener("click", () => {
    menuOpen();
  });

  menuCloseIcon.addEventListener("click", () => {
    menuClose();
  });

  function menuOpen() {
    menuList.classList.add("is-open");
  }
  
  function menuClose() {
    menuList.classList.remove("is-open");
  }

  searchOpenIcon.addEventListener("click", () => {
    searchOpen();
  });

  searchCloseIcon.addEventListener("click", () => {
    searchClose();
  });

  function searchOpen() {
    search.classList.add("is-visible");
    setTimeout(function () {
      searchInput.focus();
    }, 250);
  }

  function searchClose() {
    search.classList.remove("is-visible");
  }

  searchBox.addEventListener("keydown", function(event) {
    if (event.target == this || event.keyCode == 27) {
      search.classList.remove('is-visible');
    }
  });

  (function(){
    // Then set the 'data-theme' attribute to whatever is in localstorage
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));    
  })();

  const checkbox = document.getElementById('checkbox');

  checkbox.addEventListener('change', () => {
    // This function will execute itself when the script is loaded
    var targetTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', targetTheme);

    localStorage.setItem('theme', targetTheme)
    console.log('theme changed to: ' + localStorage.getItem('theme'))
  })

  //determines if the user has a set theme
  function detectColorScheme(){
    var theme="light";    //default to light

    //local storage is used to override OS theme settings
    if(localStorage.getItem("theme")){
        if(localStorage.getItem("theme") == "dark"){
            var theme = "dark";
        }
    } else if(!window.matchMedia) {
        //matchMedia method not supported
        return false;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        var theme = "dark";
    }

    //dark theme preferred, set document with a `data-theme` attribute
    if (theme=="dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
  }
  detectColorScheme();

  //identify the toggle switch HTML element
  const toggleSwitch = document.querySelector('#label input[type="checkbox"]');

  //function that changes the theme, and sets a localStorage variable to track the theme between page loads
  function switchTheme(e) {
      if (e.target.checked) {
          localStorage.setItem('theme', 'dark');
          document.documentElement.setAttribute('data-theme', 'dark');
          toggleSwitch.checked = true;
      } else {
          localStorage.setItem('theme', 'light');
          document.documentElement.setAttribute('data-theme', 'light');
          toggleSwitch.checked = false;
      }    
  }

  //listener for changing themes
  // toggleSwitch.addEventListener('change', switchTheme, false);

  //pre-check the dark-theme checkbox if dark-theme is set
  // if (document.documentElement.getAttribute("data-theme") == "dark"){
  //     toggleSwitch.checked = true;
  // }

  // // listen to OS preference
  // const colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)');

  // // change color scheme based on OS preference
  // const setColorScheme = e => {
    
  //   console.log(e.matches)
  //   if (e.matches) {
  //     html.dataset.theme = `dark`;
  //     console.log('Dark mode')
  //   } else if (e.matches != true) {
  //     html.dataset.theme = `light`;
  //     console.log('Light mode')
  //   }
  // };
  
  // // set color scheme based on query
  // setColorScheme(colorSchemeQueryList);

  // // listen for preference changes
  // colorSchemeQueryList.addEventListener('change', setColorScheme);

  // const checkbox = document.getElementById("checkbox");

  // checkbox.addEventListener('change', setColorScheme);

  // checkbox.addEventListener("changed", () => {
  //   // change the theme of the website
  //   theme_switch()
  // });


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page__content img, .post__content img, .gallery__image img"),
  imageLink = document.querySelectorAll(".page__content a img, .post__content a img, .gallery__image a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense), .gallery__image img:not(.no-lightense)", {
    padding: 60,
    offset: 30
    });
  }


  /* =================================
  // Smooth scroll to the tags page
  ================================= */
  document.querySelectorAll(".tag__link, .top__link").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });


  /* =======================
  // Scroll Top Button
  ======================= */
  btnScrollToTop.addEventListener("click", function () {
    if (window.scrollY != 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }
  });

});