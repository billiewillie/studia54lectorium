import Swiper, {Navigation, Pagination} from "swiper";
import {Fancybox} from "@fancyapps/ui";

const backdrop = document.querySelector('.backdrop');

new Swiper('.gallery__list', {
  modules: [ Navigation, Pagination ],
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".gallery__pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className}"></span>`;
    },
  },
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

breakpoint.addEventListener('change', breakpointChecker);
breakpointChecker();

const borderedObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('shown');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -200px'
  }
);

document
  .querySelectorAll('.bordered')
  .forEach(item => borderedObserver.observe(item));

const questions = Array.from(document.querySelectorAll('.accordion__trigger'));
questions.forEach(item => {
  item.addEventListener('click', () => {
    item.closest('.accordion__parent').classList.toggle('show');
  });
});

document.querySelector('.show__content-button').addEventListener('click', () => {
  document.querySelector('.show__content').classList.add('clicked');
  document.querySelector('.interview__list').classList.add('show');
});

const setBackdrop = () => {
  if (!backdrop.classList.contains('show')) {
    backdrop.classList.add('show');
  } else {
    backdrop.classList.add('hide');
    setTimeout(() => {
      backdrop.classList.remove("hide", "show");
    }, 300);
  }
};

document.querySelector('.more-button').addEventListener('click', function () {
  document.querySelector('.mobile-menu').classList.toggle('show');
  setBackdrop();
});

backdrop.addEventListener('click', function () {
  document.querySelector('.mobile-menu').classList.toggle('show');
  setBackdrop();
});

document.querySelectorAll('.more-button-list-item').forEach(item => {
  item.addEventListener('click', (e) => {
    document.querySelector('.mobile-menu').classList.toggle('show');
    setBackdrop();
  });
});

document.querySelector('.button').addEventListener('click', function () {
  document.querySelector('.mobile-menu').classList.remove('show');
  backdrop.classList.add('hide');
  setTimeout(() => {
    backdrop.classList.remove("hide", "show");
  }, 300);
});
