/***************************************************
==================== JS INDEX ======================
****************************************************
01. stiky js
02. back-to-top
03. Parallaxie
04. mobile menu 
05. Nice Select Js Start
06. Mouse Cursor Animation
07. popup image
08. popup video
09. preloader
10. Aos Animation



****************************************************/

(function($){
    "use strict";


    /* ================================
        01. stiky js
    ================================ */
	var windowOn = $(window);
    windowOn.on('scroll', function () {
      var scroll = windowOn.scrollTop();
      if (scroll < 100) {
        $("#vl-header-sticky").removeClass("header-sticky");
      } else {
        $("#vl-header-sticky").addClass("header-sticky");
      }
    });

    /* ================================
        02. back-to-top
    ================================ */
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });

    /* ================================
       03. Parallaxie
    ================================ */

    var $window = $(window);
    var $parallaxie = $('.parallaxie');

    if ($parallaxie.length && ($window.width() > 991)) {
        if ($window.width() > 768) {
            $parallaxie.parallaxie({
                speed: 0.55,
                offset: 0,
            });
        }
    }

  /* ================================
        04. mobile menu 
    ================================ */
	var vlMenuWrap = $('.vl-mobile-menu-active > ul').clone();
	var vlSideMenu = $('.vl-offcanvas-menu nav');
	vlSideMenu.append(vlMenuWrap);
	if ($(vlSideMenu).find('.sub-menu, .vl-mega-menu').length != 0) {
		$(vlSideMenu).find('.sub-menu, .vl-mega-menu').parent().append('<button class="vl-menu-close"><i class="fas fa-chevron-right"></i></button>');
	}
	var sideMenuList = $('.vl-offcanvas-menu nav > ul > li button.vl-menu-close, .vl-offcanvas-menu nav > ul li.has-dropdown > a');
	$(sideMenuList).on('click', function (e) {
		console.log(e);
		e.preventDefault();
		if (!($(this).parent().hasClass('active'))) {
		$(this).parent().addClass('active');
		$(this).siblings('.sub-menu, .vl-mega-menu').slideDown();
		} else {
		$(this).siblings('.sub-menu, .vl-mega-menu').slideUp();
		$(this).parent().removeClass('active');
		}
	});
	$(".vl-offcanvas-toggle").on('click',function(){
        $(".vl-offcanvas").addClass("vl-offcanvas-open");
        $(".vl-offcanvas-overlay").addClass("vl-offcanvas-overlay-open");
    });
	$(".vl-offcanvas-close-toggle,.vl-offcanvas-overlay").on('click', function(){
        $(".vl-offcanvas").removeClass("vl-offcanvas-open");
        $(".vl-offcanvas-overlay").removeClass("vl-offcanvas-overlay-open");
    });

    /* ================================
       05. Nice Select Js Start
    ================================ */
	if ($('.single-select').length) {
        $('.single-select').niceSelect();
    }

    /* ================================
       06. Mouse Cursor Animation
    ================================ */
	if ($(".mouseCursor").length > 0) {
        function itCursor() {
            var myCursor = jQuery(".mouseCursor");
            if (myCursor.length) {
                if ($("body")) {
                    const e = document.querySelector(".cursor-inner"),
                        t = document.querySelector(".cursor-outer");
                    let n, i = 0, o = !1;
                    window.onmousemove = function(s) {
                        if (!o) {
                            t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        }
                        e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                        n = s.clientY;
                        i = s.clientX;
                    };
                    $("body").on("mouseenter", "button, a, .cursor-pointer", function() {
                        e.classList.add("cursor-hover");
                        t.classList.add("cursor-hover");
                    });
                    $("body").on("mouseleave", "button, a, .cursor-pointer", function() {
                        if (!($(this).is("a", "button") && $(this).closest(".cursor-pointer").length)) {
                            e.classList.remove("cursor-hover");
                            t.classList.remove("cursor-hover");
                        }
                    });
                    e.style.visibility = "visible";
                    t.style.visibility = "visible";
                }
            }
        }
        itCursor();
    }

    /* ================================
		07. popup image
	================================ */
    $('.popup-image').magnificPopup({
        type: 'image'
    });
	/* ================================
		08. popup video
	================================ */
	$('.popup-video').magnificPopup({
	type: 'iframe'
	});

    /* ================================
		09. preloader
	================================ */
    $(window).on("load", function (event) {
      setTimeout(function () {
        $(".preloader").fadeToggle();
      }, 200);
    
    });

    

    /* ================================
        10. Aos Animation
    ================================ */
    AOS.init({
      duration:1000,
      once: true,
    });


    // odometer

// counter 1
setTimeout(() => {
  let el = document.getElementById("count");

  if (el) {
    el.innerHTML = 20;
  }
}, 500);

// counter 2
setTimeout(() => {
  const el = document.getElementById("count2");

  if (el) {
    el.innerHTML = 98;
  }
}, 500);


  /* ================================
      11. Testimonial Active (Home 1)
  ================================ */

  if ($('.vltestimonialactive1').length) {
      const vltestimonialactive1 = new Swiper('.vltestimonialactive1', {
          slidesPerView: 4,
          spaceBetween: 30,
          loop: true,
          speed: 3000,
          keyboard: {
              enabled: true,
          },
          autoplay: {
              delay: 2500,
              disableOnInteraction: false,
          },
          breakpoints: {
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
          },
      });
  }

  /* ================================
      12. Testimonial Active (Home 2)
  ================================ */

  if ($('.vltestimonialactive2').length) {
      const vltestimonialactive2 = new Swiper('.vltestimonialactive2', {
          slidesPerView: 1,
          spaceBetween: 30,
          keyboard: {
              enabled: true,
          },
          loop:true,
          speed: 3000,
          keyboard: {
              enabled: true,
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".vl-testimonial-navigation-next",
            prevEl: ".vl-testimonial-navigation-prev",
          },
          breakpoints: {
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              992: {
                slidesPerView: 1,
              },
              1200: {
                slidesPerView: 1,
              }
            },
      });
  }

    // brand slider 
    var swiper = new Swiper(".tp-brand-top-active5", {
        slidesPerView: 'auto',
        spaceBetween: 80,
        freemode: true,
        centeredSlides: true,
        loop: true,
        speed: 4000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
          },
    });

  // brand slider 
    var swiper = new Swiper(".tp-brand-top-active", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        freemode: true,
        centeredSlides: true,
        loop: true,
        speed: 4000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
          },
    });


    // brand slider  
    var swiper = new Swiper(".tp-brand-bottom-active", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        freemode: true,
        centeredSlides: true,
        loop: true,
        speed: 4000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
    });



    // testimonial

    var swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 10,
      direction: "vertical",
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      pagination: {
        el: ".swiper-pagination",
      },
    });
    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      loop: true,
      speed: 4000,
      allowTouchMove: true,
      autoplay: {
          delay: 1,
          disableOnInteraction: true,
      },
      thumbs: {
        swiper: swiper,
      },
    });


    // testimonial 10
    var swiper = new Swiper(".tp-brand-top-active10", {
        slidesPerView: 3,
        spaceBetween: 30,
        freemode: true,
        centeredSlides: true,
        loop: true,
        speed: 5000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
          },
          breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          }
      },
    });

    var swiper = new Swiper(".tp-brand-bottom-active10", {
        slidesPerView: 3,
        spaceBetween: 30,
        freemode: true,
        centeredSlides: true,
        loop: true,
        speed: 4000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          }
      },
    });



    // testimonial 8 

    var swiper = new Swiper(".mySwiper8", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      direction: "vertical",
      centeredSlides:true,
    });
    var swiper2 = new Swiper(".mySwiper28", {
      loop: true,
      spaceBetween: 10,
      centeredSlides:true,
      pagination: {
        el: ".swiper-pagination",
      },
      speed: 3000,
      keyboard: {
          enabled: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      thumbs: {
        swiper: swiper,
      },
    });

    // team slider 

        var swiper = new Swiper(".tp-brand-top-active-team", {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freemode: true,
        centeredSlides: true,
        loop: true,
        speed: 4000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: true,
          },
    });

    // testimonial 5
    var swiper = new Swiper(".testimonial5", {
      slidesPerView: 1,
          spaceBetween: 30,
          keyboard: {
              enabled: true,
          },
          loop:true,
          speed: 3000,
          keyboard: {
              enabled: true,
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },

       navigation: {
          nextEl: ".vl-testimonial-navigation-next5",
          prevEl: ".vl-testimonial-navigation-prev5",
        },
    });

    // testimonial 9
    var swiper = new Swiper(".testimonial9", {
      slidesPerView: 1,
          spaceBetween: 30,
          keyboard: {
              enabled: true,
          },
          loop:true,
          speed: 3000,
          keyboard: {
              enabled: true,
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },

       navigation: {
          nextEl: ".vl-testimonial-navigation-next5",
          prevEl: ".vl-testimonial-navigation-prev5",
        },
    });



    // tab js

    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });


    // pricing js

    const billingBtns = document.querySelectorAll(".billing-btn");
    const prices = document.querySelectorAll(".price");
    const durations = document.querySelectorAll(".duration");

    billingBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        billingBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const type = btn.dataset.billing;

        prices.forEach((price, i) => {
          price.innerText =
            type === "yearly"
              ? `$${price.dataset.year}`
              : `$${price.dataset.month}`;

          durations[i].innerText =
            type === "yearly" ? "/ Year" : "/ Month";
        });
      });
    });
    

})(jQuery);












