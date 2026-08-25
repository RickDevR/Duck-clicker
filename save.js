let gameData = {
    coins: 0,
    totalCoinsEarned: 0,
    totalClicks: 0,
    clickPower: 1,
    autoClicker: false,
    autoClickSpeed: 1000,
    duckArmyCount: 0,
    prestige: 0,
    soundEnabled: true,
    particlesEnabled: true,
    skin: "yellow",
    evolved: false,
    lastDailyReward: 0,
    unlockedAchievements: []
};

function saveGame() {
    localStorage.setItem("duckSaveUniverse", JSON.stringify(gameData));
}

function loadGame() {
    let data = localStorage.getItem("duckSaveUniverse");
    if (!data) return;
    try {
        const parsed = JSON.parse(data);
        if (typeof parsed.coins !== "number" || parsed.coins < 0) parsed.coins = 0;
        if (typeof parsed.clickPower !== "number" || parsed.clickPower < 1) parsed.clickPower = 1;
        gameData = Object.assign(gameData, parsed);
    } catch {
        gameData.coins = 0;
        gameData.clickPower = 1;
    }
}

loadGame();