let currentQuestionIndex = 0;
let score = 0;
let selectedQuiz = [];
let timerInterval;
let timeLeft = 30;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const homeButton = document.getElementById('home-button');
const shareButton = document.getElementById('share-button');
const quizTitle = document.getElementById('quiz-title');
const progressElement = document.getElementById('progress');
const currentQuestionNumberElement = document.getElementById('current-question-number');
const totalQuestionsElement = document.getElementById('total-questions');
const timerElement = document.getElementById('timer');
const timeLeftElement = document.getElementById('time-left');

const correctSound = new Audio('sounds/correct.mp3');
const incorrectSound = new Audio('sounds/wrong.mp3');
const timerSound = new Audio('sounds/timer.mp3');

const queryParams = new URLSearchParams(window.location.search);
const quizType = queryParams.get('quiz');

const userScores = JSON.parse(localStorage.getItem('userScores')) || {};

if (quizType === 'general-knowledge') {
    quizTitle.textContent = "General Knowledge Quiz";
    selectedQuiz = generalKnowledgeQuiz;
} else if (quizType === 'science') {
    quizTitle.textContent = "Science Quiz";
    selectedQuiz = scienceQuiz;
} else if (quizType === 'history') {
    quizTitle.textContent = "History Quiz";
    selectedQuiz = historyQuiz;
} else if (quizType === 'geography') {
    quizTitle.textContent = "Geography Quiz";
    selectedQuiz = geographyQuiz;
} else if (quizType === 'math') {
    quizTitle.textContent = "Math Quiz";
    selectedQuiz = mathQuiz;
} else if (quizType === 'literature') {
    quizTitle.textContent = "Literature Quiz";
    selectedQuiz = literatureQuiz;
} else if (quizType === 'technology') {
    quizTitle.textContent = "Technology Quiz";
    selectedQuiz = technologyQuiz;
} else if (quizType === 'sports') {
    quizTitle.textContent = "Sports Quiz";
    selectedQuiz = sportsQuiz;
} else if (quizType === 'music') {
    quizTitle.textContent = "Music Quiz";
    selectedQuiz = musicQuiz;
} else {
    quizTitle.textContent = "Quiz Not Found";
}

totalQuestionsElement.textContent = selectedQuiz.length;

function startTimer() {
    timeLeft = 30;
    timeLeftElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedbackElement.textContent = `Time's up! The correct answer was ${selectedQuiz[currentQuestionIndex].correct}.`;
            feedbackElement.classList.add('text-red-500');
            incorrectSound.play();
            if (currentQuestionIndex < selectedQuiz.length - 1) {
                nextButton.classList.remove('hidden');
            } else {
                restartButton.classList.remove('hidden');
                homeButton.classList.remove('hidden');
                shareButton.classList.remove('hidden');
                feedbackElement.textContent += ` Your final score is ${score}/${selectedQuiz.length}.`;
                updateScore(quizType, score);
            }
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timerInterval);
    startTimer();
    feedbackElement.textContent = '';
    const currentQuestion = selectedQuiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';

    currentQuestionNumberElement.textContent = currentQuestionIndex + 1;

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
    clearInterval(timerInterval);
    const currentQuestion = selectedQuiz[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
        score++;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.classList.add('text-green-500');
        correctSound.play();
    } else {
        feedbackElement.textContent = `Wrong! The correct answer is ${currentQuestion.correct}.`;
        feedbackElement.classList.add('text-red-500');
        incorrectSound.play();
    }

    if (currentQuestionIndex < selectedQuiz.length - 1) {
        nextButton.classList.remove('hidden');
    } else {
        restartButton.classList.remove('hidden');
        homeButton.classList.remove('hidden');
        shareButton.classList.remove('hidden');
        feedbackElement.textContent += ` Your final score is ${score}/${selectedQuiz.length}.`;
        updateScore(quizType, score);
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
    homeButton.classList.add('hidden');
    shareButton.classList.add('hidden');
});

homeButton.addEventListener('click', () => {
    window.location.href = "index.html";
});

shareButton.addEventListener('click', () => {
    const shareText = `I scored ${score} on the ${quizTitle.textContent}! Try it out: ${window.location.href}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
});

function updateScore(quizName, score) {
    if (!userScores[quizName] || score > userScores[quizName]) {
        userScores[quizName] = score;
        localStorage.setItem('userScores', JSON.stringify(userScores));
    }
}

function initQuiz() {
    if (selectedQuiz.length > 0) {
        loadQuestion();
    } else {
        questionElement.textContent = "No questions available for this quiz.";
        answersElement.innerHTML = '';
    }
}

initQuiz();
