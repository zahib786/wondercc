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

// Add mouse events to pause on hover
sliderWrapper.addEventListener("mouseenter", stopAutoScroll);
sliderWrapper.addEventListener("mouseleave", resetAutoScroll);

// Start auto scroll on load
startAutoScroll();


















gsap.registerPlugin(SplitText);

let split, animation;

function setup() {
  split && split.revert();

  split = new SplitText(".slide-content-mbl", {
    type: "chars,words,lines"
  });

  animation = gsap.from(split.chars, {
    x: 150,
    opacity: 0,
    duration: 1.9,
    ease: "power4.out",
    stagger: 0.05
  });
}

// Run on load
window.addEventListener("load", setup);

// Recalculate on resize
window.addEventListener("resize", setup);