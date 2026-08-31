const adminPortalBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");
const adminTools = document.getElementById("adminTools");
const adminAmount = document.getElementById("adminAmount");
const adminUserList = document.getElementById("adminUserList");

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

if (adminPortalBtn) {
    adminPortalBtn.onclick = () => {
        playSound("click");
        adminPanel.classList.remove("hidden");
        renderAdminUserList();
    };
}

closeAdmin.onclick = () => {
    playSound("click");
    adminPanel.classList.add("hidden");
};

window.renderAdminUserList = function() {
    if (!adminUserList) return;
    adminUserList.innerHTML = "";
    const users = window.allGlobalUsers || {};
    Object.keys(users).forEach(id => {
        const u = users[id];
        const div = document.createElement("div");
        div.className = "achievement-card";
        div.style.flexDirection = "column";
        div.style.alignItems = "flex-start";
        div.style.gap = "6px";
        
        div.innerHTML = `
            <div><strong>${u.username || 'Player'}</strong> ${u.isOwner ? '<span class="owner-tag">OWNER</span>' : ''}</div>
            <small>Coins: ${u.coins || 0} | Prestige: ${u.prestige || 0}</small>
            <div style="display:flex; gap:4px; width:100%; margin-top:4px;">
                <button onclick="adminGiveUserCoins('${id}')" style="padding:4px 8px; font-size:11px;">+Coins</button>
                <button onclick="adminRenameUser('${id}')" style="padding:4px 8px; font-size:11px;">Rename</button>
                <button onclick="adminToggleOwner('${id}', ${!u.isOwner})" style="padding:4px 8px; font-size:11px;">${u.isOwner ? 'Remove Owner' : 'Give Owner'}</button>
            </div>
        `;
        adminUserList.appendChild(div);
    });
};

window.adminGiveUserCoins = function(targetId) {
    const amt = parseInt(prompt("Coins to give/take (negative to remove):", "1000"), 10);
    if (!isNaN(amt)) {
        firebase.database().ref("users/" + targetId + "/coins").transaction(c => Math.max(0, (c || 0) + amt));
    }
};

window.adminRenameUser = function(targetId) {
    const newName = prompt("New display name:");
    if (newName && newName.trim().length >= 2) {
        firebase.database().ref("users/" + targetId + "/username").set(newName.trim());
    }
};

window.adminToggleOwner = function(targetId, newStatus) {
    firebase.database().ref("users/" + targetId + "/isOwner").set(newStatus);
};

function getAdminAmount() {
    const val = parseInt(adminAmount.value, 10);
    return isNaN(val) ? 0 : val;
}

giveCoins.onclick = () => {
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.coins += amt; gameData.totalCoinsEarned += amt;
        saveGame(); updateUI(); playSound("upgrade");
    }
};

removeCoins.onclick = () => {
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.coins = Math.max(0, gameData.coins - amt);
        saveGame(); updateUI(); playSound("click");
    }
};

setClickPower.onclick = () => {
    const amt = getAdminAmount();
    if (amt > 0) {
        gameData.clickPower = amt;
        saveGame(); updateUI(); playSound("upgrade");
    }
};

setPrestige.onclick = () => {
    const amt = getAdminAmount();
    if (amt >= 0) {
        gameData.prestige = amt;
        saveGame(); updateUI(); playSound("upgrade");
    }
};

resetGame.onclick = () => {
    if (confirm("Reset current game stats?")) {
        gameData.coins = 0; gameData.clickPower = 1; gameData.autoClicker = false;
        gameData.duckArmyCount = 0; gameData.prestige = 0; gameData.skin = "yellow";
        gameData.evolved = false; saveGame(); updateUI();
    }
};

openSuperAdmin.onclick = () => { superAdminPanel.classList.remove("hidden"); };
closeSuperAdmin.onclick = () => { superAdminPanel.classList.add("hidden"); };

resetSelfBtn.onclick = () => {
    gameData.coins = 0; gameData.clickPower = 1; gameData.autoClicker = false;
    gameData.duckArmyCount = 0; gameData.prestige = 0; gameData.skin = "yellow";
    gameData.evolved = false; saveGame(); updateUI();
};

resetAllBtn.onclick = () => {
    if (confirm("Wipe ALL local universe data & leaderboards?")) {
        localStorage.removeItem("duckSaveUniverse");
        location.reload();
    }
};

maxEverything.onclick = () => {
    gameData.coins += 10000000; gameData.clickPower += 1000; gameData.prestige += 25;
    gameData.duckArmyCount += 500; gameData.evolved = true; gameData.skin = "rainbow";
    saveGame(); updateUI(); playSound("success");
};

function makeDraggable(panel, header) {
    let isDragging = false, offsetX = 0, offsetY = 0;
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
    document.addEventListener("mouseup", () => isDragging = false);
}

makeDraggable(adminPanel, document.getElementById("adminHeader"));
makeDraggable(superAdminPanel, document.getElementById("superAdminHeader"));