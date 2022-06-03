"use strict";

function slider(
	carouselContainer,
	options = {
		sizes: { s: 1, m: 2, l: 3 },
	},
) {
	const dots = carouselContainer.querySelector(".dots");
	const cards = carouselContainer.querySelectorAll(".card");
	const nextSlideButton =
		carouselContainer.querySelector("button.next-slide");
	const prevSlideButton =
		carouselContainer.querySelector("button.prev-slide");

	let slidesCount = 0;
	let slideWidth = 0;
	let slideStep = 1;
	let currentSlide = 0;

	const nextSlide = () => {
		currentSlide++;
		if (currentSlide * slideStep > cards.length) {
			currentSlide = 0;
		}
		moveSlide();
	};

	const prevSlide = () => {
		currentSlide--;
		if (currentSlide < 0) {
			currentSlide = Math.round(cards.length / slideStep);
		}
		moveSlide();
	};

	const moveSlide = () => {
		let selector = `.dot:nth-child(${currentSlide})`;
		const activeDot = document.querySelector(selector);
		moveElementIntoView(currentSlide);
		setActiveDot(currentSlide);
	};

	const setSlideWidth = () => {
		slideWidth = carouselContainer.getBoundingClientRect().width;
	};

	const setSlidesCount = () => {
		const cardCount = cards.length;
		slidesCount = cardCount;
		slideStep = options.sizes["s"];
		if (slideWidth > 600 && slideWidth <= 1000) {
			slideStep = slideStep = options.sizes["m"];
			slidesCount = Math.round(cardCount / slideStep);
		} else if (slideWidth > 1000) {
			slideStep = slideStep = options.sizes["l"];
			slidesCount = Math.round(cardCount / slideStep) + 1;
		}
	};

	const createDots = () => {
		removeDots();
		let dot = document.createElement("button");
		dot.classList.add("dot");
		for (let i = 1; i <= slidesCount; i++) {
			dots.appendChild(dot.cloneNode(true));
		}
		setActiveDot(currentSlide);
	};

	const removeDots = () => {
		dots.innerHTML = "";
	};

	window.addEventListener("resize", () => {
		setSlideWidth();
		setSlidesCount();
		createDots();
	});

	const setActiveDot = (index) => {
		let dots = document.querySelectorAll(".dot");
		dots.forEach((dot) => {
			dot.classList.remove("active");
		});
		currentSlide = index;
		dots[index].classList.add("active");
	};

	const moveElementIntoView = (index) => {
		let selector = "";
		if (index === 0) {
			selector = ".card:first-child";
		} else if (index * slideStep > cards.length) {
			selector = ".card:last-child";
		} else {
			selector = `.card:nth-child(${index * slideStep + 1})`;
		}

		const box = document.querySelector(selector);
		box.scrollIntoView({
			behavior: "smooth",
			inline: "start",
		});
	};

	setSlideWidth();
	setSlidesCount();
	createDots();

	dots.addEventListener("click", (e) => {
		const target = e.target;
		if (!target.matches(".dot")) {
			return;
		}

		const index = Array.from(dots.children).indexOf(target);
		moveElementIntoView(index);
		setActiveDot(index);
	});

	nextSlideButton.addEventListener("click", () => {
		nextSlide();
	});
	prevSlideButton.addEventListener("click", () => {
		prevSlide();
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const carouselContainer = document.querySelector(".carousel-cards");

	const options = {
		sizes: {
			s: 1,
			m: 2,
			l: 3,
		},
	};

	slider(carouselContainer, options);
});
