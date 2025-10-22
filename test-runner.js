// Simple test runner skeleton
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(location.search);
  const testId = params.get('test') || 'dsa';
  const testTitleEl = document.getElementById('test-title');
  const testDescEl = document.getElementById('test-desc');
  const questionContainer = document.getElementById('question-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const progressWrap = document.getElementById('progress');

  // Basic test meta - extendable
  const testMeta = {
    dsa: { title: 'Data Structures & Algorithms', desc: 'Solve algorithm and data structure questions.', questions: [
      { q: 'What is the time complexity of binary search?', options:['O(n)','O(log n)','O(n log n)','O(1)'], answer:1 },
      { q: 'Which data structure uses LIFO?', options:['Queue','Stack','Tree','Graph'], answer:1 }
    ]},
    cloud: { title: 'Cloud Computing', desc: 'Basics of cloud platforms.', questions: [
      { q: 'Which service is IaaS?', options:['Lambda','EC2','S3','Route53'], answer:1 }
    ]},
    devops: { title: 'DevOps Essentials', desc: 'CI/CD and containers.', questions: [
      { q: 'What does CI stand for?', options:['Continuous Integration','Continuous Implementation','Code Integration','Continuous Inspection'], answer:0 }
    ]},
  };

  const meta = testMeta[testId] || testMeta.dsa;
  testTitleEl.textContent = meta.title;
  testDescEl.textContent = meta.desc;

  let idx = 0;
  const answers = new Array(meta.questions.length).fill(null);

  function renderQuestion() {
    const item = meta.questions[idx];
    questionContainer.innerHTML = `
      <div class="question">
        <div class="question-text">${idx+1}. ${item.q}</div>
        <div class="options">
          ${item.options.map((opt,i)=>`<label class="option"><input type="radio" name="opt" value="${i}" ${answers[idx]===i? 'checked':''}/> ${opt}</label>`).join('')}
        </div>
      </div>
    `;

    // show progress
    if (progressWrap && progressBar) {
      progressWrap.style.display = '';
      const pct = Math.round(((idx)/meta.questions.length)*100);
      progressBar.style.width = `${pct}%`;
    }
  }

  function saveAnswer() {
    const selected = questionContainer.querySelector('input[name="opt"]:checked');
    if (selected) answers[idx] = parseInt(selected.value, 10);
  }

  prevBtn.addEventListener('click', function () {
    saveAnswer();
    if (idx>0) { idx--; renderQuestion(); }
  });

  nextBtn.addEventListener('click', function () {
    saveAnswer();
    if (idx < meta.questions.length - 1) {
      idx++; renderQuestion();
    } else {
      // finished -> compute score and go to payment
      const correct = meta.questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
      const pct = Math.round((correct / meta.questions.length) * 100);
      // Save score in session and go to payment
      sessionStorage.setItem('lastResult', JSON.stringify({ test: testId, score: pct }));
      // redirect to payment page
      location.href = 'payment.html';
    }
  });

  // initial render
  renderQuestion();
});