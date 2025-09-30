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
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const viewport = carousel.querySelector('.carousel-viewport');
  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let slides = Array.from(track.children);
  const originalCount = slides.length;

  if (originalCount < 3) {
    slides.forEach((s, i) => {
      s.classList.remove('center', 'adjacent');
      if (i === 1) s.classList.add('center');
      else if (i === 0 || i === 2) s.classList.add('adjacent');
    });
    return;
  }

  const cloneCount = 2;
  for (let i = originalCount - cloneCount; i < originalCount; i++) {
    const clone = slides[i].cloneNode(true);
    clone.classList.add('clone');
    track.insertBefore(clone, track.firstChild);
  }
  for (let i = 0; i < cloneCount; i++) {
    const clone = slides[i].cloneNode(true);
    clone.classList.add('clone');
    track.appendChild(clone);
  }

  slides = Array.from(track.children);

  const firstRealIndex = cloneCount;
  const lastRealIndex = cloneCount + originalCount - 1;

  let currentIndex = firstRealIndex + 1;

  function updateClasses() {
    slides.forEach(s => s.classList.remove('center', 'adjacent'));
    const center = currentIndex;
    const left = (currentIndex - 1 + slides.length) % slides.length;
    const right = (currentIndex + 1) % slides.length;

    slides[center] && slides[center].classList.add('center');
    slides[left] && slides[left].classList.add('adjacent');
    slides[right] && slides[right].classList.add('adjacent');
  }

  function setPosition(animate = true) {
    const vw = viewport.clientWidth;
    const slideWidth = vw / 3;
    if (animate) track.style.transition = 'transform 600ms cubic-bezier(.22,.99,.35,1)';
    else track.style.transition = 'none';

    const offset = (currentIndex - 1) * slideWidth;
    track.style.transform = `translateX(-${offset}px)`;
    updateClasses();
  }

  track.addEventListener('transitionend', () => {
    if (currentIndex > lastRealIndex) {
      currentIndex = firstRealIndex + (currentIndex - lastRealIndex - 1);
      setPosition(false);
    } else if (currentIndex < firstRealIndex) {
      currentIndex = lastRealIndex - (firstRealIndex - currentIndex - 1);
      setPosition(false);
    }
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    setPosition(true);
  });
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    setPosition(true);
  });

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      currentIndex = i;
      setPosition(true);
    });
  });

  window.addEventListener('resize', () => setPosition(false));

  let autoplay = setInterval(() => {
    currentIndex++;
    setPosition(true);
  }, 4000);

  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => {
    clearInterval(autoplay);
    autoplay = setInterval(() => {
      currentIndex++;
      setPosition(true);
    }, 4000);
  });

  setPosition(false);
})();
