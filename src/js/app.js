import Swiper, {Navigation, Pagination} from "swiper";
import {Fancybox} from "@fancyapps/ui";
import IMask from 'imask';

const phoneMaskInput = document.querySelector('.js-phone-input');

const masksOptions = {
  phone: {
    mask: '+{7} (000) 000-00-00'
  }
};

new IMask(phoneMaskInput, masksOptions.phone);

const backdrop = document.querySelector('.backdrop');
const header = document.querySelector(".header");
const headerScroll = document.querySelector(".header-scroll");
const popupSuccess = document.querySelector('.popup.success');
const popupContent = popupSuccess.querySelector('.popup-content');
const popupClose = popupSuccess.querySelector('.close');
const form = document.querySelector('#wpcf7-f8-o1');

new Swiper('.gallery__list', {
  modules: [Navigation, Pagination],
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

const breakpoint = window.matchMedia('(min-width: 1024px)');
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
    modules: [Pagination],
    slidesPerView: 1,
    pagination: {
      el: ".expectations__pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
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

document.querySelectorAll('.more-button').forEach(item => {
  item.addEventListener('click', function () {
    item.closest('.mobile-menu').classList.toggle('show');
    setBackdrop();
  });
});

backdrop.addEventListener('click', function () {
  document.querySelectorAll('.mobile-menu').forEach(item => {
    item.classList.remove('show');
  });
  setBackdrop();
});

document.querySelectorAll('.more-button-list-item').forEach(item => {
  item.addEventListener('click', (e) => {
    document.querySelectorAll('.mobile-menu').forEach(item => {
      item.classList.remove('show');
    });
    setBackdrop();
  });
});

document.querySelector('.button').addEventListener('click', function () {
  document.querySelectorAll('.mobile-menu').forEach(item => {
    item.classList.remove('show');
  });
  backdrop.classList.add('hide');
  setTimeout(() => {
    backdrop.classList.remove("hide", "show");
  }, 300);
});

const headerObserver = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting || entry.intersectionRatio <= 0) {
      let scrollPos = 0;
      window.addEventListener('scroll', function () {
        console.log(header.getBoundingClientRect().top > -500);
        if ((document.body.getBoundingClientRect()).top > scrollPos) {
          headerScroll.classList.add('shown');
          backdrop.classList.remove("show");
          if (popupSuccess.classList.contains('show')) {
            popupContent.classList.add("hide");
            popupSuccess.classList.add("hide");

            setTimeout(() => {
              popupContent.classList.remove("hide", "show");
              popupSuccess.classList.remove("hide", "show");
            }, 300);
          }
        } else {
          headerScroll.classList.remove('shown');
          document.querySelectorAll('.mobile-menu').forEach(item => {
            item.classList.remove('show');
          });
          backdrop.classList.remove("show");
          if (popupSuccess.classList.contains('show')) {
            popupContent.classList.add("hide");
            popupSuccess.classList.add("hide");

            setTimeout(() => {
              popupContent.classList.remove("hide", "show");
              popupSuccess.classList.remove("hide", "show");
            }, 300);
          }
        }
        scrollPos = (document.body.getBoundingClientRect()).top;
      });
    } else {
      window.addEventListener('scroll', function () {
        headerScroll.classList.remove('shown');

        document.querySelectorAll('.mobile-menu').forEach(item => {
          item.classList.remove('show');
        });
        backdrop.classList.remove("show");
      });
    }
  }
);

//
// window.addEventListener('scroll', function () {
//   if(header.getBoundingClientRect().top > -300){
//     console.log(header.getBoundingClientRect().top);
//     headerScroll.classList.remove('shown');
//   }
// });

headerObserver.observe(header);

// form.addEventListener('wpcf7mailsent', () => {
//   popupContent.classList.add("show");
//   popupSuccess.classList.add("show");
//   setBackdrop();
// });

popupClose.addEventListener('click', () => {
  popupContent.classList.add("hide");
  popupSuccess.classList.add("hide");
  setBackdrop();

  setTimeout(() => {
    popupContent.classList.remove("hide", "show");
    popupSuccess.classList.remove("hide", "show");
  }, 300);
});
