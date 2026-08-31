// FIREBASE REALTIME DATABASE INITIALIZATION
const firebaseConfig = {
    apiKey: "AIzaSyDS9A2CqtnY3-2vv9KmNDPUl5sXifxrmYM",
    authDomain: "sleek-chat-app-47b2a.firebaseapp.com",
    projectId: "sleek-chat-app-47b2a",
    storageBucket: "sleek-chat-app-47b2a.firebasestorage.app",
    messagingSenderId: "830967591682",
    appId: "1:830967591682:web:5d7038480abeadbd64081b",
    databaseURL: "https://sleek-chat-app-47b2a-default-rtdb.firebaseio.com"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// DOM Elements
const duck = document.getElementById("duck");
const moneyDisplay = document.getElementById("moneyDisplay");
const cpsDisplay = document.getElementById("cpsDisplay");
const clickPowerDisplay = document.getElementById("clickPowerDisplay");
const prestigeDisplay = document.getElementById("prestigeDisplay");
const comboDisplay = document.getElementById("comboDisplay");

const usernameModal = document.getElementById("usernameModal");
const usernameInput = document.getElementById("usernameInput");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");
const currentUsernameText = document.getElementById("currentUsernameText");
const ownerTagHeader = document.getElementById("ownerTagHeader");
const changeUsernameBtn = document.getElementById("changeUsernameBtn");

const shopBtn = document.getElementById("shopBtn");
const shop = document.getElementById("shop");
const closeShop = document.getElementById("closeShop");
const upgradeClick = document.getElementById("upgradeClick");
const upgradeClickBig = document.getElementById("upgradeClickBig");
const upgradeClickMega = document.getElementById("upgradeClickMega");
const upgradeClickGod = document.getElementById("upgradeClickGod");
const autoClick = document.getElementById("autoClick");
const autoClickFast = document.getElementById("autoClickFast");
const autoClickHyper = document.getElementById("autoClickHyper");
const buyDuckArmy = document.getElementById("buyDuckArmy");
const buySkinBlue = document.getElementById("buySkinBlue");
const buySkinRed = document.getElementById("buySkinRed");
const buySkinGold = document.getElementById("buySkinGold");
const buySkinRainbow = document.getElementById("buySkinRainbow");
const evolveDuckBtn = document.getElementById("evolveDuck");
const prestigeBtn = document.getElementById("prestigeBtn");

const statsBtn = document.getElementById("statsBtn");
const statsPanel = document.getElementById("statsPanel");
const closeStats = document.getElementById("closeStats");
const statsContentList = document.getElementById("statsContentList");

const achievementsBtn = document.getElementById("achievementsBtn");
const achievementsPanel = document.getElementById("achievementsPanel");
const closeAchievements = document.getElementById("closeAchievements");
const achievementListContainer = document.getElementById("achievementListContainer");

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");
const toggleSoundBtn = document.getElementById("toggleSound");
const toggleParticlesBtn = document.getElementById("toggleParticles");
const dailyRewardBtn = document.getElementById("dailyReward");
const resetProgressBtn = document.getElementById("resetProgress");

const leaderboardBtn = document.getElementById("leaderboardBtn");
const leaderboardPanel = document.getElementById("leaderboardPanel");
const closeLeaderboard = document.getElementById("closeLeaderboard");
const leaderboardList = document.getElementById("leaderboardList");
const tabMoney = document.getElementById("tabMoney");
const tabXP = document.getElementById("tabXP");

const transferBtn = document.getElementById("transferBtn");
const transferPanel = document.getElementById("transferPanel");
const closeTransfer = document.getElementById("closeTransfer");
const transferUserList = document.getElementById("transferUserList");
const transferForm = document.getElementById("transferForm");
const selectedRecipientName = document.getElementById("selectedRecipientName");
const transferAmount = document.getElementById("transferAmount");
const sendCoinsBtn = document.getElementById("sendCoinsBtn");
const sendPrestigeBtn = document.getElementById("sendPrestigeBtn");

const chatBtn = document.getElementById("chatBtn");
const chatPanel = document.getElementById("chatPanel");
const closeChat = document.getElementById("closeChat");
const chatBox = document.getElementById("chatBox");
const chatMessageInput = document.getElementById("chatMessageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const adminNavBtn = document.getElementById("adminBtn");

const floatingTextContainer = document.getElementById("floatingTextContainer");
const particleContainer = document.getElementById("particleContainer");
const ambientFeatherContainer = document.getElementById("ambientFeatherContainer");

let currentSelectedRecipientId = null;
let activeLeaderboardTab = "money";
window.allGlobalUsers = {};

/* --- AUDIO SYNTHESIZER --- */
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playSound(type) {
    if (!gameData.soundEnabled) return;
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "squish") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(580, now + 0.14);
            gain.gain.setValueAtTime(0.45, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
            osc.start(now); osc.stop(now + 0.18);
        } else if (type === "click") {
            osc.type = "triangle";
            osc.frequency.setValueAtTime(700, now);
            osc.frequency.exponentialRampToValueAtTime(350, now + 0.06);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
            osc.start(now); osc.stop(now + 0.06);
        } else if (type === "upgrade" || type === "success") {
            osc.type = "sine";
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(880, now + 0.15);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
        } else if (type === "error") {
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(130, now);
            osc.frequency.setValueAtTime(90, now + 0.15);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now); osc.stop(now + 0.25);
        }
    } catch (e) {}
}

/* --- AMBIENT FEATHERS --- */
setInterval(() => {
    if (!gameData.particlesEnabled || !ambientFeatherContainer) return;
    const feather = document.createElement("div");
    feather.className = "ambient-feather";
    feather.style.left = Math.random() * window.innerWidth + "px";
    feather.style.animationDuration = (8 + Math.random() * 8) + "s";
    ambientFeatherContainer.appendChild(feather);
    setTimeout(() => feather.remove(), 15000);
}, 2500);

/* --- FIREBASE SYNC & USER MANAGEMENT --- */
window.syncToDatabase = function() {
    if (!gameData.userId) return;
    db.ref("users/" + gameData.userId).update({
        username: gameData.username || "DuckPlayer",
        coins: Math.floor(gameData.coins),
        prestige: gameData.prestige,
        clickPower: gameData.clickPower,
        totalCoinsEarned: Math.floor(gameData.totalCoinsEarned),
        lastSeen: Date.now()
    });
};

function checkUsernameState() {
    if (!gameData.username || gameData.username.trim() === "") {
        usernameModal.classList.remove("hidden");
    } else {
        usernameModal.classList.add("hidden");
        currentUsernameText.textContent = gameData.username;
        window.syncToDatabase();
    }
}

saveUsernameBtn.onclick = () => {
    const name = usernameInput.value.trim();
    if (name.length >= 2) {
        gameData.username = name;
        saveGame();
        checkUsernameState();
        playSound("success");
    } else {
        playSound("error");
        alert("Please enter at least 2 characters!");
    }
};

changeUsernameBtn.onclick = () => {
    playSound("click");
    usernameInput.value = gameData.username || "";
    usernameModal.classList.remove("hidden");
    settingsPanel.classList.add("hidden");
};

db.ref("users/" + gameData.userId).on("value", snapshot => {
    const val = snapshot.val();
    if (val) {
        if (val.isOwner !== undefined) {
            gameData.isOwner = val.isOwner;
        }
        if (val.username && val.username !== gameData.username) {
            gameData.username = val.username;
        }
        saveGame();
        updateUI();
    }
});

db.ref("users").on("value", snapshot => {
    window.allGlobalUsers = snapshot.val() || {};
    renderLeaderboard();
    renderTransferUsers();
    if (window.renderAdminUserList) window.renderAdminUserList();
});

/* --- UI UPDATES --- */
let clickCombo = 1;
let comboTimer = null;

function updateUI() {
    moneyDisplay.textContent = "🪙 Coins: " + Math.floor(gameData.coins);
    prestigeDisplay.textContent = "✨ Prestige: " + gameData.prestige;
    clickPowerDisplay.textContent = `💪 Power: +${gameData.clickPower * (1 + gameData.prestige)}`;
    currentUsernameText.textContent = gameData.username || "DuckPlayer";

    let baseCPS = 0;
    if (gameData.autoClicker) {
        if (gameData.autoClickSpeed === 1000) baseCPS = 1;
        else if (gameData.autoClickSpeed === 350) baseCPS = 3;
        else if (gameData.autoClickSpeed === 80) baseCPS = 12;
    }
    baseCPS += gameData.duckArmyCount * 50;
    cpsDisplay.textContent = `⚡ CPS: ${baseCPS * (1 + gameData.prestige)}`;

    if (gameData.isOwner) {
        ownerTagHeader.classList.remove("hidden");
        if (adminNavBtn) adminNavBtn.classList.remove("hidden");
    } else {
        ownerTagHeader.classList.add("hidden");
        if (adminNavBtn) adminNavBtn.classList.add("hidden");
    }

    applySkin();
    applyEvolution();
    checkAchievements();
}

function applySkin() {
    duck.classList.remove("rainbow-duck");
    const crown = duck.querySelector(".duck-crown");
    crown.style.display = gameData.evolved ? "block" : "none";

    if (gameData.skin === "yellow") {
        duck.style.background = "linear-gradient(135deg, #ffea00, #ff9100)";
        duck.style.boxShadow = "0 20px 50px rgba(255, 145, 0, 0.5)";
    } else if (gameData.skin === "blue") {
        duck.style.background = "linear-gradient(135deg, #00b0ff, #0022ff)";
        duck.style.boxShadow = "0 20px 50px rgba(0, 176, 255, 0.7)";
    } else if (gameData.skin === "red") {
        duck.style.background = "linear-gradient(135deg, #ff1744, #b71c1c)";
        duck.style.boxShadow = "0 20px 50px rgba(255, 23, 68, 0.7)";
    } else if (gameData.skin === "gold") {
        duck.style.background = "linear-gradient(135deg, #ffd700, #ff8f00)";
        duck.style.boxShadow = "0 20px 60px rgba(255, 215, 0, 0.85)";
    } else if (gameData.skin === "rainbow") {
        duck.classList.add("rainbow-duck");
    }
}

function applyEvolution() {
    const crown = duck.querySelector(".duck-crown");
    if (gameData.evolved) {
        duck.style.transform = "scale(1.18)";
        crown.style.display = "block";
    } else {
        duck.style.transform = "scale(1)";
        crown.style.display = "none";
    }
}

function spawnFloatingText(text, x, y) {
    const el = document.createElement("div");
    el.className = "floatingText";
    el.textContent = text;
    el.style.left = (x - 25) + "px";
    el.style.top = (y - 35) + "px";
    floatingTextContainer.appendChild(el);
    setTimeout(() => el.remove(), 850);
}

function spawnParticles(x, y) {
    if (!gameData.particlesEnabled) return;
    for (let i = 0; i < 9; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = x + "px";
        p.style.top = y + "px";
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 80;
        p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
        p.style.setProperty("--ty", Math.sin(angle) * dist + "px");
        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), 650);
    }
}

/* --- CLICK EVENT & COMBO --- */
duck.onclick = (e) => {
    let gain = gameData.clickPower * (1 + gameData.prestige) * clickCombo;
    gameData.coins += gain;
    gameData.totalCoinsEarned += gain;
    gameData.totalClicks += 1;

    playSound("squish");
    spawnFloatingText("+" + Math.floor(gain), e.clientX, e.clientY);
    spawnParticles(e.clientX, e.clientY);

    clickCombo = Math.min(10, clickCombo + 0.2);
    comboDisplay.textContent = `🔥 Combo: x${clickCombo.toFixed(1)}`;
    comboDisplay.style.opacity = "1";

    clearTimeout(comboTimer);
    comboTimer = setTimeout(() => {
        clickCombo = 1;
        comboDisplay.style.opacity = "0";
    }, 2000);

    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 320);

    saveGame();
    updateUI();
};

/* --- LEADERBOARD (TOP 50 PLAYERS) --- */
leaderboardBtn.onclick = () => { playSound("click"); leaderboardPanel.classList.remove("hidden"); renderLeaderboard(); };
closeLeaderboard.onclick = () => { playSound("click"); leaderboardPanel.classList.add("hidden"); };

tabMoney.onclick = () => {
    tabMoney.classList.add("active");
    tabXP.classList.remove("active");
    activeLeaderboardTab = "money";
    renderLeaderboard();
};
tabXP.onclick = () => {
    tabXP.classList.add("active");
    tabMoney.classList.remove("active");
    activeLeaderboardTab = "xp";
    renderLeaderboard();
};

function renderLeaderboard() {
    leaderboardList.innerHTML = "";
    const usersArray = Object.keys(window.allGlobalUsers).map(id => ({ id, ...window.allGlobalUsers[id] }));
    
    if (activeLeaderboardTab === "money") {
        usersArray.sort((a, b) => (b.coins || 0) - (a.coins || 0));
    } else {
        usersArray.sort((a, b) => (b.prestige || 0) - (a.prestige || 0));
    }

    // TOP 50 USERS DISPLAY
    usersArray.slice(0, 50).forEach((user, index) => {
        const card = document.createElement("div");
        const isSelf = user.id === gameData.userId;
        card.className = `achievement-card ${isSelf ? "unlocked" : ""}`;
        const valText = activeLeaderboardTab === "money" ? `🪙 ${Math.floor(user.coins || 0)}` : `✨ Prestige: ${user.prestige || 0}`;
        const ownerTagHtml = user.isOwner ? `<span class="owner-tag">OWNER</span>` : "";
        card.innerHTML = `
            <div>
                <strong>#${index + 1} ${user.username || 'Player'} ${isSelf ? '(You)' : ''}</strong> ${ownerTagHtml}
            </div>
            <strong>${valText}</strong>
        `;
        leaderboardList.appendChild(card);
    });
}

/* --- TRANSFERS --- */
transferBtn.onclick = () => { playSound("click"); transferPanel.classList.remove("hidden"); renderTransferUsers(); };
closeTransfer.onclick = () => { playSound("click"); transferPanel.classList.add("hidden"); };

function renderTransferUsers() {
    transferUserList.innerHTML = "";
    Object.keys(window.allGlobalUsers).forEach(id => {
        if (id !== gameData.userId) {
            const user = window.allGlobalUsers[id];
            const btn = document.createElement("button");
            btn.className = "shop-item-btn";
            btn.innerHTML = `<span>${user.username || 'Player'}</span> <span class="cost">Coins: ${user.coins || 0}</span>`;
            btn.onclick = () => {
                currentSelectedRecipientId = id;
                selectedRecipientName.textContent = `Transferring To: ${user.username || 'Player'}`;
                transferForm.classList.remove("hidden");
                playSound("click");
            };
            transferUserList.appendChild(btn);
        }
    });
}

sendCoinsBtn.onclick = () => {
    const amt = parseInt(transferAmount.value, 10);
    if (!currentSelectedRecipientId || isNaN(amt) || amt <= 0) return alert("Invalid amount or recipient.");
    if (gameData.coins < amt) return alert("You don't have enough coins!");

    gameData.coins -= amt;
    db.ref("users/" + currentSelectedRecipientId + "/coins").transaction(current => (current || 0) + amt);
    saveGame();
    updateUI();
    playSound("success");
    alert("Coins transferred successfully!");
};

sendPrestigeBtn.onclick = () => {
    const amt = parseInt(transferAmount.value, 10);
    if (!currentSelectedRecipientId || isNaN(amt) || amt <= 0) return alert("Invalid amount or recipient.");
    if (gameData.prestige < amt) return alert("You don't have enough prestige!");

    gameData.prestige -= amt;
    db.ref("users/" + currentSelectedRecipientId + "/prestige").transaction(current => (current || 0) + amt);
    saveGame();
    updateUI();
    playSound("success");
    alert("Prestige transferred successfully!");
};

/* --- GLOBAL CHAT WITH MESSAGE DELETION --- */
chatBtn.onclick = () => { playSound("click"); chatPanel.classList.remove("hidden"); };
closeChat.onclick = () => { playSound("click"); chatPanel.classList.add("hidden"); };

sendMessageBtn.onclick = () => {
    const text = chatMessageInput.value.trim();
    if (!text) return;
    db.ref("chat").push({
        sender: gameData.username || "DuckPlayer",
        senderId: gameData.userId,
        isOwner: !!gameData.isOwner,
        text: text,
        timestamp: Date.now()
    });
    chatMessageInput.value = "";
    playSound("click");
};

db.ref("chat").limitToLast(50).on("value", snapshot => {
    chatBox.innerHTML = "";
    const msgs = snapshot.val() || {};
    Object.keys(msgs).forEach(msgKey => {
        const msg = msgs[msgKey];
        const msgEl = document.createElement("div");
        msgEl.className = "chat-msg";
        const tag = msg.isOwner ? `<span class="owner-tag">OWNER</span>` : "";
        const canDelete = msg.senderId === gameData.userId || gameData.isOwner;
        const deleteBtnHtml = canDelete ? `<button onclick="deleteChatMessage('${msgKey}')" style="padding:2px 6px; font-size:10px; margin-left:8px; background:#ff1744;">🗑️</button>` : "";
        
        msgEl.innerHTML = `<div><strong>${msg.sender}</strong> ${tag}: <span>${msg.text}</span> ${deleteBtnHtml}</div>`;
        chatBox.appendChild(msgEl);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
});

window.deleteChatMessage = function(msgKey) {
    if (confirm("Delete this message?")) {
        db.ref("chat/" + msgKey).remove();
    }
};

/* --- OTHER PANELS --- */
shopBtn.onclick = () => { playSound("click"); shop.classList.remove("hidden"); };
closeShop.onclick = () => { playSound("click"); shop.classList.add("hidden"); };

statsBtn.onclick = () => { playSound("click"); statsPanel.classList.remove("hidden"); renderStats(); };
closeStats.onclick = () => { playSound("click"); statsPanel.classList.add("hidden"); };

achievementsBtn.onclick = () => { playSound("click"); achievementsPanel.classList.remove("hidden"); renderAchievements(); };
closeAchievements.onclick = () => { playSound("click"); achievementsPanel.classList.add("hidden"); };

settingsBtn.onclick = () => { playSound("click"); settingsPanel.classList.remove("hidden"); };
closeSettings.onclick = () => { playSound("click"); settingsPanel.classList.add("hidden"); };

/* --- SHOP UPGRADES --- */
upgradeClick.onclick = () => {
    if (gameData.coins >= 50) {
        gameData.coins -= 50; gameData.clickPower += 1;
        playSound("upgrade"); saveGame(); updateUI();
    } else { playSound("error"); }
};
upgradeClickBig.onclick = () => {
    if (gameData.coins >= 200) {
        gameData.coins -= 200; gameData.clickPower += 5;
        playSound("upgrade"); saveGame(); updateUI();
    } else { playSound("error"); }
};
upgradeClickMega.onclick = () => {
    if (gameData.coins >= 950) {
        gameData.coins -= 950; gameData.clickPower += 25;
        playSound("upgrade"); saveGame(); updateUI();
    } else { playSound("error"); }
};
upgradeClickGod.onclick = () => {
    if (gameData.coins >= 4500) {
        gameData.coins -= 4500; gameData.clickPower += 100;
        playSound("upgrade"); saveGame(); updateUI();
    } else { playSound("error"); }
};

autoClick.onclick = () => {
    if (!gameData.autoClicker && gameData.coins >= 300) {
        gameData.coins -= 300; gameData.autoClicker = true; gameData.autoClickSpeed = 1000;
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};
autoClickFast.onclick = () => {
    if (gameData.coins >= 1200) {
        gameData.coins -= 1200; gameData.autoClicker = true; gameData.autoClickSpeed = 350;
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};
autoClickHyper.onclick = () => {
    if (gameData.coins >= 5500) {
        gameData.coins -= 5500; gameData.autoClicker = true; gameData.autoClickSpeed = 80;
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};

buyDuckArmy.onclick = () => {
    if (gameData.coins >= 22000) {
        gameData.coins -= 22000; gameData.duckArmyCount += 1;
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};

buySkinBlue.onclick = () => {
    if (gameData.coins >= 500) {
        gameData.coins -= 500; gameData.skin = "blue";
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};
buySkinRed.onclick = () => {
    if (gameData.coins >= 1200) {
        gameData.coins -= 1200; gameData.skin = "red";
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};
buySkinGold.onclick = () => {
    if (gameData.coins >= 3000) {
        gameData.coins -= 3000; gameData.skin = "gold";
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};
buySkinRainbow.onclick = () => {
    if (gameData.coins >= 10000) {
        gameData.coins -= 10000; gameData.skin = "rainbow";
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};

evolveDuckBtn.onclick = () => {
    if (!gameData.evolved && gameData.coins >= 4500) {
        gameData.coins -= 4500; gameData.evolved = true;
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};

prestigeBtn.onclick = () => {
    if (gameData.coins >= 7500) {
        gameData.coins = 0; gameData.clickPower = 1; gameData.autoClicker = false;
        gameData.autoClickSpeed = 1000; gameData.duckArmyCount = 0; gameData.prestige += 1;
        playSound("success"); saveGame(); updateUI();
    } else { playSound("error"); }
};

/* --- AUTOMATION TICK LOOP --- */
setInterval(() => {
    let passiveGain = 0;
    if (gameData.autoClicker) {
        if (gameData.autoClickSpeed === 1000) passiveGain = 1;
        else if (gameData.autoClickSpeed === 350) passiveGain = 3;
        else if (gameData.autoClickSpeed === 80) passiveGain = 12;
    }
    passiveGain += gameData.duckArmyCount * 50;

    if (passiveGain > 0) {
        let tickIncome = (passiveGain * (1 + gameData.prestige)) / 10;
        gameData.coins += tickIncome;
        gameData.totalCoinsEarned += tickIncome;
        saveGame();
        updateUI();
    }
}, 100);

/* --- STATS & ACHIEVEMENTS --- */
function renderStats() {
    statsContentList.innerHTML = `
        <div class="stat-row-card"><span>Display Name:</span> <strong>${gameData.username}</strong></div>
        <div class="stat-row-card"><span>Total Coins Earned:</span> <strong>${Math.floor(gameData.totalCoinsEarned)}</strong></div>
        <div class="stat-row-card"><span>Total Manual Clicks:</span> <strong>${gameData.totalClicks}</strong></div>
        <div class="stat-row-card"><span>Current Click Power:</span> <strong>${gameData.clickPower * (1 + gameData.prestige)}</strong></div>
        <div class="stat-row-card"><span>Duck Army Outposts:</span> <strong>${gameData.duckArmyCount}</strong></div>
        <div class="stat-row-card"><span>Cosmic Prestige Level:</span> <strong>${gameData.prestige}</strong></div>
    `;
}

const achievementDefs = [
    { id: "first_click", title: "Baby Quack", desc: "Start your journey by clicking the duck.", check: () => gameData.totalClicks >= 1 },
    { id: "clicker_100", title: "Dedicated Clicker", desc: "Perform 100 manual clicks.", check: () => gameData.totalClicks >= 100 },
    { id: "rich_duck", title: "Coin Tycoon", desc: "Earn 5,000 total coins.", check: () => gameData.totalCoinsEarned >= 5000 },
    { id: "prestige_master", title: "Universal Ascendant", desc: "Perform your first Cosmic Prestige.", check: () => gameData.prestige >= 1 }
];

function checkAchievements() {
    achievementDefs.forEach(ach => {
        if (!gameData.unlockedAchievements.includes(ach.id) && ach.check()) {
            gameData.unlockedAchievements.push(ach.id);
            playSound("success");
            spawnFloatingText("🏆 Quest Unlocked: " + ach.title, window.innerWidth / 2, 100);
            saveGame();
        }
    });
}

function renderAchievements() {
    achievementListContainer.innerHTML = "";
    achievementDefs.forEach(ach => {
        const unlocked = gameData.unlockedAchievements.includes(ach.id);
        const card = document.createElement("div");
        card.className = `achievement-card ${unlocked ? "unlocked" : ""}`;
        card.innerHTML = `<div><strong>${ach.title}</strong><br><small>${ach.desc}</small></div><div>${unlocked ? "✅" : "🔒"}</div>`;
        achievementListContainer.appendChild(card);
    });
}

/* --- SETTINGS HANDLERS --- */
toggleSoundBtn.onclick = () => {
    gameData.soundEnabled = !gameData.soundEnabled;
    playSound("click"); saveGame();
    toggleSoundBtn.textContent = gameData.soundEnabled ? "🔊 Sound: Enabled" : "🔇 Sound: Disabled";
};

toggleParticlesBtn.onclick = () => {
    gameData.particlesEnabled = !gameData.particlesEnabled;
    playSound("click"); saveGame();
    toggleParticlesBtn.textContent = gameData.particlesEnabled ? "✨ Particles: Enabled" : "💤 Particles: Disabled";
};

dailyRewardBtn.onclick = () => {
    const now = Date.now();
    if (now - gameData.lastDailyReward >= 86400000) {
        gameData.coins += 2500;
        gameData.totalCoinsEarned += 2500;
        gameData.lastDailyReward = now;
        playSound("success"); saveGame(); updateUI();
        alert("🎁 Daily tribute claimed: +2500 coins!");
    } else {
        playSound("error");
        alert("⏰ Daily reward already claimed. Return tomorrow!");
    }
};

resetProgressBtn.onclick = () => {
    if (confirm("Hard factory reset all progress?")) {
        gameData.coins = 0; gameData.totalCoinsEarned = 0; gameData.totalClicks = 0;
        gameData.clickPower = 1; gameData.autoClicker = false; gameData.duckArmyCount = 0;
        gameData.prestige = 0; gameData.skin = "yellow"; gameData.evolved = false;
        saveGame(); updateUI();
    }
};

// INITIALIZATION
checkUsernameState();
updateUI();