const messageForm = document.querySelector(".send-message");
const BOT_CHECK_INTERVAL = 2 * 60 * 1000;

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(messageForm);
    const message = formData.get("message");

    const lastPassed = localStorage.getItem("lastBotCheck") || 0;
    const now = Date.now();


    if (now - lastPassed > BOT_CHECK_INTERVAL) {

        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const answer = prompt(`Bot check: What is ${num1} + ${num2}?`);

        if (answer === null) {
            alert("Message canceled.");
            return;
        }

        if (parseInt(answer) !== num1 + num2) {
            alert("Wrong answer! Please try again.");
            return;
        }

        localStorage.setItem("lastBotCheck", Date.now());
    }

   
    sendMessage(message);
});