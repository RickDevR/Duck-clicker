let gameData = {
    coins: 0,
    clickPower: 1,
    autoClicker: false,
    prestige: 0,
    soundEnabled: true,
    skin: "yellow",
    evolved: false,
    lastDailyReward: 0
};

function saveGame() {
    localStorage.setItem("duckSave", JSON.stringify(gameData));
}

function loadGame() {
    let data = localStorage.getItem("duckSave");
    if (!data) return;
    try {
        const parsed = JSON.parse(data);
        if (typeof parsed.coins !== "number" || parsed.coins < 0) parsed.coins = 0;
        if (typeof parsed.clickPower !== "number" || parsed.clickPower < 1) parsed.clickPower = 1;
        gameData = Object.assign(gameData, parsed);
    } catch {
        // If something is broken, reset
        gameData.coins = 0;
        gameData.clickPower = 1;
    }
}

loadGame();
