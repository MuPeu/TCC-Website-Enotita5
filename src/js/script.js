// --------- Textarea ---------
const textarea = document.querySelector('.message');

textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reset height to recalculate

  const lineHeight = 25;
  const minHeight = 44;
  const scrollHeight = this.scrollHeight;

  const lines = Math.round(scrollHeight / lineHeight);

  if (lines <= 1) {
    this.style.height = minHeight;
  } else {
    this.style.height = scrollHeight + 'px';
  }
});

// --------- Carrossel ---------
(function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;
  let autoplay;

  function updateCarousel() {
    slides.forEach(slide => slide.classList.remove('prev','center','next'));

    const total = slides.length;
    const centerIndex = currentIndex % total;
    const prevIndex = (centerIndex - 1 + total) % total;
    const nextIndex = (centerIndex + 1) % total;

    slides[centerIndex].classList.add('center');
    slides[prevIndex].classList.add('prev');
    slides[nextIndex].classList.add('next');
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoplay() {
    autoplay = setInterval(nextSlide, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
    autoplay = null;
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoplay();
  });

  updateCarousel();
  startAutoplay();
})();