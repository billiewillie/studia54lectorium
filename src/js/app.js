import Swiper, { Navigation, Pagination } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fancybox } from "@fancyapps/ui";
import IMask from "imask";
gsap.registerPlugin(ScrollTrigger);

const phoneMaskInput = document.querySelector(".js-phone-input");

const masksOptions = {
	phone: {
		mask: "+{7} (000) 000-00-00",
	},
};

new IMask(phoneMaskInput, masksOptions.phone);

const backdrop = document.querySelector(".backdrop");
const header = document.querySelector(".header");
const headerScroll = document.querySelector(".header-scroll");
const popupSuccess = document.querySelector(".popup.success");
const popupContent = popupSuccess.querySelector(".popup-content");
const popupClose = popupSuccess.querySelector(".close");
const form = document.querySelector("#wpcf7-f8-o1");
const ring = document.querySelector(".ring");
const ring2 = document.querySelector(".ring2");
const ringInner = ring.querySelector(".ring__inner");
const ringInner2 = ring2.querySelector(".ring2__inner");
const speakerRing = document.querySelector(".speaker-ring");
const qaRing = document.querySelector(".qa-ring");

let tl1 = gsap.timeline({
	scrollTrigger: {
		trigger: ".shedule",
		start: "top 80%",
		end: "bottom top",
		scrub: 4,
		toggleActions: "restart complete complete reverse",
	},
});

tl1.fromTo(".shedule .circle", { y: 0 }, { y: 250, ease: "Circ.easeOut", duration: 1500 });

let tl2 = gsap.timeline({
	scrollTrigger: {
		trigger: ".overflow",
		start: "top 80%",
		end: "bottom top",
		scrub: 4,
		toggleActions: "restart complete complete reverse",
	},
});

tl2.fromTo(".overflow .circle", { y: 0 }, { y: 700, ease: "Circ.easeOut", duration: 1500 });

new Swiper(".gallery__list", {
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
	},
});

const breakpoint = window.matchMedia("(min-width: 1024px)");
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
	mySwiper = new Swiper(".expectations__list", {
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

breakpoint.addEventListener("change", breakpointChecker);
breakpointChecker();

const borderedObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("shown");
				observer.unobserve(entry.target);
			}
		});
	},
	{
		rootMargin: "0px 0px -200px",
	}
);

document.querySelectorAll(".bordered").forEach((item) => borderedObserver.observe(item));

const questions = Array.from(document.querySelectorAll(".accordion__trigger"));
questions.forEach((item) => {
	item.addEventListener("click", () => {
		item.closest(".accordion__parent").classList.toggle("show");
	});
});

document.querySelector(".show__content-button").addEventListener("click", () => {
	document.querySelector(".show__content").classList.add("clicked");
	document.querySelector(".interview__list").classList.add("show");
});

const setBackdrop = () => {
	if (!backdrop.classList.contains("show")) {
		backdrop.classList.add("show");
	} else {
		backdrop.classList.add("hide");
		setTimeout(() => {
			backdrop.classList.remove("hide", "show");
		}, 300);
	}
};

document.querySelectorAll(".more-button").forEach((item) => {
	item.addEventListener("click", function () {
		item.closest(".mobile-menu").classList.toggle("show");
		setBackdrop();
	});
});

backdrop.addEventListener("click", function () {
	document.querySelectorAll(".mobile-menu").forEach((item) => {
		item.classList.remove("show");
	});
	setBackdrop();
});

document.querySelectorAll(".more-button-list-item").forEach((item) => {
	item.addEventListener("click", (e) => {
		document.querySelectorAll(".mobile-menu").forEach((item) => {
			item.classList.remove("show");
		});
		setBackdrop();
	});
});

document.querySelector(".button").addEventListener("click", function () {
	document.querySelectorAll(".mobile-menu").forEach((item) => {
		item.classList.remove("show");
	});
	backdrop.classList.add("hide");
	setTimeout(() => {
		backdrop.classList.remove("hide", "show");
	}, 300);
});

// form.addEventListener("wpcf7mailsent", () => {
// 	popupContent.classList.add("show");
// 	popupSuccess.classList.add("show");
// 	setBackdrop();
// });

popupClose.addEventListener("click", () => {
	popupContent.classList.add("hide");
	popupSuccess.classList.add("hide");
	setBackdrop();

	setTimeout(() => {
		popupContent.classList.remove("hide", "show");
		popupSuccess.classList.remove("hide", "show");
	}, 300);
});

const firstCircle = document.querySelector(".first__circle");
const firstCircleCoordTop = `${document.querySelector(".first__circle").getBoundingClientRect().top}px`;
const quoteTop = `${document.querySelector(".quote").getBoundingClientRect().top - 140}px`;
const detailsTop = `${document.querySelector(".details").getBoundingClientRect().top - 150}px`;
const detailsBottom = `${document.querySelector(".details").getBoundingClientRect().bottom - 400}px`;
const expectationsTop = `${document.querySelector(".expectations").getBoundingClientRect().top + 100}px`;
const groupTop = `${document.querySelector(".group").getBoundingClientRect().top - 120}px`;
const galleryTop = `${document.querySelector(".gallery").getBoundingClientRect().top - 400}px`;

ring.style.top = firstCircleCoordTop;
ringInner.style.height = `${firstCircle.getBoundingClientRect().height}px`;
ringInner.style.width = `${firstCircle.getBoundingClientRect().width}px`;

gsap.to(".ring", {
	scrollTrigger: {
		trigger: ".first-screen",
		start: "100% 100%",
		onEnter: () => {
			ring.style.top = firstCircleCoordTop;
			ringInner.style.height = `${firstCircle.getBoundingClientRect().height}px`;
			ringInner.style.width = `${firstCircle.getBoundingClientRect().width}px`;
			document.querySelector(".ring").classList.add("show");
		},
	},
});
gsap.to(".ring2", {
	scrollTrigger: {
		trigger: ".quote",
		start: "40$ 100%",
		onEnter: () => {
			ring2.style.top = quoteTop;
			ringInner2.style.height = `216px`;
			ringInner2.style.width = `216px`;
			document.querySelector(".ring2").classList.add("quote");
			document.querySelector(".ring").classList.remove("show");
		},
		onLeaveBack: () => {
			ring2.style.top = firstCircleCoordTop;
			ringInner2.style.height = `0px`;
			ringInner2.style.width = `0px`;
			document.querySelector(".ring2").classList.remove("quote");
			document.querySelector(".ring").classList.add("show");
			ring.style.top = firstCircleCoordTop;
			ringInner.style.height = `${firstCircle.getBoundingClientRect().height}px`;
			ringInner.style.width = `${firstCircle.getBoundingClientRect().width}px`;
		},
	},
});
gsap.to(".ring2", {
	scrollTrigger: {
		trigger: ".details",
		start: "30% 100%",
		onEnter: () => {
			ring2.style.top = detailsTop;
			ringInner2.style.height = `163px`;
			ringInner2.style.width = `163px`;
			document.querySelector(".ring2").classList.add("details");
		},
		onLeaveBack: () => {
			ring2.style.top = quoteTop;
			ringInner2.style.height = `216px`;
			ringInner2.style.width = `216px`;
			document.querySelector(".ring2").classList.remove("details");
		},
	},
});
gsap.to(".ring2", {
	scrollTrigger: {
		trigger: ".details",
		start: "60% 100%",
		onEnter: () => {
			ring2.style.top = detailsBottom;
			ringInner2.style.height = `213px`;
			ringInner2.style.width = `213px`;
			document.querySelector(".ring2").classList.add("detailsBottom");
		},
		onLeaveBack: () => {
			ring2.style.top = detailsTop;
			ringInner2.style.height = `163px`;
			ringInner2.style.width = `163px`;
			document.querySelector(".ring2").classList.remove("detailsBottom");
		},
	},
});
gsap.to(".ring2", {
	scrollTrigger: {
		trigger: ".expectations",
		start: "100% 100%",
		onEnter: () => {
			ring2.style.top = expectationsTop;
			ringInner2.style.height = `187px`;
			ringInner2.style.width = `187px`;
			document.querySelector(".ring2").classList.add("expectations");
		},
		onLeaveBack: () => {
			ring2.style.top = detailsBottom;
			ringInner2.style.height = `213px`;
			ringInner2.style.width = `213px`;
			document.querySelector(".ring2").classList.remove("expectations");
		},
	},
});
gsap.to(".ring2", {
	scrollTrigger: {
		trigger: ".group",
		start: "100% 100%",
		onEnter: () => {
			ring2.style.top = groupTop;
			document.querySelector(".ring2").classList.add("group");
			ringInner2.style.height = `233px`;
			ringInner2.style.width = `233px`;
		},
		onLeaveBack: () => {
			ring2.style.top = expectationsTop;
			ringInner2.style.height = `233px`;
			ringInner2.style.width = `233px`;
			document.querySelector(".ring2").classList.remove("group");
		},
	},
});
gsap.to(".speaker-ring", {
	scrollTrigger: {
		trigger: ".speaker__photo",
		start: "100% 80%",
		onEnter: () => {
			speakerRing.style.top = "500px";
			ringInner.style.height = `233px`;
			ringInner.style.width = `233px`;
			speakerRing.classList.add("speaker2");
		},
		onLeaveBack: () => {
			speakerRing.style.top = "0";
			ringInner.style.height = `100%`;
			ringInner.style.width = `100%`;
			speakerRing.classList.remove("speaker2");
		},
	},
});
gsap.to(".speaker-ring", {
	scrollTrigger: {
		trigger: ".speaker__photo",
		start: "100% +50%",
		onEnter: () => {
			speakerRing.style.top = "900px";
			speakerRing.classList.add("speaker3");
		},
		onLeaveBack: () => {
			speakerRing.style.top = "500px";
			speakerRing.classList.remove("speaker3");
		},
	},
});
gsap.to(".speaker-ring", {
	scrollTrigger: {
		trigger: ".interview",
		start: "0% +100%",
		onEnter: () => {
			speakerRing.style.top = "1450px";
			speakerRing.classList.add("interview");
		},
		onLeaveBack: () => {
			speakerRing.style.top = "900px";
			speakerRing.classList.remove("interview");
		},
	},
});
gsap.to(".speaker-ring", {
	scrollTrigger: {
		trigger: ".interview",
		start: "100% +140%",
		onEnter: () => {
			speakerRing.style.top = "1900px";
			speakerRing.classList.add("interview2");
		},
		onLeaveBack: () => {
			speakerRing.style.top = "1450px";
			speakerRing.classList.remove("interview2");
		},
	},
});
gsap.to(".qa-ring", {
	scrollTrigger: {
		trigger: ".qa",
		start: "0% +120%",
		onEnter: () => {
			qaRing.style.top = "0";
			qaRing.classList.add("show");
		},
		onLeaveBack: () => {
			qaRing.style.top = "0";
			qaRing.classList.remove("show");
		},
	},
});
gsap.to(".qa-ring", {
	scrollTrigger: {
		trigger: ".qa",
		start: "100% +150%",
		onEnter: () => {
			qaRing.style.top = "400px";
			qaRing.classList.add("qa2");
		},
		onLeaveBack: () => {
			qaRing.style.top = "0";
			qaRing.classList.remove("qa2");
		},
	},
});
