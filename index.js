// const track = document.querySelector(".slider-track");
// const slides = document.querySelectorAll(".slide");
// const dots = document.querySelectorAll(".dot");

// let currentIndex = 0;

// function showSlide(index) {
//   track.style.transform = `translateX(-${index * 100}%)`;

//   dots.forEach((dot, i) => {
//     dot.classList.toggle("active", i === index);
//   });

//   currentIndex = index;
// }

// // Auto slide
// setInterval(() => {
//   let next = (currentIndex + 1) % slides.length;
//   showSlide(next);
// }, 5000);

// // Dot click
// dots.forEach((dot) => {
//   dot.addEventListener("click", () => {
//     showSlide(Number(dot.dataset.slide));
//   });
// });

// ==================header====================

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mainMenu = document.getElementById("mainMenu");

hamburgerBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  hamburgerBtn.classList.toggle("active");
  mainMenu.classList.toggle("active");

  const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
  hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
});

mainMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    hamburgerBtn.classList.remove("active");
    mainMenu.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", function (event) {
  const headerElement = document.querySelector(".main-header");
  const isClickInsideHeader = headerElement.contains(event.target);

  if (!isClickInsideHeader && mainMenu.classList.contains("active")) {
    hamburgerBtn.classList.remove("active");
    mainMenu.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && mainMenu.classList.contains("active")) {
    hamburgerBtn.classList.remove("active");
    mainMenu.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }
});

mainMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

// ==================header====================

$(document).ready(function () {
  function initPricingSlider() {
    if ($(window).width() < 991) {
      $(".pricing-slider").owlCarousel({
        loop: false,
        // margin: 50,
        // stagePadding: 200,
        items: 1,
        dots: true,
        center: true,
        nav: false,
      });
    }
  }

  initPricingSlider();

  $(window).resize(function () {
    $(".pricing-slider").trigger("destroy.owl.carousel");
    initPricingSlider();
  });
});

$(document).ready(function () {
  $(".workflow-slider").owlCarousel({
    loop: true,
    margin: 390,
    center: true, // IMPORTANT
    stagePadding: 100, // shows partial side slides
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
        stagePadding: 0,
        // margin: 200,
      },
      768: {
        items: 2,
        stagePadding: 200,
        margin: 350,
      },
      1200: {
        items: 4,
        stagePadding: 0,
        // margin: 370,
      },
      1400: {
        items: 4,
      },
    },
  });
});

const sliderWrapper = document.getElementById("sliderWrapper");
const cards = document.querySelectorAll(".card");
const cardWidth = 350;
const gap = 50;
const cardWithGap = cardWidth + gap;
const totalOriginalCards = 5; // Number of original cards
let currentIndex1 = 0;
let autoScrollInterval;

function moveToSlide(index) {
  sliderWrapper.style.transform = `translateX(-${index * cardWithGap}px)`;
  currentIndex1 = index;
}

function nextSlide() {
  currentIndex1++;
  moveToSlide(currentIndex1);

  // Check if we've reached the duplicate cards
  if (currentIndex1 >= totalOriginalCards) {
    setTimeout(() => {
      sliderWrapper.style.transition = "none";
      currentIndex1 = 0;
      moveToSlide(0);
      setTimeout(() => {
        sliderWrapper.style.transition = "transform 0.6s ease-in-out";
      }, 50);
    }, 600); // Duration of transition (0.6s)
  }
}

function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function resetAutoScroll() {
  stopAutoScroll();
  startAutoScroll();
}



const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

// Split chars in every slide's text element once
document.querySelectorAll(".slide-content-mbl, .slide-content").forEach((el) => {
  const text = el.textContent;
  el.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    el.appendChild(span);
  });
});

function triggerSplitAnimation(index) {
  const activeEls = slides[index].querySelectorAll(".slide-content-mbl, .slide-content");
  if (!activeEls.length) return;

  activeEls.forEach((el) => {
    const spans = el.querySelectorAll("span");
    gsap.killTweensOf(spans);
    gsap.from(spans, {
      x: 150,
      opacity: 0,
      duration:3.0,
      ease: "power4.out",
      stagger: 0.05,
    });
  });
}

function showSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  currentIndex = index;
  triggerSplitAnimation(index); // fires on every slide change
}

// Trigger on first load
window.addEventListener("load", () => triggerSplitAnimation(0));

// Auto slide
setInterval(() => {
  showSlide((currentIndex + 1) % slides.length);
}, 5000);

// Dot click
dots.forEach((dot) => {
  dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)));
});
