const duck = document.getElementById("duck");
const moneyDisplay = document.getElementById("moneyDisplay");
const prestigeDisplay = document.getElementById("prestigeDisplay");

const shopBtn = document.getElementById("shopBtn");
const shop = document.getElementById("shop");
const closeShop = document.getElementById("closeShop");
const upgradeClick = document.getElementById("upgradeClick");
const upgradeClickBig = document.getElementById("upgradeClickBig");
const autoClick = document.getElementById("autoClick");
const autoClickFast = document.getElementById("autoClickFast");
const buySkinBlue = document.getElementById("buySkinBlue");
const buySkinRed = document.getElementById("buySkinRed");
const evolveDuckBtn = document.getElementById("evolveDuck");
const prestigeBtn = document.getElementById("prestigeBtn");

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");
const toggleSoundBtn = document.getElementById("toggleSound");
const dailyRewardBtn = document.getElementById("dailyReward");
const resetProgressBtn = document.getElementById("resetProgress");

const leaderboardPanel = document.getElementById("leaderboardPanel");
const closeLeaderboard = document.getElementById("closeLeaderboard");
const leaderboardList = document.getElementById("leaderboardList");
const saveScoreBtn = document.getElementById("saveScore");

const floatingTextContainer = document.getElementById("floatingTextContainer");
const particleContainer = document.getElementById("particleContainer");

let squishSound = new Audio("squish.wav");
squishSound.onerror = () => {
    squishSound = new Audio("squish.mp3");
};

function updateUI() {
    moneyDisplay.textContent = "Coins: " + gameData.coins;
    prestigeDisplay.textContent = "Prestige: " + gameData.prestige;
    applySkin();
    applyEvolution();
}

function applySkin() {
    if (gameData.skin === "yellow") {
        duck.style.background = "yellow";
        duck.style.boxShadow = "0 0 25px rgba(255, 255, 0, 0.5)";
    } else if (gameData.skin === "blue") {
        duck.style.background = "#4da6ff";
        duck.style.boxShadow = "0 0 25px rgba(77, 166, 255, 0.7)";
    } else if (gameData.skin === "red") {
        duck.style.background = "#ff4d4d";
        duck.style.boxShadow = "0 0 25px rgba(255, 77, 77, 0.7)";
    }
}

function applyEvolution() {
    if (gameData.evolved) {
        duck.style.transform = "scale(1.1)";
        duck.style.boxShadow = "0 0 35px rgba(255, 255, 255, 0.8)";
    } else {
        duck.style.transform = "scale(1)";
    }
}

function spawnFloatingText(text, x, y) {
    const el = document.createElement("div");
    el.className = "floatingText";
    el.textContent = text;
    el.style.left = x + "px";
    el.style.top = y + "px";
    floatingTextContainer.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

function spawnParticles(x, y) {
    for (let i = 0; i < 6; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = x + "px";
        p.style.top = y + "px";
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

duck.onclick = (e) => {
    let gain = gameData.clickPower * (1 + gameData.prestige);
    gameData.coins += gain;

    if (gameData.soundEnabled) {
        squishSound.currentTime = 0;
        squishSound.play();
    }

    spawnFloatingText("+" + gain, e.clientX, e.clientY);
    spawnParticles(e.clientX, e.clientY);
    saveGame();
    updateUI();
};

shopBtn.onclick = () => shop.classList.remove("hidden");
closeShop.onclick = () => shop.classList.add("hidden");

upgradeClick.onclick = () => {
    if (gameData.coins >= 50) {
        gameData.coins -= 50;
        gameData.clickPower += 1;
        saveGame();
        updateUI();
    }
};

upgradeClickBig.onclick = () => {
    if (gameData.coins >= 200) {
        gameData.coins -= 200;
        gameData.clickPower += 5;
        saveGame();
        updateUI();
    }
};

autoClick.onclick = () => {
    if (!gameData.autoClicker && gameData.coins >= 300) {
        gameData.coins -= 300;
        gameData.autoClicker = true;
        gameData.autoClickSpeed = 1000;
        saveGame();
        updateUI();
    }
};

autoClickFast.onclick = () => {
    if (gameData.autoClicker && gameData.coins >= 1000) {
        gameData.coins -= 1000;
        gameData.autoClickSpeed = 400;
        saveGame();
        updateUI();
    }
};

buySkinBlue.onclick = () => {
    if (gameData.coins >= 500) {
        gameData.coins -= 500;
        gameData.skin = "blue";
        saveGame();
        updateUI();
    }
};

buySkinRed.onclick = () => {
    if (gameData.coins >= 1000) {
        gameData.coins -= 1000;
        gameData.skin = "red";
        saveGame();
        updateUI();
    }
};

evolveDuckBtn.onclick = () => {
    if (!gameData.evolved && gameData.coins >= 3000) {
        gameData.coins -= 3000;
        gameData.evolved = true;
        saveGame();
        updateUI();
    }
};

prestigeBtn.onclick = () => {
    if (gameData.coins >= 5000) {
        gameData.coins = 0;
        gameData.clickPower = 1;
        gameData.autoClicker = false;
        gameData.autoClickSpeed = 1000;
        gameData.prestige += 1;
        saveGame();
        updateUI();
    }
};

setInterval(() => {
    if (gameData.autoClicker) {
        gameData.coins += 1 * (1 + gameData.prestige);
        saveGame();
        updateUI();
    }
}, 200);

/* Settings */
settingsBtn.onclick = () => settingsPanel.classList.remove("hidden");
closeSettings.onclick = () => settingsPanel.classList.add("hidden");

toggleSoundBtn.onclick = () => {
    gameData.soundEnabled = !gameData.soundEnabled;
    saveGame();
};

dailyRewardBtn.onclick = () => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    if (now - gameData.lastDailyReward >= oneDay) {
        gameData.coins += 500;
        gameData.lastDailyReward = now;
        saveGame();
        updateUI();
        alert("Daily reward claimed: +500 coins!");
    } else {
        alert("You already claimed your daily reward.");
    }
};

resetProgressBtn.onclick = () => {
    gameData = {
        coins: 0,
        clickPower: 1,
        autoClicker: false,
        autoClickSpeed: 1000,
        prestige: 0,
        soundEnabled: true,
        skin: "yellow",
        evolved: false,
        lastDailyReward: 0
    };
    saveGame();
    updateUI();
};

/* Leaderboard (local only) */
function loadLeaderboard() {
    let data = localStorage.getItem("duckLeaderboard");
    if (!data) {
        leaderboardList.innerHTML = "No scores yet.";
        return;
    }
    let scores = JSON.parse(data);
    leaderboardList.innerHTML = "";
    scores.forEach((s, i) => {
        const div = document.createElement("div");
        div.textContent = `${i + 1}. Coins: ${s.coins}, Prestige: ${s.prestige}`;
        leaderboardList.appendChild(div);
    });
}

function saveLeaderboardEntry() {
    let data = localStorage.getItem("duckLeaderboard");
    let scores = data ? JSON.parse(data) : [];
    scores.push({ coins: gameData.coins, prestige: gameData.prestige });
    scores.sort((a, b) => b.coins - a.coins);
    scores = scores.slice(0, 10);
    localStorage.setItem("duckLeaderboard", JSON.stringify(scores));
    loadLeaderboard();
}

saveScoreBtn.onclick = () => saveLeaderboardEntry();

moneyDisplay.onclick = () => {
    leaderboardPanel.classList.remove("hidden");
    loadLeaderboard();
};

closeLeaderboard.onclick = () => leaderboardPanel.classList.add("hidden");

updateUI();
loadLeaderboard();
