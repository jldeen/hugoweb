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

  document.documentElement.setAttribute('color-mode', 'dark');

  (function(){
    // Then set the 'color-mode' attribute to whatever is in localstorage
    document.documentElement.setAttribute('color-mode', localStorage.getItem('theme'));
    console.log("Theme is set to:", localStorage.getItem('theme'));

    document.getElementById("checkbox").checked = JSON.parse(localStorage.getItem("checkbox"));
    console.log("Checkbox is set to:", localStorage.getItem("checkbox"));
  })();

  const checkbox = document.getElementById('checkbox');

  checkbox.addEventListener('change', () => {
    // This function will execute itself when the script is loaded
    var targetTheme = document.documentElement.getAttribute('color-mode') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('color-mode', targetTheme);

    localStorage.setItem('theme', targetTheme)
    console.log('theme changed to: ' + localStorage.getItem('theme'))

    if (checkbox.checked == true) {
      localStorage.setItem("checkbox", JSON.stringify(true))
      console.log(localStorage.getItem("checkbox"))
    } else {
      localStorage.setItem("checkbox", JSON.stringify(false))
      console.log(localStorage.getItem("checkbox"))
    }
  })

  //determines if the user has a set theme
  function detectColorScheme(){
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

    //dark theme preferred, set document with a `color-mode` attribute
    if (theme=="dark") {
        document.documentElement.setAttribute("color-mode", "dark");
    }
  }
  detectColorScheme();

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