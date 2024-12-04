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
let timeLeft = 30; // Initial time for each question
let timerInterval; // Variable to store the timer interval

// Function to start the timer for each question
function startTimer() {
    timeLeft = 30; // Set initial time limit for each question
    timerElement.innerText = timeLeft; // Display the time left

    // Start the timer interval
    timerInterval = setInterval(() => {
        timeLeft--; // Decrement the time left by 1 second
        timerElement.innerText = timeLeft; // Update the display

        // If time runs out, automatically select an answer
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            selectAnswer(); // Submit the answer
        }
    }, 1000); // Repeat every second
}

const scoreContainer = document.getElementById('score-container');

// Function to show the final score
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

// Event listeners for buttons
nextButton.addEventListener('click', () => {
    currentQuestionIndex++; // Move to the next question index
    setNextQuestion(); // Load the next question
});

submitButton.addEventListener('click', selectAnswer);

// Start the quiz when the DOM content is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    startQuiz();
});
// Function to reset the state for the next question
function resetState() {
    nextButton.classList.add('hide');
    submissionCheckbox.checked = false;
    clearInterval(timerInterval);

    // Remove all previous answer elements
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle answer submission
function selectAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    // If no answer is selected, show an alert
    if (!selectedAnswer) {
        alert("Please select an answer before submitting!");
        return;
    }

    // Check if the selected answer is correct
    const correct = selectedAnswer.dataset.correct === 'true';
    // Set the status class based on whether the answer is correct or not
    setStatusClass(selectedAnswer.parentElement, correct);
    
    // Loop through all answers and display correct or wrong status
    Array.from(answerButtonsElement.children).forEach(answerDiv => {
        const radio = answerDiv.querySelector('input[type="radio"]');
        setStatusClass(answerDiv, radio.dataset.correct === 'true');
    });

    // Increment the score if the answer is correct
    if (correct) {
        score++;
    }

    // Hide the submit button and show the checkbox
    submitButton.classList.add('hide');
    submissionCheckbox.checked = true; // Check the box when the answer is submitted

    // Show the next button if there are more questions
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        // If no more questions, show the final score
        nextButton.classList.add('hide');
        showScore();
    }
}

// Function to set the status class for answers (correct or wrong)
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// Function to clear the status class from elements
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}