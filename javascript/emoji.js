document.addEventListener("DOMContentLoaded", () => {
    const emojiSelect = document.getElementById("emoji-select");
    const messageInput = document.querySelector(".message-area");

    if (emojiSelect && messageInput) {
        emojiSelect.addEventListener("change", () => {
       
            messageInput.value += emojiSelect.value;

           
            messageInput.focus();

            
            emojiSelect.selectedIndex = 0;
        });
    }
});