// ステータス変動表
// ==============================================================
// 将来のコミュニケーションゲーム有志を担当される方へ
// ==============================================================
// ゲームバランスの調整をする場合は、この表の値を書き換えてください。
// プレイヤー人数: [協力0人, 協力1人, 協力2人, ...], となっています。
// ==============================================================

const STATUS_TABLE = {
    3: [-3, -1, 0, 2],
    4: [-3, -1, 0, 1, 2],
    5: [-3, -2, -1, 0, 1, 2],
};

// ===================================
// ここから先は、原則触れないでください！
// ===================================

//DOM
const toggleButton = document.getElementById("toggle");
const navigationWindow = document.getElementById("nav");
const statusTableElement = document.getElementById("status_table");
const playerOptions = Array.from(document.getElementsByName("player"));
const currentPlayerTexts = Array.from(document.getElementsByClassName("current-players"));
const currentTurnText = document.getElementById("current_turn");
const breakdownCountText = document.getElementById("breakdown_count");
const resultArea = document.getElementById("result");
const requestArea = document.getElementById("request");
const statusNumbers = Array.from(document.getElementsByClassName("status"));

const voteButtons = Array.from(document.getElementsByClassName("vote-button"));
const redoButton = document.getElementById("redo");
const openButton = document.getElementById("open");

// 固定値
const INITIAL_TURN_COUNT = 1;
const INITIAL_STATUS_INDEX = 4;
const MAX_TURN = 10;
const DURATION_MS = 1000;

// 変数
let turnCount = INITIAL_TURN_COUNT;
let players = 0;
let statusIndex = INITIAL_STATUS_INDEX;
let breakdownCount = 0;
let highlightTimerId = null;
let isActive = false;

// 投票内容
const votes = [];

// ゲーム画面の表示
playerOptions.forEach((option) => option.addEventListener("change", showGameDisplay));
function showGameDisplay() {
    const selectedOption = document.querySelector("input[name='player']:checked");
    if (!selectedOption) {
        return;
    }

    players = Number(selectedOption.value);
    const gameDisplay = document.getElementById("game_display");
    
    hidePlayerSelect();
    gameDisplay.style.display = "block";
    showCurrentPlayers(players);
    showCurrentTurn();
    showBreakdownCount();
    showVotedPlayers();
    showStatusTable(players);
    highlightTimerId = setInterval(highlightCurrentStatus, DURATION_MS);
}

// ラジオボタンの非表示
function hidePlayerSelect() {
    const playerSelectArea = document.getElementById("player_select");
    playerSelectArea.style.display = "none";
}

// 現在のプレイ人数の表示
function showCurrentPlayers(players) {
    currentPlayerTexts.forEach((text) => text.textContent = players);
}

// 現在のターン数を表示
function showCurrentTurn() {
    currentTurnText.textContent = turnCount;
}

// 故障回数の表示
function showBreakdownCount() {
    breakdownCountText.textContent = breakdownCount;
}

// 投票人数の表示
function showVotedPlayers() {
    const voted = document.getElementById("voted");
    voted.textContent = votes.length;
}

// ステータス変動表の表示
function showStatusTable(players) {
    STATUS_TABLE[players].forEach((value, i) => {
        const li = document.createElement("li");
        const displayValue = (value > 0) 
            ? "+" + value
            : ((value === 0)
                ? "±" + value
                : value);
        li.innerHTML = `協力: ${i}人、非協力: ${players - i}人 → <span>${displayValue}</span>`;
        statusTableElement.appendChild(li);
    });
}

// ステータス変動表の開閉
toggleButton.addEventListener("click", toggleClassActive);
function toggleClassActive() {
    navigationWindow.classList.toggle("active", !isActive);
    isActive = isActive ? false : true;
    toggleButton.textContent = isActive ? "ステータス変動表を隠す" : "ステータス変動表を見る";
}

// 現在のステータスをハイライト
function highlightCurrentStatus() {
    const currentStatus = statusNumbers[statusIndex];
    currentStatus.classList.toggle("highlighted");
}

// ステータスハイライトのリセット
function clearStatusHighlight() {
    statusNumbers.forEach((statusNumber) => 
        statusNumber.classList.remove("highlighted")
    );
}

// 投票数のカウント(0 = 非協力, 1 = 協力)
voteButtons.forEach((button) => button.addEventListener("click", () => countVotedPlayers(event)));
function countVotedPlayers(event) {
    if(event.target.id === "cooperative") {
        votes.push(1);
    } else if (event.target.id === "uncooperative") {
        votes.push(0);
    }
    showVotedPlayers();

    if (votes.length > 0) {
        redoButton.disabled = false;
    }
    if (votes.length === players) {
        setButtonDisabled(true);
    }
}

// 投票のやり直し
redoButton.addEventListener("click", redo);
function redo() {
    votes.pop();
    if (votes.length === 0) {
        redoButton.disabled = true;
    }
    setButtonDisabled(false);
    showVotedPlayers();
}

// ボタンのdisabled制御
function setButtonDisabled(disabled) {
    openButton.disabled = !disabled;
    voteButtons.forEach((button) => button.disabled = disabled);
}

// 開票
openButton.addEventListener("click", showVoteResult);
function showVoteResult() {
    redoButton.disabled = true;
    openButton.disabled = true;

    const cooperative = calculateCooperativePlayers();
    const statusChange = STATUS_TABLE[players][cooperative];

    const statusChangeText = statusChange > 0
        ? `が <span>${statusChange}</span> 上がります！`
        : (statusChange === 0
            ? "の変更はありません。"
            : `が <span>${statusChange}</span> されます！`
        );

    resultArea.innerHTML = `
        <h2>
            投票結果<br />
            協力: <span>${cooperative}</span>人 、非協力: <span>${(players - cooperative)}</span>人でした！<br />
            機械の稼働ステータス${statusChangeText}
        </h2>
        <div class="button-wrapper">
            <input type="button" id="proceed" value="ターンを進める" />
        </div>
    `;

    const proceedButton = document.getElementById("proceed");
    proceedButton.addEventListener("click", () => proceedTurn(cooperative));

    const nextIndex = calculateNextIndex(statusIndex, statusChange, statusNumbers);
    highlightNextIndex(nextIndex);

    if (nextIndex === 0) {
        proceedButton.disabled = true;
        resultArea.innerHTML += `
            <h2>機械が故障しました。<br />
            ${turnCount}ターン目の最初からやり直します。</h2>
            <div class="button-wrapper">
                <input type="button" id="reset" value="${turnCount}ターン目の最初に戻る" />
            </div>
            `;
        const resetButton = document.getElementById("reset");
        resetButton.addEventListener("click", restartCurrentTurn);
    } else if (turnCount === MAX_TURN) {
        requestArea.innerHTML = `
            <p>
                最後のターンが終了しました。お疲れさまでした。<br />
                記録を取り終えたら、感想戦に移ってください。<br />
                「ターンを進める」ボタンをクリックすると、最初のターンに戻ります。
            </p>
            `;
    } else {
        requestArea.innerHTML = (turnCount === MAX_TURN || nextIndex === 0)
            ? ""
            : `
            <p>
                各プレイヤーは記録用紙に自分の投票と機械のステータス変動を記録してください。<br />
                全員が記録を終えたら、ターンを進めてください。
            </p>
            `;
    }
}

// 「協力」人数の計算
function calculateCooperativePlayers() {
    return votes.reduce((a, c) => { return a + c }, 0);
}

// 次のステータスのインデックス番号を計算
function calculateNextIndex(statusIndex, statusChange, statusNumbers) {
    let nextIndex = statusIndex + statusChange;
    if (nextIndex <= 0) {
        nextIndex = 0;
    } else if (nextIndex >= statusNumbers.length) {
        nextIndex = statusNumbers.length - 1;
    }

    return nextIndex;
}

// 次のステータスに予告ハイライトをつける
function highlightNextIndex(nextIndex) {
    statusNumbers[nextIndex].classList.add("highlighted");
}

// ステータス変動
function changeStatus(cooperative) {
    const statusChange = STATUS_TABLE[players][cooperative];
    statusIndex += statusChange;

    if (statusIndex > statusNumbers.length - 1) {
        statusIndex = statusNumbers.length - 1;
    } else if (statusIndex <= 0) {
        statusIndex = 0;
    }
}

// ターンごとの表示リセット
function resetAllStatus() {
    votes.length = 0;
    showVotedPlayers();
    setButtonDisabled(false);
    resultArea.innerHTML = "";
    requestArea.innerHTML = "";
    clearStatusHighlight();
}

// ターンを進める
function proceedTurn(cooperative) {
    if (turnCount === MAX_TURN) {
        resetTurn();
    } else {
        turnCount ++;
        showCurrentTurn();
        changeStatus(cooperative);
    }

    resetAllStatus();
}

// ターンリセット
function resetTurn() {
    const proceedButton = document.getElementById("proceed");

    if (proceedButton.disabled === true) {
        proceedButton.disabled = false;
    }

    turnCount = INITIAL_TURN_COUNT;
    breakdownCount = 0;
    showCurrentTurn();
    showBreakdownCount();
    resetAllStatus();
    statusIndex = INITIAL_STATUS_INDEX;
}

// 機械故障時、そのターンをやり直す
function restartCurrentTurn() {
    breakdownCount ++;
    showBreakdownCount();
    voteButtons.forEach((button) => button.disabled = false);
    const proceedButton = document.getElementById("proceed");
    proceedButton.disabled = false;
    resetAllStatus();
}