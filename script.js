const sampleText = "The quick brown fox jumps over the lazy dog.";
const typingArea = document.getElementById("typing-area");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resetButton = document.getElementById("reset-button");

let startTime, endTime, timerInterval;

// Display sample text
document.getElementById("sample-text").textContent = sampleText;

// Start timer when user starts typing
typingArea.addEventListener("input", () => {
    if (!startTime) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }
    checkAccuracy();
});

// Reset everything
resetButton.addEventListener("click", () => {
    typingArea.value = "";
    clearInterval(timerInterval);
    startTime = null;
    timerElement.textContent = "0";
    speedElement.textContent = "0";
    accuracyElement.textContent = "100";
});

function updateTimer() {
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    timerElement.textContent = timeElapsed;
}

function checkAccuracy() {
    const typedText = typingArea.value;
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === sampleText[i]) {
            correctChars++;
        }
    }
    const accuracy = (correctChars / typedText.length) * 100 || 100;
    accuracyElement.textContent = accuracy.toFixed(2);

    // Calculate typing speed (WPM)
    const wordsTyped = typedText.split(" ").length;
    const timeInMinutes = (new Date() - startTime) / 60000;
    const speed = Math.floor(wordsTyped / timeInMinutes);
    speedElement.textContent = speed;
}