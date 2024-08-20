document.addEventListener('DOMContentLoaded', () => {
    const quizCards = document.querySelectorAll('a[href*="quiz.html"]');
    
    quizCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log(`Quiz Selected: ${card.href}`);
        });
    });
    
    // Additional functionality can be added here for the index page
});
