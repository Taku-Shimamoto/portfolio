// DOM
// ----- テキストDOM -----
const currentModeText = document.getElementById("current_mode");
const requestMessageText = document.getElementById("request_message");
const timeLimitText = document.getElementById("time_limit");

// ------ モーダル -----
const guideIcon = document.getElementById("guide");
const guideModal = document.getElementById("guide_modal");
const banInfoModal = document.getElementById("ban_info");
const modalBackground = document.getElementById("modal_background");

// ----- div要素 -----
const bannedLetterArea = document.getElementById("banned_letters");

// -----  ボタンDOM -----
const letterButtons = Array.from(document.querySelectorAll(".letter"));
const progressButton = document.getElementById("progress");

// データ
// 文字のマスターデータ
const LETTERS = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", null, "ゆ", null, "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", null, null, null, "を",
    "ん", "ー",
];

// 使用禁止文字
const UNUSABLE_LETTER = "を";

// 組み合わせ不可文字
const INCOMPATIBLE_LETTERS = ["ん", "ー"];

// モード(0 = 通常, 1 = ドラフト)
const MODE = [
    { name: "normal", textContent: "通常モード", },
    { name: "draft", textContent: "ドラフトモード", },
];

// 各チームのデータ
const TEAMS = {
    team1: {
        name: "チーム1",
        areaElement: document.getElementById("team1"),
        pickedLetterBoxAreaElement: document.querySelector(".picked-letters.team1"),
        pickedLetterBoxElements: null,
        pickableLetters: [...LETTERS],
        pickedLetters: [],
        hasIncompatibleLetter: false,
    },
    team2: {
        name: "チーム2",
        areaElement: document.getElementById("team2"),
        pickedLetterBoxAreaElement: document.querySelector(".picked-letters.team2"),
        pickedLetterBoxElements: null,
        pickableLetters: [...LETTERS],
        pickedLetters: [],
        hasIncompatibleLetter: false,
    },
};

// フェーズの流れ
const PHASE_FLOW = [
    {
        phase: "beforeStarting",
        name: "ドラフトしりとリレー",
        message: "「スタート！」を押すとゲームが始まります。",
        timeLimit: null,
        buttonLabel: "スタート！",
        function: setInitialStates,
    },
    {
        phase: "random",
        name: "ランダム文字選択フェーズ",
        message: "ランダムで文字を選びます。",
        timeLimit: null,
        buttonLabel: "ランダムで選ぶ",
        function: startRandomPickPhase,
    },
    {
        phase: "ban",
        name: "使用禁止フェーズ",
        message: "使用禁止する文字を選びます。",
        timeLimit: 20,
        buttonLabel: "ランダムで選ぶ",
        function: startBanPhase,
    },
    {
        phase: "pick",
        name: "文字選択フェーズ",
        message: "使用する文字を選びます。",
        timeLimit: 20,
        buttonLabel: "ランダムで選ぶ",
        function: startLetterPickPhase,
    },
    {
        phase: "thinking",
        name: "シンキングタイム",
        message: "シンキングタイムです。",
        timeLimit: 30,
        buttonLabel: "スタート！",
        function: startThinkingTime,
    },
    {
        phase: "relay",
        name: "しりとりリレー",
        message: "リレーを完成させましょう！",
        timeLimit: 90,
        buttonLabel: "一時停止",
        function: startRelayCountDown,
    },
    {
        phase: "finish",
        name: "Time up!",
        message: "ポイントを集計してください。",
        timeLimit: null,
        buttonLabel: "次のラウンドへ",
        function: startFinishPhase,
    },
];

// ピックの流れ
const PICK_FLOW = {
    4: [1, 1, 2, 2, 1, 1,],
    5: [1, 2, 2, 2, 2, 1,],
    6: [1, 1, 2, 2, 2, 2, 1, 1,],
    7: [1, 2, 2, 2, 2, 2, 2, 1,],
};

// ルール説明
const RULE_GUIDES = {
        normal:
            `
                <h4>ルール説明(通常モード)</h4>
                <p>※通常モードでは、各チームが使用する文字・使用禁止される文字ともに、スクリプトがランダムで決定します。</p>
                <p>
                    まずはルールを理解し、しりとりリレーが時間内に完成できるよう、頑張ってみてください！<br />
                    それができたら、次は使いやすい文字の組み合わせを見つけてみましょう！
                </p>
            `,
        draft:
            `
                <h4>ルール説明(ドラフトモード)</h4>
                <ol>
                    <li>
                        ランダム文字選択フェーズ
                        <p>
                            各チームが使う文字のうち、最初の1文字のみをスクリプトがランダムで決定します。<br />
                            その文字をもとに、使用禁止にする文字やチームで使う文字を選びましょう。
                        </p>
                    </li>
                    <li>
                        使用禁止フェーズ(20秒)
                        <p>
                            使用禁止にする文字を各チーム交互に、2文字ずつ選びます。<br />
                            両チームで合計4文字が使用禁止として選ばれます。<br />
                            選ばれた文字はそのゲーム中のみ、<span>両チームとも使用することはできません</span>。
                        </p>
                        <p>
                            どの文字を使用禁止にすればいいか分からないときは？
                        </p>
                            <ul>
                                <li>前のゲームで相手チームが使っていた文字</li>
                                <li>ランダムで選ばれた文字と相性の良さそうな文字</li>
                            </ul>
                        <p>
                            を基準に選んでみると良いでしょう。一人で判断するのが難しいときは、<span>遠慮せずチームの仲間にアドバイスをもらいましょう</span>。<br />
                            それでもどうしても判断に迷う場合は、「ランダムで1つ選ぶ」ボタンを押すか時間経過でスクリプトがランダムで選んでくれます。
                        </p>
                    </li>
                    <li>
                        文字選択フェーズ(20秒)
                        <p>
                            使用禁止に選ばれた文字以外から、各チーム交互に文字を選んでいきます。<br />
                            通常モードとは違い、他のチームが先に選んだ文字を重複して選ぶことはできません。
                        </p>
                        <p>
                            どの文字を選べばいいか分からないときは？
                        </p>
                            <ul>
                                <li>味方チームが使える文字と相性の良さそうな文字</li>
                                <li>使用禁止以外にも相手チームに使われたくない文字</li>
                            </ul>
                        <p>
                            を基準に選んでみると良いでしょう。一人で判断するのが難しいときは、<span>遠慮せずチームの仲間にアドバイスをもらいましょう</span>。<br />
                            それでもどうしても判断に迷う場合は、「ランダムで1つ選ぶ」ボタンを押すか時間経過でスクリプトがランダムで選んでくれます。
                        </p>
                    </li>
                </ol>
            `,
};

// 配列(両チーム共有)
const bannedLetters = [];                       // BANピックされた文字を格納
let bannableLetters = [...LETTERS];             // BANピックできる文字を格納

// 固定値
let teamMembers = 5;                // 将来的にletかconstかを決定
let totalBannableLetters = 4;       // 将来的にletかconstかを決定
const TOTAL_TEAM_LETTERS = teamMembers + 1;
const DELAY_MS = 1000;
const DURATION_POP = 500;
const DURATION_MS = 1000;
const HURRYUP_SECOND = 5;

// HTML
const bannedLetterBoxHTML = 
    `
        <i class="fa-solid fa-ban"></i>
        <div class="banned-letter"></div>
    `;
const pickedLetterBoxHTML = `<div class="picked-letter"></div>`;
const closeButtonHTML =
    `
        <div id="close" class="close">
            <span></span>
            <span></span>
        </div>
    `;

// 状態管理
const gameStates = {
    // ゲームの進行状態
    modeIndex: 0,
    currentStep: 0,
    currentTeam: "team1",
    currentPickStep: 0,
    currentPickCount: 0,

    // 変数
    currentHighlightIndex: 0,
    timeCount: null,
    isCounting: false,

    // タイマー
    highlightTimerId: null,
    countDownTimerId: null,

    // getter
    get mode() {
        return MODE[this.modeIndex];
    },

    get step() {
        return PHASE_FLOW[this.currentStep];
    },

    get team() {
        return TEAMS[this.currentTeam];
    },

    get opponentTeam() {
        return TEAMS[this.currentTeam === "team1" ? "team2" : "team1"];
    },
    
    get pickStep() {
        return PICK_FLOW[teamMembers][this.currentPickStep];
    },
};

// モード切り替え
document.addEventListener("keydown", (e) => {
    if (e.key === " ") changeMode();
});
function changeMode() {
    if (gameStates.step.phase !== "beforeStarting") return;
    if (gameStates.mode.name === "draft") return;
    gameStates.modeIndex = 1;
    changeColors();
    clearAllStateAndUI();
}

// 配色切り替え
function changeColors() {
    document.body.classList.add("draft");
}

// すべてのUIをアップデート
function updateAllUI() {
    showCurrentMode();
    showCurrentRule();
    showRequestMessage();
    showTimeLimit();
    showButtonLabel();
}

// 現在のモードを表示
function showCurrentMode() {
    currentModeText.textContent = gameStates.mode.textContent;
}

// 現在のルールを表示
function showCurrentRule() {
    const ruleText = gameStates.mode.name === "normal"
        ? RULE_GUIDES["normal"]
        : RULE_GUIDES["draft"];
    guideModal.innerHTML = ruleText + closeButtonHTML;
    
    document.getElementById("close").addEventListener("click", closeModal);
}

// リクエストメッセージの表示
function showRequestMessage() {
    requestMessageText.textContent = `${gameStates.step.name} : ${gameStates.step.message}`;
}

// 制限時間の表示
function showTimeLimit() {
    timeLimitText.textContent = gameStates.step.timeLimit ? gameStates.step.timeLimit : "--";
}

// ボタンラベルの表示
function showButtonLabel() {
    progressButton.textContent = gameStates.step.buttonLabel;
}

// 通常モード時はすべてのボタンをdisabled
function resetButtonState() {
    letterButtons.forEach((button) => button.disabled = gameStates.mode.name === "normal");
}

// 状態/UIのクリア
function clearAllStateAndUI() {
    // 配列のリセット
    TEAMS["team1"].pickableLetters = [...LETTERS];
    TEAMS["team1"].pickedLetters.length = 0;
    TEAMS["team2"].pickableLetters = [...LETTERS];
    TEAMS["team2"].pickedLetters.length = 0;
    bannableLetters = [...LETTERS];
    bannedLetters.length = 0;

    // 状態のリセット
    gameStates.currentStep = 0;
    gameStates.currentTeam = "team1";
    gameStates.currentPickStep = 0;
    gameStates.currentPickCount = 0;

    gameStates.currentHighlightIndex = 0;
    gameStates.timeCount = null;
    gameStates.isCounting = false;
    
    TEAMS["team1"].hasIncompatibleLetter = false;
    TEAMS["team2"].hasIncompatibleLetter = false;

    // タイマーリセット
    clearTimeout(gameStates.highlightTimerId);
    gameStates.highlightTimerId = null;
    clearInterval(gameStates.countDownTimerId);
    gameStates.countDownTimerId = null;

    // UIリセット
    resetButtonState();
    disableSpecificLetter();
    updateAllUI();
    removeTeamActive();

    bannedLetterBoxes.forEach((box) => box.textContent = "");
    team1PickedLetterBoxes.forEach((box) => box.textContent = "");
    team2PickedLetterBoxes.forEach((box) => box.textContent = "");
    team1PickedLetterBoxes.forEach((box) => box.classList.remove("pop"));
    team2PickedLetterBoxes.forEach((box) => box.classList.remove("pop"));
}

// モーダルの表示 / 非表示
guideIcon.addEventListener("click", () => openModal("guide"));
function openModal(content) {
    if (gameStates.isCounting) return;
    modalBackground.classList.add("open");

    if (content === "guide") {
        guideModal.classList.add("active");
    }

    if (content === "banConfirmation") {
        banInfoModal.classList.add("active");
        banInfoModal.innerHTML = 
        `
            <h4>このラウンドでは両チームともこれらの文字を使用することはできません！</h4>
            <div class="ban-confirmation">
                ${bannedLetters.map((letter) => `<i class="fa-solid fa-ban"></i><div class="banned-letter">${letter}</div>`).join("")}
            </div>
            <button type="button" id="ok">OK</button>
        `;
        document.getElementById("ok").addEventListener("click", () => {
            closeModal();
            gameStates.currentHighlightIndex = 0;
            removeAllBoxHighlight();
            goToNextStep();
        });
    }
}

function closeModal() {
    modalBackground.classList.remove("open");
    guideModal.classList.remove("active");
    banInfoModal.classList.remove("active");
}

// BANされた文字を表示するブロックを生成 + DOM取得
bannedLetterArea.innerHTML = bannedLetterBoxHTML.repeat(totalBannableLetters);
const bannedLetterBoxes = Array.from(document.querySelectorAll(".banned-letter"));

// ピックされた文字を表示するブロックを生成 + DOM取得
TEAMS["team1"].pickedLetterBoxAreaElement.innerHTML = pickedLetterBoxHTML.repeat(TOTAL_TEAM_LETTERS);
TEAMS["team2"].pickedLetterBoxAreaElement.innerHTML = pickedLetterBoxHTML.repeat(TOTAL_TEAM_LETTERS);
const allPickedLetterBoxes = Array.from(document.querySelectorAll(".picked-letter"));
const team1PickedLetterBoxes = Array.from(document.querySelectorAll(".picked-letters.team1 .picked-letter"));
const team2PickedLetterBoxes = Array.from(document.querySelectorAll(".picked-letters.team2 .picked-letter"));
TEAMS["team1"].pickedLetterBoxElements = team1PickedLetterBoxes;
TEAMS["team2"].pickedLetterBoxElements = team2PickedLetterBoxes;

// activeクラスの付与
function addTeamActive() {
    gameStates.team.areaElement.classList.add("active");
}

// activeクラスを取り除く
function removeTeamActive() {
    TEAMS["team1"].areaElement.classList.remove("active");
    TEAMS["team2"].areaElement.classList.remove("active");
}

// ボックスハイライト
function highlightBox() {
    if (gameStates.step.phase === "ban") {
        gameStates.highlightTimerId = setInterval(() => {
            bannedLetterBoxes[gameStates.currentHighlightIndex]?.classList.toggle("highlighted");
        }, DURATION_MS);
    } else if (gameStates.step.phase === "random" || gameStates.step.phase === "pick") {
        gameStates.highlightTimerId = setInterval(() => {
            gameStates.team.pickedLetterBoxElements[gameStates.currentHighlightIndex]?.classList.toggle("highlighted");
        }, DURATION_MS);
    }
}

// すべてのボックスハイライトを除去
function removeAllBoxHighlight() {
    clearInterval(gameStates.highlightTimerId);
    bannedLetterBoxes.forEach((box) => box.classList.remove("highlighted"));
    allPickedLetterBoxes.forEach((box) => box.classList.remove("highlighted"));
}

// 次のボックスをハイライト
function highlightNextBox() {
    gameStates.currentHighlightIndex ++;

    if (gameStates.step.phase === "ban") {
        bannedLetterBoxes[gameStates.currentHighlightIndex]?.classList.add("highlighted");
    } else if (gameStates.step.phase === "random" || gameStates.step.phase === "pick") {
        gameStates.team.pickedLetterBoxElements[gameStates.currentHighlightIndex]?.classList.add("highlighted");
    }
    
    highlightBox();
}

// ピックされた文字をポップする
function popPickedLetter() {
    gameStates.team.pickedLetterBoxElements[gameStates.currentHighlightIndex].classList.add("pop");
}

// 文字ボタンにイベント付与
letterButtons.forEach((button) => button.addEventListener("click", (e) => handleButtonEvents(e)));
progressButton.addEventListener("click", handleGameProgress);

// 文字ボタンクリック時の処理
function handleButtonEvents(e) {
    // 手動ピック
    const manualPickedLetter = e.target.textContent;
    const manualPickedIndex = LETTERS.indexOf(manualPickedLetter);

    // ----- 2. BAN フェーズ -----
    if (gameStates.step.phase === "ban") {
        handleBanPhase(manualPickedIndex, manualPickedLetter);
        return;
    }

    // ----- 3. 文字選択フェーズ -----
    if (gameStates.step.phase === "pick") {
        handlePickPhase(manualPickedIndex, manualPickedLetter);
    }
}

// 進行ボタンクリック時 / ランダムピック の処理
function handleGameProgress() {
    // ランダムピック
    let [randomIndex, randomPickedLetter] = [];

    // ----- 0. 初期状態 -----
    if (gameStates.step.phase === "beforeStarting") {
        goToNextStep();
        return;
    }

    // ----- 1. ランダム文字選択フェーズ -----
    if (gameStates.step.phase === "random") {
        [randomIndex, randomPickedLetter] = pickLetterAtRandom();
        handleRandomPickPhase(randomIndex, randomPickedLetter);
        return;
    }

    // ----- 2. BAN フェーズ -----
    if (gameStates.step.phase === "ban") {
        [randomIndex, randomPickedLetter] = pickLetterAtRandom();
        handleBanPhase(randomIndex, randomPickedLetter);
        return;
    }

    // ----- 3. 文字選択フェーズ -----
    if (gameStates.step.phase === "pick") {
        [randomIndex, randomPickedLetter] = pickLetterAtRandom();
        handlePickPhase(randomIndex, randomPickedLetter);
        return;
    }

    // ----- 4. シンキングタイム -----
    if (gameStates.step.phase === "thinking") {
        handleThinkingAndRelayPhases();
        return;
    }

    // ----- 5. リレー開始 -----
    if (gameStates.step.phase === "relay") {
        handleThinkingAndRelayPhases();
        return;
    }

    // ----- 6. ラウンド終了 -----
    if (gameStates.step.phase === "finish") {
        clearAllStateAndUI();
    }
}

// 1. ランダム文字選択フェーズの操作
function handleRandomPickPhase(i, pickedLetter) {
    removePickedLetterFromBothPickableLetters(i);
    gameStates.team.pickedLetters.push(pickedLetter);
    disableLetterButton(pickedLetter);

    popPickedLetter();
    showPickedLetters();

    removeAllBoxHighlight();
    removeTeamActive();

    if (gameStates.currentTeam === "team1") switchTeam();
    else goToNextStep();
}

// 2. BANフェーズの操作
function handleBanPhase(i, pickedLetter) {
    if (bannedLetters.length >= totalBannableLetters) return;

    handleBanPick(i, pickedLetter);
    removePickedLetterFromBothPickableLetters(i);
    disableLetterButton(pickedLetter);

    showBannedLetters();

    removeAllBoxHighlight();
    highlightNextBox();

    stopCountDown();

    if (bannedLetters.length < totalBannableLetters) {
        resetTimeCount();
        startCountDown();

        return;
    } else {
        setTimeout(showBanPickConfirmmation, DELAY_MS);
    }
}

// 3. 文字選択フェーズの操作
function handlePickPhase(i, pickedLetter) {
    if (gameStates.team.pickedLetters.length >= TOTAL_TEAM_LETTERS) return;

    gameStates.currentPickCount ++;

    removePickedLetterFromBothPickableLetters(i);
    gameStates.team.pickedLetters.push(pickedLetter);
    disableLetterButton(pickedLetter);

    gameStates.team.hasIncompatibleLetter = evaluateHasIncompatibleLetter();

    if (gameStates.team.hasIncompatibleLetter) disableOwnIncompatibleLetter();
    disableOpponentIncompatibleLetter();

    popPickedLetter();
    showPickedLetters();

    removeAllBoxHighlight();
    highlightNextBox();

    stopCountDown();
    resetTimeCount();
    startCountDown();

    if (gameStates.currentPickCount >= gameStates.pickStep) {
        gameStates.currentPickCount = 0;
        gameStates.currentPickStep ++;

        if (gameStates.currentPickStep < PICK_FLOW[teamMembers].length) {
            switchTeam();
            resetTimeCount();
            startCountDown();
        } else {
            stopCountDown();
            sortPickedLetters();
            goToNextStep();
        }
    }
}

// 4.5. シンキングタイムとリレーフェーズの操作
function handleThinkingAndRelayPhases() {
    if (gameStates.isCounting) stopCountDown();
    else startCountDown();
        
    progressButton.textContent = gameStates.isCounting
        ? "一時停止"
        : "再開する";
}

// BANピックの処理
function handleBanPick(i, bannedLetter) {
    bannableLetters.splice(i, 1, null);
    bannedLetters.push(bannedLetter);
}

// 両チームのピック可能からピックされた文字を取り除く
function removePickedLetterFromBothPickableLetters(i) {        
    TEAMS["team1"].pickableLetters.splice(i, 1, null);
    TEAMS["team2"].pickableLetters.splice(i, 1, null);
}

// ピックされた文字ボタンをdisabledにする
function disableLetterButton(pickedLetter) {
    const button = letterButtons.find((button) => button.textContent === pickedLetter);
    if (button) button.disabled = true;
}

// ランダムピック
function pickLetterAtRandom() {
    let randomIndex = null;
    let randomPickedLetter = null;

    do {
        randomIndex = Math.floor(Math.random() * gameStates.team.pickableLetters.length);
        randomPickedLetter = gameStates.team.pickableLetters[randomIndex];
    } while (randomPickedLetter === null || randomPickedLetter === UNUSABLE_LETTER);

    return [randomIndex, randomPickedLetter];
}

// 各チームに「ん」「ー」があるかの判定
function evaluateHasIncompatibleLetter() {
    return INCOMPATIBLE_LETTERS.some((incompatibleLetter) => gameStates.team.pickedLetters.includes(incompatibleLetter));
}

// 自チームの「ん」「ー」のピック状況を更新
function updateOwnIncompatibleLetters() {
    const hasIncompatibleLetter = evaluateHasIncompatibleLetter();
    INCOMPATIBLE_LETTERS.forEach((incompatibleLetter) => {
        const button = letterButtons.find((button) => button.textContent === incompatibleLetter);
        const index = gameStates.team.pickableLetters.indexOf(incompatibleLetter);

        if (hasIncompatibleLetter) {
            button.disabled = true;
            if (index !== -1) gameStates.team.pickableLetters.splice(index, 1, null);
        }
    });
    disableSpecificLetter();
}

// 自チームの「ん」「ー」の両方を使用禁止
function disableOwnIncompatibleLetter() {
    INCOMPATIBLE_LETTERS.forEach((incompatibleLetter) => {
        const button = letterButtons.find((button) => button.textContent === incompatibleLetter);
        button.disabled = true;

        const index = gameStates.team.pickableLetters.indexOf(incompatibleLetter);
        gameStates.team.pickableLetters.splice(index, 1, null);
    });
}

// 相手チームの「ん」または「ー」のみを使用禁止
function disableOpponentIncompatibleLetter() {
    INCOMPATIBLE_LETTERS.forEach((incompatibleLetter) => {
        if (!gameStates.opponentTeam.pickedLetters.includes(incompatibleLetter)) return;
        const button = letterButtons.find((button) => button.textContent === incompatibleLetter);
        button.disabled = true;

        const index = gameStates.opponentTeam.pickableLetters.indexOf(incompatibleLetter);
        if (index !== -1) gameStates.opponentTeam.pickableLetters.splice(index, 1, null);
    });
}

// 「を」を常時BAN
function disableSpecificLetter() {
    letterButtons.forEach((button) => {
        if (button.textContent === UNUSABLE_LETTER) button.disabled = true;
    });
}

// BANされた文字の表示
function showBannedLetters() {
    for (let i = 0; i < totalBannableLetters; i++) {
        bannedLetterBoxes[i].textContent = bannedLetters[i] ?? "";
    }
}

// BANピック確認モーダルの表示
function showBanPickConfirmmation() {
    bannedLetters.sort();   // 不適切語をつくらないための簡易的な措置
    showBannedLetters();
    openModal("banConfirmation");
}

// ピックした文字の表示
function showPickedLetters() {
    for (let i = 0; i < TOTAL_TEAM_LETTERS; i++) {
        gameStates.team.pickedLetterBoxElements[i].textContent = gameStates.team.pickedLetters[i];
    }
}

// 不適切語をつくらないためのソート
function sortPickedLetters() {
    TEAMS["team1"].pickedLetters.sort();
    TEAMS["team2"].pickedLetters.sort();
    for (let i = 0; i < TOTAL_TEAM_LETTERS; i++) {
        TEAMS["team1"].pickedLetterBoxElements[i].textContent = TEAMS["team1"].pickedLetters[i];
        TEAMS["team2"].pickedLetterBoxElements[i].textContent = TEAMS["team2"].pickedLetters[i];
    }
}

// チーム切り替え
function switchTeam() {
    gameStates.team.areaElement.classList.remove("active");
    gameStates.currentTeam = gameStates.currentTeam === "team1" ? "team2" : "team1";
    gameStates.team.areaElement.classList.add("active");

    updateLetterButtons();
    updateOwnIncompatibleLetters();

    removeAllBoxHighlight();
    gameStates.currentHighlightIndex = gameStates.team.pickedLetters.length;
    highlightBox();
}

// ボタン状態のアップデート
function updateLetterButtons() {
    letterButtons.forEach((button) => {
        const letter = button.textContent;
        button.disabled = !gameStates.team.pickableLetters.includes(letter);
    });
}

// 次のステップへ
function goToNextStep() {
    gameStates.currentStep ++;
    updateAllUI();
    gameStates.step.function();
}

// カウントダウン
function countTime() {
    let [randomIndex, randomPickedLetter] = [];

    gameStates.timeCount --;
    timeLimitText.textContent = gameStates.timeCount;

    timeLimitText.classList.toggle("hurryup", gameStates.timeCount && gameStates.timeCount <= HURRYUP_SECOND);

    if (gameStates.timeCount <= HURRYUP_SECOND) {
        timeLimitText.classList.add("pop");
        setTimeout(() => timeLimitText.classList.remove("pop"), DURATION_POP);
    }

    if (gameStates.timeCount === 0) {
        stopCountDown();

        if (gameStates.step.phase === "ban" && bannedLetters.length < totalBannableLetters) {
            [randomIndex, randomPickedLetter] = pickLetterAtRandom();

            clearInterval(gameStates.countDownTimerId);
            resetTimeCount();
            handleGameProgress(randomIndex, randomPickedLetter);
            return;
        }

        if (gameStates.step.phase === "pick" && gameStates.team.pickedLetters.length < TOTAL_TEAM_LETTERS) {
            [randomIndex, randomPickedLetter] = pickLetterAtRandom();

            clearInterval(gameStates.countDownTimerId);
            resetTimeCount();
            handleGameProgress(randomIndex, randomPickedLetter);
            return;
        }

        if (gameStates.step.phase === "thinking") {
            resetTimeCount();
            goToNextStep();
            return;
        }

        if (gameStates.step.phase === "relay") {
            goToNextStep();
        }
    }
}

// カウントダウン開始
function startCountDown() {
    if (gameStates.isCounting) return;
    if (gameStates.countDownTimerId) stopCountDown();
    gameStates.countDownTimerId = setInterval(countTime, DURATION_MS);
    gameStates.isCounting = true;
}

// カウントダウン停止
function stopCountDown() {
    if (!gameStates.isCounting) return;
    clearInterval(gameStates.countDownTimerId);
    gameStates.countDownTimerId = null;
    gameStates.isCounting = false;
}

// カウントのリセット
function resetTimeCount() {    
    gameStates.timeCount = gameStates.step.timeLimit;

    timeLimitText.classList.remove("hurryup");
    timeLimitText.classList.remove("pop");

    showTimeLimit();
}

// 各フェーズの処理を実行
// ----- 0. 初期状態 -----
function setInitialStates() {
    updateAllUI();
    resetButtonState();
    disableSpecificLetter();
}
gameStates.step.function();

// ----- 1. ランダム文字選択フェーズ -----
function startRandomPickPhase() {
    if (gameStates.mode.name === "normal")  {
        goToNextStep();
        return;
    }
    addTeamActive();
    highlightBox();
}

// ----- 2. BANフェーズ -----
function startBanPhase() {
    if (gameStates.mode.name === "normal") {
        handleNormalBanPhase();
        return;
    }
    highlightBox();
    resetTimeCount();
    startCountDown();
}

// ----- 3. 文字選択フェーズ -----
function startLetterPickPhase() {
    if (gameStates.mode.name === "normal") {
        handleNormalPickPhase();
        return;
    }
    gameStates.currentTeam = "team1";
    gameStates.currentHighlightIndex = gameStates.team.pickedLetters.length;
    TEAMS["team1"].areaElement.classList.add("active");

    highlightBox();
    resetTimeCount();
    startCountDown();
}

// -----4. シンキングタイム -----
function startThinkingTime() {
    TEAMS["team1"].areaElement.classList.add("active");
    TEAMS["team2"].areaElement.classList.add("active");

    resetTimeCount();
}

// ----- 5. リレー開始 -----
function startRelayCountDown() {
    resetTimeCount();
    startCountDown();
}

// ----- 6. ラウンド終了 -----
function startFinishPhase() {
    return;
}

// 通常モードのBANフェーズ
function handleNormalBanPhase() {
    let [randomIndex, randomPickedLetter] = [];
    let i = 0;

    while (i < totalBannableLetters) {
        [randomIndex, randomPickedLetter] = pickLetterAtRandom();
        bannedLetters.push(randomPickedLetter);
        bannableLetters.splice(randomIndex, 1, null);
        removePickedLetterFromBothPickableLetters(randomIndex);
        i ++;
    }

    showBannedLetters();
    setTimeout(showBanPickConfirmmation, DELAY_MS);
}

// 通常モードの文字選択フェーズ
function handleNormalPickPhase() {
    let [randomIndex, randomPickedLetter] = [];
    let i = 0;

    while (i < TOTAL_TEAM_LETTERS) {
        [randomIndex, randomPickedLetter] = pickLetterAtRandom();
        gameStates.team.pickedLetters.push(randomPickedLetter);
        gameStates.team.pickableLetters.splice(randomIndex, 1, null);
        i ++;
    }

    sortPickedLetters();
    showPickedLetters();
    gameStates.currentTeam = "team2";
    i = 0;

    while (i < TOTAL_TEAM_LETTERS) {
        [randomIndex, randomPickedLetter] = pickLetterAtRandom();
        gameStates.team.pickedLetters.push(randomPickedLetter);
        gameStates.team.pickableLetters.splice(randomIndex, 1, null);
        i ++;
    }

    sortPickedLetters();
    showPickedLetters();
    setTimeout(goToNextStep, DELAY_MS);
}