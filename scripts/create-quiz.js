document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const quizTitle = document.getElementById('quiz-title').value;
    const questions = []; // Collect questions and answers here from the form inputs

    if (quizTitle && questions.length > 0) {
        const customQuiz = {
            title: quizTitle,
            questions: questions,
        };

        let customQuizzes = JSON.parse(localStorage.getItem('customQuizzes')) || [];
        customQuizzes.push(customQuiz);
        localStorage.setItem('customQuizzes', JSON.stringify(customQuizzes));
        alert('Quiz saved successfully!');
    } else {
        alert('Please fill out all fields.');
    }
});
