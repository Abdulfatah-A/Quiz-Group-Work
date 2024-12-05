// Array of questions, each question is an object with the question text and an array of answer objects
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
    // More questions here...
];

// Grabbing necessary DOM elements by their IDs
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const submissionCheckbox = document.getElementById('submissionCheckbox');
const timerElement = document.getElementById('time-left');

// Variables to keep track of the quiz state
let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 30; // Initial time for each question
let timerInterval; // Variable to store the timer interval

// Function to start the quiz
function startQuiz() {
    // Show the submit button and hide the next button and score container
    submitButton.classList.remove('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    
    // Shuffle the questions array and set the starting index and score
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    // Make the question container visible and load the first question
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

// Function to load the next question
function setNextQuestion() {
    // Reset the state to clear previous question and answers
    resetState();
    // Display the current question
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Function to display the question and its answers
function showQuestion(question) {
    // Set the question text
    questionElement.innerText = question.question;
    
    // Loop through each answer and create a radio button for it
    question.answers.forEach(answer => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = answer.text;
        radio.id = answer.text;

        // If the answer is correct, add a custom data attribute
        if (answer.correct) {
            radio.dataset.correct = answer.correct;
        }

        const label = document.createElement('label');
        label.htmlFor = answer.text;
        label.innerText = answer.text;

        // Append radio button and label to the answerDiv
        answerDiv.appendChild(radio);
        answerDiv.appendChild(label);

        // Add the answerDiv to the answer buttons container
        answerButtonsElement.appendChild(answerDiv);
    });
    // Start the timer for the current question
    startTimer();
}

// Function to reset the state for the next question
function resetState() {
    // Hide the next button and uncheck the checkbox
    nextButton.classList.add('hide');
    submissionCheckbox.checked = false;

    // Clear any previous timer
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
