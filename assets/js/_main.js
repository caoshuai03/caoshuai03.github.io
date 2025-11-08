/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){
   // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // init sticky sidebar
  $(".sticky").Stickyfill();

  var stickySideBar = function(){
    var show = $(".author__urls-wrapper button").length === 0 ? $(window).width() > 925 : !$(".author__urls-wrapper button").is(":visible");
    if (show) {
      // fix
      Stickyfill.rebuild();
      Stickyfill.init();
      $(".author__urls").show();
    } else {
      // unfix
      Stickyfill.stop();
      $(".author__urls").hide();
    }
  };

  stickySideBar();

  $(window).resize(function(){
    stickySideBar();
  });

  // Follow menu drop down

  $(".author__urls-wrapper button").on("click", function() {
    $(".author__urls").fadeToggle("fast", function() {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Language switching functionality
  (function() {
    // Get current language from URL or localStorage
    function getCurrentLang() {
      var path = window.location.pathname;
      if (path.startsWith('/zh/') || path === '/zh') {
        return 'zh';
      }
      return localStorage.getItem('preferredLang') || 'en';
    }

    // Set language preference
    function setLangPreference(lang) {
      localStorage.setItem('preferredLang', lang);
    }

    // Switch language
    function switchLanguage() {
      var currentLang = getCurrentLang();
      var newLang = currentLang === 'en' ? 'zh' : 'en';
      
      if (newLang === 'zh') {
        window.location.href = '/zh/';
      } else {
        window.location.href = '/';
      }
      setLangPreference(newLang);
    }

    // Update language switch button text
    function updateLangButton() {
      var currentLang = getCurrentLang();
      var langButton = document.getElementById('lang-switch');
      if (langButton) {
        langButton.textContent = currentLang === 'en' ? '中文' : 'English';
      }
    }

    // Initialize language button on page load (inside document ready)
    updateLangButton();
    
    // Add click handler to language switch button
    $('#lang-switch').on('click', function(e) {
      e.preventDefault();
      switchLanguage();
    });
  })();

});
