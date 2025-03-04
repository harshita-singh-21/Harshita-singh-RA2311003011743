const quizzes = [
    { question: '2 + 2?', options: ['3','4','5'], answer: '4' },
    { question: 'Capital of France?', options: ['Berlin','Paris','Rome'], answer: 'Paris' }
  ];
  
  const quizContainer = document.getElementById('quizContainer');
  let userAnswers = [];
  
  quizzes.forEach((quiz, i) => {
    const qBlock = document.createElement('div');
    qBlock.innerHTML = `<p>${quiz.question}</p>`;
    quiz.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.innerText = opt;
      btn.onclick = () => {
        userAnswers[i] = opt;
        btn.className = opt === quiz.answer ? 'correct' : 'incorrect';
      };
      qBlock.appendChild(btn);
    });
    quizContainer.appendChild(qBlock);
  });
  
  function submitAllAnswers() {
    let score = 0;
    document.getElementById('answerSheet').innerHTML = quizzes.map((q, i) => {
      const correct = q.answer;
      const user = userAnswers[i] || 'No answer';
      if(user === correct) score++;
      return `<p>Q${i+1}: ${q.question} - Your Answer: ${user} | Correct Answer: ${correct}</p>`;
    }).join('');
    document.getElementById('totalScore').innerText = `Score: ${score}/${quizzes.length}`;
  }