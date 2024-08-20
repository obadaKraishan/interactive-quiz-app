const quizData = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "What is the capital of Spain?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Madrid"
    },
    {
        question: "What is the capital of Germany?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Berlin"
    },
    {
        question: "What is the capital of Portugal?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Lisbon"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');

function loadQuestion() {
    feedbackElement.textContent = '';
    const currentQuestion = quizData[currentQuestionIndex];
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
    const currentQuestion = quizData[currentQuestionIndex];
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
    
    if (currentQuestionIndex < quizData.length - 1) {
        nextButton.classList.remove('hidden');
    } else {
        restartButton.classList.remove('hidden');
        feedbackElement.textContent += ` Your final score is ${score}/${quizData.length}.`;
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

loadQuestion();
