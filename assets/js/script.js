const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
// Initiates the game when user clicks the 'Start' button. Math formula set to have questions randomized each time user takes quiz. //
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
// Displays one question at a time on screen for user. When user answers question, page is refreshed with a new question. //
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
//Changes page to default layout when user moves onto next question: question w/4 answer choices.//
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
//Sets the criteria for when user selects the correct answer. Changes the 'Start' button to state 'Restart' when the user reaches the end of the quiz.//
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// Question content below. Moved to end to add/edit questions quickly. //
const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<script>', correct: true },
      { text: '<javascript>', correct: false },
      { text: '<scripting>', correct: false },
      { text: '<js>', correct: false }
    ]
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      { text: 'The <head> section', correct: false },
      { text: 'The <body section>', correct: false },
      { text: 'The <title> section ', correct: false },
      { text: 'Both the <head> and <body> section', correct: true }
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
    question: 'WWhich operator is used to assign a value to a variable?',
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