const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "A. Hyper Text Markup Language", correct: true },
            { text: "B. Hyperlinks and Text Markup Language", correct: false },
            { text: "C. Home Tool Markup Language", correct: false },
            { text: "D. Hyperlinking Text Marking Language", correct: false }
        ]
    },
    {
        question: "Which of the following is a valid CSS property?",
        answers: [
            { text: "A. text-transform", correct: true },
            { text: "B. text-decoration-line", correct: false },
            { text: "C. text-shape-outside", correct: false },
            { text: "D. text-clipping", correct: false }
        ]
    },
    {
        question: "What does JS stand for?",
        answers: [
            { text: "A. JavaScript", correct: true },
            { text: "B. JavaSheet", correct: false },
            { text: "C. JustScript", correct: false },
            { text: "D. JiveScript", correct: false }
        ]
    },
    {
        question: "Which method is used to filter an array in JavaScript?",
        answers: [
            { text: "A. map()", correct: false },
            { text: "B. filter()", correct: true },
            { text: "C. reduce()", correct: false },
            { text: "D. slice()", correct: false }
        ]
    },
    {
        question: "Which of the following is a JavaScript framework?",
        answers: [
            { text: "A. Django", correct: false },
            { text: "B. React", correct: true },
            { text: "C. Laravel", correct: false },
            { text: "D. Spring", correct: false }
        ]
    }
];

const timerElement = document.getElementById('time-left');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const questionContainerElement = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const submissionCheckbox = document.getElementById('submissionCheckbox');
const scoreContainer = document.getElementById('score-container');

let timeLeft = 30;
let timerInterval;
let shuffledQuestions, currentQuestionIndex, score = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");
    startQuiz();
});

function startQuiz() {
    console.log("Quiz started");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    console.log("Setting next question");
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    console.log("Showing question:", question);
    const questionElement = document.getElementById('question');
    questionElement.innerText = question.question; // Set question text
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text; // Set answer text
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button); // Add button to answer container
    });
}

function startTimer() {
    timeLeft = 30;
    timerElement.innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer();
        }
    }, 1000);
}

function resetState() {
    nextButton.classList.add('hide');
    submissionCheckbox.checked = false;
    clearInterval(timerInterval);

    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (!selectedAnswer) {
        alert("Please select an answer before submitting!");
        return;
    }

    const correct = selectedAnswer.dataset.correct === 'true';
    setStatusClass(selectedAnswer.parentElement, correct);

    Array.from(answerButtonsElement.children).forEach(answerDiv => {
        const radio = answerDiv.querySelector('input[type="radio"]');
        setStatusClass(answerDiv, radio.dataset.correct === 'true');
    });

    if (correct) {
        score++;
    }

    submitButton.classList.add('hide');
    submissionCheckbox.checked = true;

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.classList.add('hide');
        showScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    questionContainerElement.classList.add('hide');
    scoreContainer.innerHTML = `
        <div class="score-content">
            <h2>Your score: ${score} / ${questions.length}</h2>
            <p>${score === questions.length ? 'Great job!' : score > questions.length / 2 ? 'Good effort!' : 'Keep practicing!'}</p>
        </div>
    `;
    scoreContainer.classList.remove('hide');
}
