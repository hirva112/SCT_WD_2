document.addEventListener('DOMContentLoaded', () => {
    const timeDisplay = document.getElementById('time-display');
    const startStopButton = document.getElementById('start-stop-button');
    const resetButton = document.getElementById('reset-button');
    const lapButton = document.getElementById('lap-button');
    const lapsList = document.getElementById('laps-list');

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    startStopButton.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            startStopButton.textContent = 'Start';
        } else {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTime, 10);
            isRunning = true;
            startStopButton.textContent = 'Stop';
        }
    });

    resetButton.addEventListener('click', () => {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        timeDisplay.textContent = '00:00:00.00';
        lapsList.innerHTML = '';
        startStopButton.textContent = 'Start';
    });

    lapButton.addEventListener('click', () => {
        if (isRunning) {
            const lapTime = timeDisplay.textContent;
            const lapItem = document.createElement('li');
            lapItem.textContent = lapTime;
            lapsList.appendChild(lapItem);
        }
    });

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        const time = new Date(elapsedTime);
        const minutes = time.getUTCMinutes();
        const seconds = time.getUTCSeconds();
        const milliseconds = time.getUTCMilliseconds();

        timeDisplay.textContent = 
            `${String(minutes).padStart(2, '0')}:` +
            `${String(seconds).padStart(2, '0')}.` +
            `${String(Math.floor(milliseconds / 10)).padStart(2, '0')}`;
    }
});
