const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentIndex = index;
}

// Auto slide every 5 seconds
setInterval(() => {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}, 5000);

// Dot click
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(parseInt(dot.dataset.slide));
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
