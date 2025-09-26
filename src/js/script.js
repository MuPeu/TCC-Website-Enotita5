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
