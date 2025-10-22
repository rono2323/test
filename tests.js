// Tests page JS: search filter and start button handler
document.addEventListener('DOMContentLoaded', function () {
  const searchBox = document.getElementById('search-box');
  const cards = Array.from(document.querySelectorAll('.test-card'));

  function filterTests() {
    const q = (searchBox.value || '').toLowerCase().trim();
    cards.forEach(card => {
      const title = card.querySelector('.test-header h3').textContent.toLowerCase();
      const desc = card.querySelector('.test-header p').textContent.toLowerCase();
      card.style.display = (title.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  }

  if (searchBox) {
    searchBox.addEventListener('input', filterTests);
  }

  // Start test button behavior: redirect to test.html?test=<id>
  document.querySelectorAll('.start-test-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const test = this.dataset.test || this.closest('.test-card')?.dataset.test;
      if (test) {
        window.location.href = `test.html?test=${encodeURIComponent(test)}`;
      } else {
        window.location.href = 'test.html';
      }
    });
  });
});