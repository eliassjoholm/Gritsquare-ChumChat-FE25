function darkMode() {
    const darkmodeButton = document.querySelector('#darkmodeButton');
    const main = document.querySelector('#main');

    if (!darkmodeButton || !main) {
        console.error("Element saknas i DOM");
        return;
    }

    darkmodeButton.addEventListener('click', () => {
        main.classList.toggle("dark-mode");
    });
}

// Kör funktionen när skriptet laddas
darkMode();