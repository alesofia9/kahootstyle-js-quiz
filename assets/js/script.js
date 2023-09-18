const question = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '< script >', correct: true },
      { text: '< javascript >', correct: false },
      { text: '< scripting >', correct: false },
      { text: '< js >', correct: false }
    ]
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      { text: 'The < head > section', correct: false },
      { text: 'The < body > section>', correct: false },
      { text: 'The < title > section ', correct: false },
      { text: 'Both the < head > and < body > section', correct: true }
    ]
  },
  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      { text: 'function = myFunction()', correct: false },
      { text: 'function myFunction()  ', correct: true },
      { text: 'function:myFunction()  ', correct: false },
      { text: 'my.function()', correct: false }
    ]
  },
  {
    question: 'Which event occurs when the user clicks on an HTML element?',
    answers: [
      { text: 'onclick', correct: true },
      { text: 'onmouseclick', correct: false },
      { text: 'onclack', correct: false },
      { text: 'onchange', correct: false }
    ]
  },
  {
    question: 'Isnt web development great?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'Which operator is used to assign a value to a variable?',
    answers: [
      { text: '+', correct: false },
      { text: '-', correct: false },
      { text: 'x', correct: false },
      { text: '=', correct: true }
    ]
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answers: [
      { text: 'script type="xxx.js"', correct: false },
      { text: 'script name="xxx.js"', correct: false },
      { text: 'script src="xxx.js"', correct: true },
      { text: 'script href="xxx.js"', correct: false }
    ]
  }
]

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const header = document.getElementById('header');
const questionContainerElement = document.getElementById('question-container');
var sec = 45;
var time = setInterval(startTimer, 1000);


let currentQuestionIndex = 0;
let score = 0;
//let timeLeft = document.querySelector('.time-left');

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=>{
  if(currentQuestionIndex < question.length){
    handleNextButton();
  }else{
    startGame();
  }
})

function startGame() {
  startButton.classList.add('hide');
  header.classList.add('hide');
  currentQuestionIndex = 0;
  score =0;
  nextButton.innerHTML = 'Next';
  questionContainerElement.classList.remove('hide');
  showQuestion();
  startTimer;
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

 currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  })
}

function resetState() {
  nextButton.style.display ='none';
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect){
    selectedBtn.classList.add('correct');
    score++;
  }else{
    selectedBtn.classList.add('wrong');
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true'){
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore(){
  resetState();
  questionElement.innerHTML = 'You scored ${score} out of ${question.length}!';
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < question.length){
    showQuestion();
  }else{
    showScore();
  }
}

function startTimer() {
    document.getElementById('timer').innerHTML = sec + " seconds";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Game Over! :(");
    }
}

