let gameData = {
    userId: null,
    username: "",
    isOwner: false,
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

function generateUUID() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
}

function saveGame() {
    if (!gameData.userId) {
        gameData.userId = generateUUID();
    }
    localStorage.setItem("duckSaveUniverse", JSON.stringify(gameData));
    if (window.syncToDatabase) {
        window.syncToDatabase();
    }
}

function loadGame() {
    let data = localStorage.getItem("duckSaveUniverse");
    if (data) {
        try {
            const parsed = JSON.parse(data);
            gameData = Object.assign(gameData, parsed);
        } catch (e) {}
    }
    if (!gameData.userId) {
        gameData.userId = generateUUID();
    }
}

loadGame();