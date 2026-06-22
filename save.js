let gameData = {
    coins: 0,
    clickPower: 1,
    autoClicker: false,
    prestige: 0,
    soundEnabled: true,
    skin: "yellow"
};

function saveGame() {
    localStorage.setItem("duckSave", JSON.stringify(gameData));
}

function loadGame() {
    let data = localStorage.getItem("duckSave");
    if (data) gameData = JSON.parse(data);
}

loadGame();
