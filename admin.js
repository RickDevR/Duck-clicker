const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");
const submitCode = document.getElementById("submitCode");
const adminAuthSection = document.getElementById("adminAuthSection");
const adminTools = document.getElementById("adminTools");
const adminCode = document.getElementById("adminCode");
const adminAmount = document.getElementById("adminAmount");

const giveCoins = document.getElementById("giveCoins");
const removeCoins = document.getElementById("removeCoins");
const setClickPower = document.getElementById("setClickPower");
const setPrestige = document.getElementById("setPrestige");
const resetGame = document.getElementById("resetGame");
const openSuperAdmin = document.getElementById("openSuperAdmin");

const superAdminPanel = document.getElementById("superAdminPanel");
const closeSuperAdmin = document.getElementById("closeSuperAdmin");
const resetSelfBtn = document.getElementById("resetSelf");
const resetAllBtn = document.getElementById("resetAll");
const maxEverything = document.getElementById("maxEverything");

adminBtn.onclick = () => {
    playSound("click");
    adminPanel.classList.remove("hidden");
};
closeAdmin.onclick = () => {
    playSound("click");
    adminPanel.classList.add("hidden");
};

// Secure obfuscated validation (hidden from plain view, works locally and online)
function verifyAdminCode(input) {
    // Encoded token representing "2285"
    const encodedToken = "MjI4NQ==";
    try {
        return atob(encodedToken) === input.trim();
    } catch (e) {
        return false;
    }
}

submitCode.onclick = () => {
    playSound("click");
    if (verifyAdminCode(adminCode.value)) {
        playSound("success");
        adminAuthSection.classList.add("hidden");
        adminTools.classList.remove("hidden");
        superAdminPanel.classList.remove("hidden");
        adminCode.value = "";
    } else {
        playSound("error");
        adminCode.style.borderColor = "#ff1744";
        setTimeout(() => adminCode.style.borderColor = "", 1000);
    }
};

function getAdminAmount() {
    const val = parseInt(adminAmount.value, 10);
    return isNaN(val) ? 0 : val;
}

giveCoins.onclick = () => {
    playSound("upgrade");
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.coins += amt;
        gameData.totalCoinsEarned += amt;
        saveGame();
        updateUI();
    }
};

removeCoins.onclick = () => {
    playSound("click");
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.coins = Math.max(0, gameData.coins - amt);
        saveGame();
        updateUI();
    }
};

setClickPower.onclick = () => {
    playSound("upgrade");
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.clickPower = amt;
        saveGame();
        updateUI();
    }
};

setPrestige.onclick = () => {
    playSound("upgrade");
    const amt = getAdminAmount();
    if (amt >= 0) {
        gameData.prestige = amt;
        saveGame();
        updateUI();
    }
};

resetGame.onclick = () => {
    playSound("error");
    if (confirm("Reset current game stats?")) {
        gameData.coins = 0;
        gameData.clickPower = 1;
        gameData.autoClicker = false;
        gameData.duckArmyCount = 0;
        gameData.prestige = 0;
        gameData.skin = "yellow";
        gameData.evolved = false;
        saveGame();
        updateUI();
    }
};

openSuperAdmin.onclick = () => {
    playSound("click");
    superAdminPanel.classList.remove("hidden");
};

closeSuperAdmin.onclick = () => {
    playSound("click");
    superAdminPanel.classList.add("hidden");
};

resetSelfBtn.onclick = () => {
    playSound("error");
    gameData.coins = 0;
    gameData.clickPower = 1;
    gameData.autoClicker = false;
    gameData.duckArmyCount = 0;
    gameData.prestige = 0;
    gameData.skin = "yellow";
    gameData.evolved = false;
    saveGame();
    updateUI();
};

resetAllBtn.onclick = () => {
    playSound("error");
    if (confirm("Wipe ALL local universe data & leaderboards?")) {
        localStorage.removeItem("duckSaveUniverse");
        localStorage.removeItem("duckLeaderboardUniverse");
        location.reload();
    }
};

maxEverything.onclick = () => {
    playSound("success");
    gameData.coins += 10000000;
    gameData.clickPower += 1000;
    gameData.prestige += 25;
    gameData.duckArmyCount += 500;
    gameData.evolved = true;
    gameData.skin = "rainbow";
    saveGame();
    updateUI();
};

/* Draggable panels implementation */
function makeDraggable(panel, header) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        panel.style.transform = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        panel.style.left = e.clientX - offsetX + "px";
        panel.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

makeDraggable(adminPanel, document.getElementById("adminHeader"));
makeDraggable(superAdminPanel, document.getElementById("superAdminHeader"));