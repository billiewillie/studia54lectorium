import Swiper, {Navigation, Pagination} from "swiper";

new Swiper('.gallery__list', {
  slidesPerView: 1,
  breakpoints: {
    768: {
      spaceBetween: 21,
      slidesPerView: 3,
    },
  }
});

const breakpoint = window.matchMedia('(min-width: 1310px)');
let mySwiper;

const breakpointChecker = function () {
  // if larger viewport and multi-row layout needed
  if (breakpoint.matches === true) {
    // clean up old instances and inline styles when available
    if (mySwiper !== undefined) mySwiper.destroy(true, true);
    // or/and do nothing
    return;
    // else if a small viewport and single column layout needed
  } else if (breakpoint.matches === false) {
    // fire small viewport version of swiper
    return enableSwiper();
  }
};

const enableSwiper = function () {
  mySwiper = new Swiper('.expectations__list', {
    slidesPerView: 1,
  });
};

// keep an eye on viewport size changes
breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();