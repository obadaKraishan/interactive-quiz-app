document.addEventListener('DOMContentLoaded', () => {
    const leaderboard = document.getElementById('leaderboard');
    const userScores = JSON.parse(localStorage.getItem('userScores')) || {};

    leaderboard.innerHTML = '';
    for (const quiz in userScores) {
        const scoreItem = document.createElement('div');
        scoreItem.textContent = `${quiz}: ${userScores[quiz]}`;
        leaderboard.appendChild(scoreItem);
    }
});
