const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = {};
let time = 59; // Set the initial time in seconds
let countdownTimer;


let questions = [
  {
    "question": "What does HTML stand for in web development?",
    "choice1": "Hyper Text Markup Language",
    "choice2": "High Tech Modern Language",
    "choice3": "Hyperlink and Text Markup Language",
    "choice4": "Home Tool Management Language",
    "answer": 1
  },
  {
    "question": "Which HTML tag is used for creating a hyperlink?",
    "choice1": "<link>",
    "choice2": "<a>",
    "choice3": "<href>",
    "choice4": "<hyperlink>",
    "answer": 2
  },
  {
    "question": "What is the purpose of CSS in web development?",
    "choice1": "To create dynamic web pages",
    "choice2": "To store data on the server",
    "choice3": "To add interactivity to websites",
    "choice4": "To style and format the presentation of web pages",
    "answer": 4
  },
  {
    "question": "Which programming language is often used for adding interactivity to web pages?",
    "choice1": "JavaScript",
    "choice2": "Python",
    "choice3": "Java",
    "choice4": "C++",
    "answer": 1
  },
  {
    "question": "What is the purpose of the <head> element in an HTML document?",
    "choice1": "To define the main content of the document",
    "choice2": "To display content in the browser window",
    "choice3": "To contain metadata and links to external resources",
    "choice4": "To create a header at the top of the page",
    "answer": 3
  },
  {
    "question": "What does CSS stand for in web development?",
    "choice1": "Cascading Style Sheets",
    "choice2": "Creative Style Scripts",
    "choice3": "Cascading Sheet Styles",
    "choice4": "Colorful Style Scripts",
    "answer": 1
  },
  {
    "question": "Which HTML tag is used for creating a table?",
    "choice1": "<table>",
    "choice2": "<tab>",
    "choice3": "<tr>",
    "choice4": "<td>",
    "answer": 1
  },
  {
    "question": "What is the purpose of JavaScript in web development?",
    "choice1": "To style web pages",
    "choice2": "To define the structure of a web page",
    "choice3": "To add interactivity and dynamic content to web pages",
    "choice4": "To create and manage databases",
    "answer": 3
  },
  {
    "question": "What does the acronym API stand for in web development?",
    "choice1": "Advanced Page Interaction",
    "choice2": "Application Programming Interface",
    "choice3": "Automated Performance Integration",
    "choice4": "Active Page Information",
    "answer": 2
  },
  {
    "question": "Which programming language is often used for server-side web development?",
    "choice1": "HTML",
    "choice2": "CSS",
    "choice3": "JavaScript",
    "choice4": "PHP",
    "answer": 4
  },
  {
    "question": "What is the purpose of the <script> element in an HTML document?",
    "choice1": "To define the main content of the document",
    "choice2": "To display content in the browser window",
    "choice3": "To contain metadata and links to external resources",
    "choice4": "To include JavaScript code in the document",
    "answer": 4
  },
  {
    "question": "What is the purpose of the 'viewport' meta tag in HTML?",
    "choice1": "To define the visual appearance of a web page",
    "choice2": "To specify the character encoding of the page",
    "choice3": "To set the language of the page content",
    "choice4": "To control the width and scaling of the viewport on mobile devices",
    "answer": 4
  },
  {
    "question": "What does the 'async' attribute do in a script tag?",
    "choice1": "It loads the script asynchronously and executes it when it is ready",
    "choice2": "It marks the script as an external resource to be fetched and executed later",
    "choice3": "It specifies that the script should be executed synchronously",
    "choice4": "It indicates that the script should be ignored by the browser",
    "answer": 1
  },
  {
    "question": "Which programming language is often used for adding style and interactivity to web pages?",
    "choice1": "JavaScript",
    "choice2": "Python",
    "choice3": "Java",
    "choice4": "C++",
    "answer": 1
  },
  {
    "question": "What is the purpose of the <div> element in HTML?",
    "choice1": "To define a section of a web page",
    "choice2": "To create a hyperlink",
    "choice3": "To add a heading to a page",
    "choice4": "To display an image",
    "answer": 1
  },
  {
    "question": "Which HTML tag is used for creating an ordered list?",
    "choice1": "<ul>",
    "choice2": "<li>",
    "choice3": "<ol>",
    "choice4": "<dl>",
    "answer": 3
  },
  {
    "question": "What is the purpose of the <form> element in HTML?",
    "choice1": "To create a table",
    "choice2": "To display a video",
    "choice3": "To define a section of a web page",
    "choice4": "To create an interactive form for user input",
    "answer": 4
  },
  {
    "question": "Which programming language is used for defining the structure and layout of a web page?",
    "choice1": "JavaScript",
    "choice2": "Python",
    "choice3": "HTML",
    "choice4": "CSS",
    "answer": 3
  },
  {
    "question": "What is the purpose of the <img> element in HTML?",
    "choice1": "To create a hyperlink",
    "choice2": "To add a heading to a page",
    "choice3": "To display an image",
    "choice4": "To define a section of a web page",
    "answer": 3
  },
  {
    "question": "Which programming language is often used for handling server-side logic in web applications?",
    "choice1": "HTML",
    "choice2": "CSS",
    "choice3": "JavaScript",
    "choice4": "PHP",
    "answer": 4
  }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 5

startGame = () => {

  countdownTimer = setInterval(timer_function, 1000);  // 1000 milliseconds = 1 second

  questionsCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

// function for timer
function timer_function() {
  document.getElementById('time').innerText = time;

  if (time < 0) {
    clearInterval(countdownTimer);
    alert("Out of time");
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('end.html')
  }
  time--;
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS - 1) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('end.html')
  }

  questionsCounter++
  progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionsCounter / MAX_QUESTIONS) * 100}% `

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)   /*increments if selected answer is correct*/
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()