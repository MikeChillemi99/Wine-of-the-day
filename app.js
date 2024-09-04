// Timer countdown
function startCountdown() {
    const countdownElement = document.getElementById("countdown");

    function updateCountdown() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Calcule du temps restant
        const hoursLeft = 23 - hours;
        const minutesLeft = 59 - minutes;
        const secondsLeft = 59 - seconds;

        countdownElement.innerHTML = 
        `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
    }

    // Mise à jour du décompte chaque secondes
    setInterval(updateCountdown, 0);
}

window.onload = startCountdown;