const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");
const submitCode = document.getElementById("submitCode");
const adminTools = document.getElementById("adminTools");
const adminCode = document.getElementById("adminCode");

const giveCoins = document.getElementById("giveCoins");
const removeCoins = document.getElementById("removeCoins");
const setClickPower = document.getElementById("setClickPower");
const resetGame = document.getElementById("resetGame");
const givePrestige = document.getElementById("givePrestige");

adminBtn.onclick = () => adminPanel.classList.remove("hidden");
closeAdmin.onclick = () => adminPanel.classList.add("hidden");

submitCode.onclick = () => {
    if (adminCode.value === "6355") {
        adminTools.classList.remove("hidden");
        adminCode.value = "";
    }
};

giveCoins.onclick = () => {
    gameData.coins += 10000;
    saveGame();
    updateUI();
};

removeCoins.onclick = () => {
    gameData.coins = Math.max(0, gameData.coins - 10000);
    saveGame();
    updateUI();
};

setClickPower.onclick = () => {
    gameData.clickPower = 10;
    saveGame();
    updateUI();
};

resetGame.onclick = () => {
    gameData = {
        coins: 0,
        clickPower: 1,
        autoClicker: false,
        prestige: 0,
        soundEnabled: true,
        skin: "yellow"
    };
    saveGame();
    updateUI();
};

givePrestige.onclick = () => {
    gameData.prestige += 1;
    saveGame();
    updateUI();
};

/* Draggable admin panel */
const adminHeader = document.getElementById("adminHeader");
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

adminHeader.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = adminPanel.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    adminPanel.style.left = e.clientX - offsetX + "px";
    adminPanel.style.top = e.clientY - offsetY + "px";
    adminPanel.style.transform = "translate(0, 0)";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
