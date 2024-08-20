let currentQuestionIndex = 0;
let score = 0;
let selectedQuiz = [];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const quizTitle = document.getElementById('quiz-title');

// Determine which quiz to load based on URL parameter
const queryParams = new URLSearchParams(window.location.search);
const quizType = queryParams.get('quiz');

// Load the appropriate quiz data
if (quizType === 'general-knowledge') {
    quizTitle.textContent = "General Knowledge Quiz";
    selectedQuiz = generalKnowledgeQuiz;
} else if (quizType === 'science') {
    quizTitle.textContent = "Science Quiz";
    selectedQuiz = scienceQuiz;
} else if (quizType === 'history') {
    quizTitle.textContent = "History Quiz";
    selectedQuiz = historyQuiz;
} else {
    quizTitle.textContent = "Quiz Not Found";
}

function loadQuestion() {
    feedbackElement.textContent = '';
    const currentQuestion = selectedQuiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('bg-gray-200', 'text-gray-900', 'px-4', 'py-2', 'rounded', 'hover:bg-gray-300', 'w-full');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersElement.appendChild(button);
    });
    
    nextButton.classList.add('hidden');
}

function checkAnswer(answer) {
    const currentQuestion = selectedQuiz[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
        score++;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.remove('text-red-500');
        feedbackElement.classList.add('text-green-500');
    } else {
        feedbackElement.textContent = `Wrong! The correct answer is ${currentQuestion.correct}.`;
        feedbackElement.classList.remove('text-green-500');
        feedbackElement.classList.add('text-red-500');
    }
    
    if (currentQuestionIndex < selectedQuiz.length - 1) {
        nextButton.classList.remove('hidden');
    } else {
        restartButton.classList.remove('hidden');
        feedbackElement.textContent += ` Your final score is ${score}/${selectedQuiz.length}.`;
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    restartButton.classList.add('hidden');
});

function initQuiz() {
    if (selectedQuiz.length > 0) {
        loadQuestion();
    } else {
        questionElement.textContent = "No questions available for this quiz.";
        answersElement.innerHTML = '';
    }
}

initQuiz();
