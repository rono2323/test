// Common site JS (header/footer small helpers)
document.addEventListener('DOMContentLoaded', function () {
  // Set current year in footers
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year2').forEach(el => { if (el) el.textContent = y; });

  // Simple keyboard accessibility: focus first input on tests page
  const search = document.getElementById('search-box');
  if (search) search.focus();
});