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
        "question": "What is a database?",
        "choice1": "A collection of programming code",
        "choice2": "A physical storage device",
        "choice3": "A structured collection of data",
        "choice4": "A web server",
        "answer": 3
    },
    {
        "question": "Which type of database model uses tables to store data?",
        "choice1": "Object-Oriented Database",
        "choice2": "Hierarchical Database",
        "choice3": "Relational Database",
        "choice4": "NoSQL Database",
        "answer": 3
    },
    {
        "question": "In a relational database, what is a foreign key?",
        "choice1": "A key used for encryption",
        "choice2": "A key used to access external resources",
        "choice3": "A key that uniquely identifies each record",
        "choice4": "A key used to link two tables together",
        "answer": 4
    },
    {
        "question": "What is the primary purpose of the SQL language?",
        "choice1": "To create websites",
        "choice2": "To design user interfaces",
        "choice3": "To query and manipulate databases",
        "choice4": "To write machine learning algorithms",
        "answer": 3
    },
    {
        "question": "Which SQL statement is used to retrieve data from a database?",
        "choice1": "INSERT",
        "choice2": "UPDATE",
        "choice3": "SELECT",
        "choice4": "DELETE",
        "answer": 3
    },
    {
        "question": "Which type of database is known for its flexible and schema-less design?",
        "choice1": "Relational Database",
        "choice2": "Hierarchical Database",
        "choice3": "NoSQL Database",
        "choice4": "Object-Oriented Database",
        "answer": 3
    },
    {
        "question": "What is the process of combining data from multiple tables in a database?",
        "choice1": "Indexing",
        "choice2": "Sorting",
        "choice3": "Normalization",
        "choice4": "Joining",
        "answer": 4
    },
    {
        "question": "Which type of index is created automatically by the database management system?",
        "choice1": "Clustered Index",
        "choice2": "Primary Index",
        "choice3": "Secondary Index",
        "choice4": "Non-Clustered Index",
        "answer": 2
    },
    {
        "question": "What is ACID in the context of database transactions?",
        "choice1": "A database management system",
        "choice2": "A data storage format",
        "choice3": "A transaction processing model",
        "choice4": "A set of properties to ensure data integrity",
        "answer": 4
    },
    {
        "question": "Which SQL function is used to calculate the average value of a column?",
        "choice1": "SUM",
        "choice2": "COUNT",
        "choice3": "AVERAGE",
        "choice4": "AVG",
        "answer": 4
    },
    {
        "question": "What is the purpose of a database index?",
        "choice1": "To encrypt data for security",
        "choice2": "To store data physically on disk",
        "choice3": "To speed up data retrieval by providing quick access paths",
        "choice4": "To generate random data values",
        "answer": 3
    },
    {
        "question": "Which database model organizes data in a tree-like structure with parent-child relationships?",
        "choice1": "Relational Database",
        "choice2": "Object-Oriented Database",
        "choice3": "Hierarchical Database",
        "choice4": "NoSQL Database",
        "answer": 3
    },
    {
        "question": "What is the purpose of database normalization?",
        "choice1": "To optimize data storage space",
        "choice2": "To eliminate data redundancy",
        "choice3": "To speed up query performance",
        "choice4": "To secure the database from unauthorized access",
        "answer": 2
    },
    {
        "question": "Which SQL statement is used to add new rows to a database table?",
        "choice1": "INSERT",
        "choice2": "UPDATE",
        "choice3": "SELECT",
        "choice4": "DELETE",
        "answer": 1
    },
    {
        "question": "What does the acronym CRUD stand for in database operations?",
        "choice1": "Create, Read, Update, Delete",
        "choice2": "Cut, Replace, Undo, Delete",
        "choice3": "Copy, Retrieve, Update, Destroy",
        "choice4": "Control, Rollback, Update, Delete",
        "answer": 1
    },
    {
        "question": "Which type of database model uses graph structures to represent and store data?",
        "choice1": "Relational Database",
        "choice2": "Object-Oriented Database",
        "choice3": "NoSQL Database",
        "choice4": "Graph Database",
        "answer": 4
    },
    {
        "question": "In a relational database, what is a primary key?",
        "choice1": "A key used to encrypt sensitive data",
        "choice2": "A unique identifier for each record in a table",
        "choice3": "A key used for accessing external resources",
        "choice4": "A key used to link two tables together",
        "answer": 2
    },
    {
        "question": "What is a SQL injection attack?",
        "choice1": "A technique to speed up database queries",
        "choice2": "A method to encrypt data in the database",
        "choice3": "An attempt to retrieve unauthorized data from the database",
        "choice4": "A process to optimize SQL queries",
        "answer": 3
    },
    {
        "question": "Which type of join combines records from two tables based on matching values?",
        "choice1": "INNER JOIN",
        "choice2": "OUTER JOIN",
        "choice3": "LEFT JOIN",
        "choice4": "RIGHT JOIN",
        "answer": 1
    },
    {
        "question": "What is the purpose of the GROUP BY clause in SQL?",
        "choice1": "To create a new table",
        "choice2": "To sort the query results",
        "choice3": "To filter data using conditions",
        "choice4": "To group rows based on a column and apply aggregate functions",
        "answer": 4
    },
    {
        "question": "Which type of database model stores data as key-value pairs?",
        "choice1": "Relational Database",
        "choice2": "Object-Oriented Database",
        "choice3": "Document Database",
        "choice4": "Graph Database",
        "answer": 3
    },
    {
        "question": "What is the purpose of the ORDER BY clause in SQL?",
        "choice1": "To filter data using conditions",
        "choice2": "To group rows based on a column and apply aggregate functions",
        "choice3": "To sort the query results",
        "choice4": "To join tables together",
        "answer": 3
    },
    {
        "question": "What does ACID stand for in the context of database transactions?",
        "choice1": "Atomicity, Commitment, Isolation, Durability",
        "choice2": "Availability, Concurrency, Integrity, Durability",
        "choice3": "Atomicity, Consistency, Isolation, Durability",
        "choice4": "Access, Control, Isolation, Durability",
        "answer": 3
    },
    {
        "question": "Which SQL function is used to count the number of rows in a table?",
        "choice1": "SUM",
        "choice2": "COUNT",
        "choice3": "AVERAGE",
        "choice4": "MAX",
        "answer": 2
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