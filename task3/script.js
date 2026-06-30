// ================================
// QUESTIONS
// ================================

const quizData = [
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "CSS"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Flask"],
        answer: "React"
    },
    {
        
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"],
    answer: "&lt;a&gt;"

    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Apple"],
        answer: "Netscape"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    }
];

// ================================
// VARIABLES
// ================================

const startScreen = document.querySelector(".start-screen");
const quizScreen = document.querySelector(".quiz-screen");
const resultScreen = document.querySelector(".result-screen");

const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const restartBtn = document.querySelector(".restart-btn");

const question = document.getElementById("question");
const options = document.getElementById("options");

const current = document.getElementById("current");
const total = document.getElementById("total");

const progress = document.querySelector(".progress");

const timerText = document.getElementById("time");

const scoreText = document.getElementById("scoreText");
const percentage = document.getElementById("percentage");

let currentQuestion = 0;
let score = 0;

let timeLeft = 15;
let timer;

// ================================
// START QUIZ
// ================================

startBtn.onclick = () => {

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    total.innerText = quizData.length;

    loadQuestion();

};

// ================================
// LOAD QUESTION
// ================================

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 15;
    timerText.innerText = timeLeft;

    startTimer();

    current.innerText = currentQuestion + 1;

    progress.style.width =
        ((currentQuestion) / quizData.length) * 100 + "%";

    const q = quizData[currentQuestion];

    question.innerHTML = q.question;

    options.innerHTML = "";

    q.options.forEach(option => {

        const button = document.createElement("div");

        button.classList.add("option");

        button.innerHTML = option;

        button.onclick = () => selectAnswer(button);

        options.appendChild(button);

    });

}

// ================================
// TIMER
// ================================

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerText.innerText = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            disableOptions();

        }

    },1000);

}

// ================================
// SELECT ANSWER
// ================================

function selectAnswer(selected) {

    clearInterval(timer);

    const answer = quizData[currentQuestion].answer;

    document.querySelectorAll(".option").forEach(option=>{

        option.classList.add("disabled");

        if(option.innerHTML===answer){

            option.classList.add("correct");

        }

    });

    if(selected.innerHTML===answer){

        score++;

    }

    else{

        selected.classList.add("wrong");

    }

}

// ================================
// DISABLE OPTIONS
// ================================

function disableOptions(){

    const answer = quizData[currentQuestion].answer;

    document.querySelectorAll(".option").forEach(option=>{

        option.classList.add("disabled");

        if(option.innerHTML===answer){

            option.classList.add("correct");

        }

    });

}

// ================================
// NEXT BUTTON
// ================================

nextBtn.onclick = ()=>{

    currentQuestion++;

    if(currentQuestion < quizData.length){

        loadQuestion();

    }

    else{

        showResult();

    }

}

// ================================
// RESULT
// ================================

function showResult() {

    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    scoreText.textContent = `You scored ${score} out of ${quizData.length}`;

    let percent = Math.round((score / quizData.length) * 100);

    percentage.textContent = percent + "%";

    // Calculate degrees for conic-gradient
    let degree = percent * 3.6;

    document.querySelector(".score-circle").style.background =
        `conic-gradient(
            #06b6d4 0deg,
            #2563eb ${degree}deg,
            rgba(255,255,255,0.12) ${degree}deg,
            rgba(255,255,255,0.12) 360deg
        )`;

}

// ================================
// RESTART
// ================================

restartBtn.onclick = ()=>{

    currentQuestion=0;

    score=0;

    resultScreen.classList.remove("active");

    startScreen.classList.add("active");

    progress.style.width="0%";

}