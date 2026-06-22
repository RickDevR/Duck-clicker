const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");
const submitCode = document.getElementById("submitCode");
const adminTools = document.getElementById("adminTools");
const adminCode = document.getElementById("adminCode");
const adminAmount = document.getElementById("adminAmount");

const giveCoins = document.getElementById("giveCoins");
const removeCoins = document.getElementById("removeCoins");
const setClickPower = document.getElementById("setClickPower");
const resetGame = document.getElementById("resetGame");
const openSuperAdmin = document.getElementById("openSuperAdmin");

const superAdminPanel = document.getElementById("superAdminPanel");
const closeSuperAdmin = document.getElementById("closeSuperAdmin");
const resetSelfBtn = document.getElementById("resetSelf");
const resetAllBtn = document.getElementById("resetAll");

adminBtn.onclick = () => adminPanel.classList.remove("hidden");
closeAdmin.onclick = () => adminPanel.classList.add("hidden");

submitCode.onclick = () => {
    if (adminCode.value === "6355") {
        adminTools.classList.remove("hidden");
        adminCode.value = "";
    } else if (adminCode.value === "1064") {
        superAdminPanel.classList.remove("hidden");
        adminCode.value = "";
    }
};

function getAdminAmount() {
    const val = parseInt(adminAmount.value, 10);
    return isNaN(val) ? 0 : val;
}

giveCoins.onclick = () => {
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.coins += amt;
        saveGame();
        updateUI();
    }
};

removeCoins.onclick = () => {
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.coins = Math.max(0, gameData.coins - amt);
        saveGame();
        updateUI();
    }
};

setClickPower.onclick = () => {
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.clickPower = amt;
        saveGame();
        updateUI();
    }
};

resetGame.onclick = () => {
    gameData = {
        coins: 0,
        clickPower: 1,
        autoClicker: false,
        prestige: 0,
        soundEnabled: true,
        skin: "yellow",
        evolved: false,
        lastDailyReward: 0
    };
    saveGame();
    updateUI();
};

openSuperAdmin.onclick = () => {
    superAdminPanel.classList.remove("hidden");
};

closeSuperAdmin.onclick = () => {
    superAdminPanel.classList.add("hidden");
};

resetSelfBtn.onclick = () => {
    gameData = {
        coins: 0,
        clickPower: 1,
        autoClicker: false,
        prestige: 0,
        soundEnabled: true,
        skin: "yellow",
        evolved: false,
        lastDailyReward: 0
    };
    saveGame();
    updateUI();
};

resetAllBtn.onclick = () => {
    // This only affects this browser/device
    localStorage.removeItem("duckSave");
    localStorage.removeItem("duckLeaderboard");
    gameData = {
        coins: 0,
        clickPower: 1,
        autoClicker: false,
        prestige: 0,
        soundEnabled: true,
        skin: "yellow",
        evolved: false,
        lastDailyReward: 0
    };
    saveGame();
    updateUI();
};

/* Draggable panels */
function makeDraggable(panel, header) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        panel.style.left = e.clientX - offsetX + "px";
        panel.style.top = e.clientY - offsetY + "px";
        panel.style.transform = "translate(0, 0)";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

const adminHeader = document.getElementById("adminHeader");
const superAdminHeader = document.getElementById("superAdminHeader");

makeDraggable(adminPanel, adminHeader);
makeDraggable(superAdminPanel, superAdminHeader);
