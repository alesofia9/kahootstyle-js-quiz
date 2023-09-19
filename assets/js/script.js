// Question and answer choice content below. //
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
// Variables for quiz. //
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const header = document.getElementById('header');
const questionContainerElement = document.getElementById('question-container');
var sec = 30;
var time = setInterval(startTimer, 1000);


let currentQuestionIndex = 0;
let score = 0;
//let timeLeft = document.querySelector('.time-left');

// Initiates quiz after user clicks start. //
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=>{
  if(currentQuestionIndex < question.length){
    handleNextButton();
  }else{
    startGame();
  }
})

// Criteria for when user starts the quiz. 'Start' button is hidden, question and answer choices are intergrated, 'Next' button is activated after user selects an answer.
function startGame() {
  startButton.classList.add('hide');
  header.classList.add('hide');
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  questionContainerElement.classList.remove('hide');
  showQuestion();
  startTimer;
}

// Criteria for question generation. Keeps questions to appear in numeric order based on how they are listed above. //
function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

// Criteria for answer choices to be generated based on the question that appears. //
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

// Page resets for next question w/ answer choices to appear. //
function resetState() {
  nextButton.style.display ='none';
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

// Visual feedback for user when they click either correct or incorrect answer. //
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

// Generates the score after the user completes quiz. COULD NOT FIX LINE 150 TO ACTUALLY GET IT TO WORK FOR THE LIFE OF ME. However, user can see how many questions they got correct by checking the Console. 
function showScore(){
  resetState();
  questionElement.innerHTML = 'You scored + ${score} + out of + ${question.length};'
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
  console.log(score);
}

// Screen populates score box after user clicks 'Next' on the last question. //
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < question.length){
    showQuestion();
  }else{
    showScore();
  }
}

// Timer for quiz. I was trying to get it to initiate AFTER the user clicks 'Start', but when I modified it my Console page would give me red alerts. When timer reaches zero, an alert box will appear on user window that will tell user to refresh page to try again. //  
function startTimer() {
    document.getElementById('timer').innerHTML = sec + " seconds";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time is up! Game Over! Refresh the page and try again :(");
    }
}

