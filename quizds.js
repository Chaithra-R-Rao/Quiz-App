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
    "question": "What is the time complexity of a linear search algorithm?",
    "choice1": "O(1)",
    "choice2": "O(log n)",
    "choice3": "O(n)",
    "choice4": "O(n^2)",
    "answer": 3
  },
  {
    "question": "Which data structure follows the First-In-First-Out (FIFO) principle?",
    "choice1": "Stack",
    "choice2": "Queue",
    "choice3": "Linked List",
    "choice4": "Tree",
    "answer": 2
  },
  {
    "question": "What is the worst-case time complexity of the bubble sort algorithm?",
    "choice1": "O(1)",
    "choice2": "O(log n)",
    "choice3": "O(n)",
    "choice4": "O(n^2)",
    "answer": 4
  },
  {
    "question": "In a binary search tree, which traversal visits the root node last?",
    "choice1": "Preorder",
    "choice2": "Inorder",
    "choice3": "Postorder",
    "choice4": "Level order",
    "answer": 3
  },
  {
    "question": "What is the purpose of using hashing in data structures?",
    "choice1": "To sort data",
    "choice2": "To store data in a sorted order",
    "choice3": "To efficiently access and store key-value pairs",
    "choice4": "To perform arithmetic operations",
    "answer": 3
  },
  {
    "question": "Which sorting algorithm is known for its divide-and-conquer approach?",
    "choice1": "Merge Sort",
    "choice2": "Selection Sort",
    "choice3": "Insertion Sort",
    "choice4": "Bubble Sort",
    "answer": 1
  },
  {
    "question": "What is the primary advantage of using a linked list over an array?",
    "choice1": "Constant-time access to elements",
    "choice2": "Dynamic size",
    "choice3": "No need for pointers",
    "choice4": "Automatic memory management",
    "answer": 2
  },
  {
    "question": "Which data structure is suitable for implementing a LIFO (Last-In-First-Out) structure?",
    "choice1": "Queue",
    "choice2": "Linked List",
    "choice3": "Stack",
    "choice4": "Tree",
    "answer": 3
  },
  {
    "question": "What is the worst-case time complexity of the insertion sort algorithm?",
    "choice1": "O(1)",
    "choice2": "O(log n)",
    "choice3": "O(n)",
    "choice4": "O(n^2)",
    "answer": 4
  },
  {
    "question": "Which algorithm is used to find the shortest path in a weighted graph?",
    "choice1": "Depth-First Search (DFS)",
    "choice2": "Breadth-First Search (BFS)",
    "choice3": "Dijkstra's algorithm",
    "choice4": "Bubble Sort",
    "answer": 3
  },
  {
    "question": "What is the purpose of using a hash table?",
    "choice1": "To sort data",
    "choice2": "To efficiently search for data",
    "choice3": "To perform mathematical operations",
    "choice4": "To link nodes in a tree",
    "answer": 2
  },
  {
    "question": "Which algorithm is used to find the minimum spanning tree in a weighted graph?",
    "choice1": "Kruskal's algorithm",
    "choice2": "Prim's algorithm",
    "choice3": "Depth-First Search (DFS)",
    "choice4": "Bubble Sort",
    "answer": 2
  },
  {
    "question": "What is the primary purpose of a stack data structure?",
    "choice1": "To store data in a sorted order",
    "choice2": "To efficiently access key-value pairs",
    "choice3": "To implement recursive function calls",
    "choice4": "To perform arithmetic operations",
    "answer": 3
  },
  {
    "question": "Which searching algorithm requires the list to be sorted?",
    "choice1": "Linear Search",
    "choice2": "Binary Search",
    "choice3": "Depth-First Search (DFS)",
    "choice4": "Breadth-First Search (BFS)",
    "answer": 2
  },
  {
    "question": "What is the worst-case time complexity of the selection sort algorithm?",
    "choice1": "O(1)",
    "choice2": "O(log n)",
    "choice3": "O(n)",
    "choice4": "O(n^2)",
    "answer": 4
  },
  {
    "question": "What is the primary purpose of the divide-and-conquer strategy in algorithms?",
    "choice1": "To sort data in ascending order",
    "choice2": "To solve complex problems by breaking them into smaller subproblems",
    "choice3": "To find the shortest path in a graph",
    "choice4": "To perform matrix multiplication",
    "answer": 2
  },
  {
    "question": "Which data structure is used for efficient searching, insertion, and deletion operations?",
    "choice1": "Stack",
    "choice2": "Queue",
    "choice3": "Linked List",
    "choice4": "Binary Search Tree (BST)",
    "answer": 4
  },
  {
    "question": "What is the worst-case time complexity of the quicksort algorithm?",
    "choice1": "O(1)",
    "choice2": "O(log n)",
    "choice3": "O(n)",
    "choice4": "O(n^2)",
    "answer": 4
  },
  {
    "question": "Which algorithm is used to find the longest common subsequence in two strings?",
    "choice1": "Dijkstra's algorithm",
    "choice2": "Kruskal's algorithm",
    "choice3": "Longest Common Subsequence (LCS) algorithm",
    "choice4": "Prim's algorithm",
    "answer": 3
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