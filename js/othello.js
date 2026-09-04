// CSS変数の取得
const rootStyle = window.getComputedStyle(document.documentElement);
const n = Number(rootStyle.getPropertyValue("--cell").trim());

// 盤面の生成(CSS変数を参照)
function generateBoard() {
    const repeatCount = n ** 2;
    const boardElement = document.getElementById("board");

    boardElement.innerHTML = `
        <div class="stone-cell">
            <div class="stone empty"></div>
        </div>`
        .repeat(repeatCount);
}
generateBoard();

// DOM
// text
const teamColorText = document.getElementById("team_color");
const requestText = document.getElementById("request");
const team1ColorText = document.getElementById("team1_color");
const team2ColorText = document.getElementById("team2_color");
const team1CountText = document.getElementById("team1_count");
const team2CountText = document.getElementById("team2_count");
const qtyText = document.getElementById("qty");
const topicText = document.getElementById("topic");
const answerText = document.getElementById("answer");

// element
const colorButtonWrapper = document.getElementById("color_button_wrapper");
const stoneCells = Array.from(document.querySelectorAll(".stone-cell"));
const stones = Array.from(document.querySelectorAll(".stone"));
const modalBackground = document.getElementById("modal_background");

// button
const emptyButton = document.getElementById("empty_button");
const colorButtons = document.querySelectorAll(".color-button");
const answerButton = document.getElementById("answer_button");
const closeButton = document.getElementById("close");

// Data
const COLOR_TABLE = {
    red: { 
        name: "赤",
        backgroundColor: "#feea",
        textColor: "#f00",
        stoneColor: "#faa",
        opposite: "blue",
    },

    blue: {
        name: "青",
        backgroundColor: "#eefa",
        textColor:"#00a",
        stoneColor: "#aaf",
        opposite: "red",
    },

    black: { 
        name: "黒",
        backgroundColor: "#ccca",
        textColor: "#000",
        stoneColor: "#000",
        opposite: "white",
    },

    white: {
        name: "白",
        backgroundColor: "#fff",
        textColor:"#000",
        stoneColor: "#fff",
        opposite: "black",
    },
}

const TOPICS = [
    {
        theme: "くだものの名前",
        answers: ["ぶどう", "レモン", "いちご", "スイカ", "メロン", "みかん", "りんご", "バナナ"],
    },
    {
        theme: "動物の名前",
        answers: ["犬", "猫", "ライオン", "ゾウ", "キリン", "パンダ", "ゴリラ", "キジ", "クジラ", "サメ",],
    },
    {
        theme: "和食の名前",
        answers: ["天ぷら", "おにぎり", "うどん", "そば", "肉じゃが", "親子丼", "茶碗蒸し", "味噌汁"],
    },
    {
        theme: "洋食の名前",
        answers: ["ハンバーグ", "オムライス", "ナポリタン", "グラタン", "コロッケ", "ドリア", "カレーライス", "ビーフシチュー"],
    },
    {
        theme: "中華料理の名前",
        answers: ["餃子", "チャーハン", "麻婆豆腐", "酢豚", "春巻き", "天津飯", "青椒肉絲", "回鍋肉"],
    },
    {
        theme: "野菜の名前",
        answers: ["トマト", "きゅうり", "にんじん", "キャベツ", "大根", "じゃがいも", "玉ねぎ", "ピーマン"],
    },
    {
        theme: "寿司ネタの名前",
        answers: ["まぐろ", "サーモン", "えび", "いくら", "うに", "たまご", "はまち", "ほたて"],
    },
    {
        theme: "飲料の名前",
        answers: ["水", "コーラ", "オレンジジュース", "コーヒー", "紅茶", "緑茶", "牛乳", "スポーツドリンク"],
    },
    {
        theme: "職業の名前",
        answers: ["医者", "教師", "警察官", "消防士", "看護師", "料理人", "美容師", "弁護士"],
    },
    {
        theme: "虫の名前",
        answers: ["カブトムシ", "クワガタ", "セミ", "チョウ", "トンボ", "バッタ", "カマキリ", "テントウムシ"],
    },
    {
        theme: "有名人の名前",
        answers: ["大谷翔平", "羽生結弦", "明石家さんま", "ビートたけし", "木村拓哉", "綾瀬はるか", "福山雅治", "イチロー"],
    },
    {
        theme: "キャラクターの名前",
        answers: ["ドラえもん", "ピカチュウ", "ミッキーマウス", "アンパンマン", "孫悟空", "ルフィ", "マリオ", "スヌーピー"],
    },
    {
        theme: "飲食チェーン店の名前",
        answers: ["マクドナルド", "すき家", "吉野家", "松屋", "サイゼリヤ", "ガスト", "くら寿司", "丸亀製麺"],
    },
    {
        theme: "ボードゲームの名前",
        answers: ["人生ゲーム", "オセロ", "将棋", "囲碁", "チェス", "モノポリー", "UNO", "すごろく"],
    },
    {
        theme: "デザートの名前",
        answers: ["プリン", "ケーキ", "アイスクリーム", "パフェ", "ゼリー", "シュークリーム", "パンケーキ", "ティラミス"],
    },
    {
        theme: "お菓子の名前",
        answers: ["ポテトチップス", "チョコレート", "クッキー", "ポッキー", "じゃがりこ", "せんべい", "グミ", "キャラメル"],
    },
    {
        theme: "文房具の名前",
        answers: ["鉛筆", "消しゴム", "ボールペン", "ノート", "定規", "はさみ", "のり", "ホッチキス"],
    },
    {
        theme: "スポーツの名前",
        answers: ["サッカー", "野球", "バスケットボール", "テニス", "水泳", "卓球", "バレーボール", "ゴルフ"],
    },
    {
        theme: "花の名前",
        answers: ["桜", "ひまわり", "チューリップ", "バラ", "コスモス", "あじさい", "たんぽぽ", "すみれ"],
    },
    {
        theme: "乗り物の名前",
        answers: ["電車", "新幹線", "自動車", "バス", "飛行機", "船", "自転車", "バイク"],
    },
    {
        theme: "学校にあるもの",
        answers: ["黒板", "机", "椅子", "教科書", "ランドセル", "体育館", "校庭", "給食"],
    },
    {
        theme: "歴史上の人物",
        answers: ["織田信長", "豊臣秀吉", "徳川家康", "坂本龍馬", "聖徳太子", "卑弥呼", "紫式部", "福沢諭吉"],
    },
    {
        theme: "電化製品の名前",
        answers: ["テレビ", "冷蔵庫", "洗濯機", "電子レンジ", "掃除機", "エアコン", "ドライヤー", "炊飯器"],
    },
    {
        theme: "自然現象の名前",
        answers: ["雨", "雪", "雷", "虹", "地震", "台風", "津波", "火山噴火"],
    },
    {
        theme: "ケガや病気の名前",
        answers: ["風邪", "骨折", "やけど", "頭痛", "腹痛", "インフルエンザ", "捻挫", "花粉症"],
    },
    {
        theme: "楽器の名前",
        answers: ["ピアノ", "ギター", "ドラム(太鼓でもOK)", "バイオリン", "フルート", "トランペット", "ハーモニカ"],
    },
    {
        theme: "コンビニで買えるもの",
        answers: ["おにぎり", "弁当", "サンドイッチ", "飲み物", "お菓子", "アイス", "雑誌", "ティッシュ"],
    },
    {
        theme: "単位の名前",
        answers: ["メートル", "キログラム", "リットル", "台", "房", "冊"],
    },
    {
        theme: "日用品の名前",
        answers: ["歯ブラシ", "タオル", "ティッシュ", "トイレットペーパー", "石けん", "シャンプー", "洗剤", "傘"],
    },
    {
        theme: "春に関係あるもの",
        answers: ["桜", "入学式", "卒業式", "花見", "花粉症", "新学期", "たんぽぽ", "ひな祭り"],
    },
    {
        theme: "夏に関係あるもの",
        answers: ["海", "プール", "花火", "夏祭り", "かき氷", "セミ", "ひまわり", "浴衣"],
    },
    {
        theme: "秋に関係あるもの",
        answers: ["紅葉", "栗", "さつまいも", "きのこ", "秋刀魚", "月見", "ハロウィン"],
    },
    {
        theme: "冬に関係あるもの",
        answers: ["雪", "こたつ", "クリスマス", "お正月", "おでん", "鍋", "スキー", "雪だるま"],
    },
    {
        theme: "人体に関係あるもの",
        answers: ["目", "耳", "鼻", "口", "手", "足", "心臓"],
    },
];

// 変数
const h = Math.floor(n / 2);
const corners = [
    0,
    n - 1,
    n ** 2 - n,
    n ** 2 - 1,
];
const centers = [
    n * (h - 1) + (h - 1),
    n * (h - 1) + h,
    n * h + (h - 1),
    n * h + h,
];

// 固定値
const UPPER_LEFT = 0;       // 左上のインデックス番号
const UPPER_RIGHT = 1;      // 右上のインデックス番号
const LOWER_LEFT = 2;       // 左下のインデックス番号
const LOWER_RIGHT = 3;      // 右下のインデックス番号

// 状態
let currentTeam = null;
let team1 = null;
let team2 = null;
let canMakeEmptyCell = false;
let isVisible = false;

// ボタン選択フェーズ
function addButtonColor() {
    const buttonColor1 = colorButtons[0].id;
    const buttonColor2 = colorButtons[1].id;
    colorButtons[0].style.backgroundColor = COLOR_TABLE[buttonColor1].stoneColor;
    colorButtons[1].style.backgroundColor = COLOR_TABLE[buttonColor2].stoneColor;
}
addButtonColor();

// チームカラーの表示
function decideTeamColors(e) {
    currentTeam = e.target.id;
    team1 = currentTeam;
    team2 = COLOR_TABLE[currentTeam].opposite;
    showCurrentTeamColor(currentTeam);
    showTeamColors(currentTeam);
    colorButtonWrapper.style.height = "0";
    qtyText.style.display = "block";
    
    for (let i = 0; i < centers.length; i ++) {
        stones[centers[i]].classList.remove("empty");

        if (i === UPPER_LEFT || i === LOWER_RIGHT) {
            stones[centers[i]].classList.add(currentTeam);
            stones[centers[i]].style.backgroundColor = COLOR_TABLE[team1].stoneColor;
        } else {
            stones[centers[i]].classList.add(COLOR_TABLE[currentTeam].opposite);
            stones[centers[i]].style.backgroundColor = COLOR_TABLE[team2].stoneColor;
        }
    }

    for (let i = 0; i < corners.length; i ++) {
        stoneCells[corners[i]].classList.add("corner");
    }

    countStones();
}
colorButtons.forEach((button) => button.addEventListener("click", (e) => decideTeamColors(e)));

function showCurrentTeamColor(currentTeam) {
    teamColorText.textContent = COLOR_TABLE[currentTeam].name;
    teamColorText.style.color = COLOR_TABLE[currentTeam].textColor;
    document.body.style.backgroundColor = COLOR_TABLE[currentTeam].backgroundColor;
    showRequestMessage();
}

// リクエストメッセージの表示
function showRequestMessage() {
    requestText.textContent = currentTeam ? "チームの番です。" : "先攻のチームを決定してください。";
}

// チームカラーの表示
function showTeamColors(currentTeam) {
    team1ColorText.textContent = COLOR_TABLE[currentTeam].name;
    team2ColorText.textContent = COLOR_TABLE[COLOR_TABLE[currentTeam].opposite].name;
}

// 石の数を表示
function countStones() {
    const team1Stones = document.querySelectorAll(`.${team1}`).length;
    const team2Stones = document.querySelectorAll(`.${team2}`).length;

    team1CountText.textContent = team1Stones;
    team2CountText.textContent = team2Stones;
}
countStones();

// 色を消せる状態を付与
function startEmptyMode() {
    const isBeforeStarting = stones.every((stone) => stone.classList.contains("empty"));
    if (isBeforeStarting) return;

    canMakeEmptyCell = true;

    teamColorText.textContent = "";
    requestText.textContent = "削除する場所をクリックしてください。Escキーを押すとキャンセルできます。";
}

// エスケープモードのキャンセル
function escapeEmptyMode() {
    if (canMakeEmptyCell) canMakeEmptyCell = false;

    teamColorText.textContent = COLOR_TABLE[currentTeam].name;
    teamColorText.style.color = COLOR_TABLE[currentTeam].textColor;
    showRequestMessage();
}

// 石の色を消す
function emptyCell(e, stone) {
    if (!canMakeEmptyCell) return;
    if (e.target.classList.contains("empty")) return;

    stone.classList.remove("team1");
    stone.classList.remove("team2");
    stone.classList.remove(`${team1}`);
    stone.classList.remove(`${team2}`);
    stone.style.backgroundColor = "";
    stone.classList.add("empty");

    canMakeEmptyCell = false;

    teamColorText.textContent = COLOR_TABLE[currentTeam].name;
    teamColorText.style.color = COLOR_TABLE[currentTeam].textColor;
    countStones();
    showRequestMessage();
}

// ハイライトのクリア
function clearHighlight() {
    stoneCells.forEach((cell) => cell.classList.remove("selected"));
}

stoneCells.forEach((cell, i) => {
    const stone = cell.querySelector(".stone");

    cell.addEventListener("click", (e) => openTopic(stone, e, cell, i));
    stone.addEventListener("click", (e) => changeStoneColor(e, stone));
});

// お題を出す
function openTopic(stone, e, cell, i) {
    if (!currentTeam || canMakeEmptyCell) return;
    if (stone.contains(e.target)) {
        topicText.textContent = "";
        return;
    }

    const isCenter =
        i === centers[UPPER_LEFT] || i === centers[UPPER_RIGHT] || i === centers[LOWER_LEFT] || i === centers[LOWER_RIGHT];

    if (isCenter) return;
        
    clearHighlight();
    cell.classList.add("selected");

    // 四つ角判定
    const isCorner = 
        i === corners[UPPER_LEFT] || i === corners[UPPER_RIGHT] || i === corners[LOWER_LEFT] || i === corners[LOWER_RIGHT];

    answerButton.disabled = isCorner;

    if (isCorner) {
        topicText.textContent = "水平思考クイズ";
    } else {
        // お題と答えをランダムで選ぶ
        const randomTopicIndex = Math.floor(Math.random() * TOPICS.length);
        const randomSelectedTopic = TOPICS[randomTopicIndex];
        const randomAnswerIndex = Math.floor(Math.random() * randomSelectedTopic.answers.length);
        const randomSelectedAnswer = randomSelectedTopic.answers[randomAnswerIndex];

        topicText.textContent = randomSelectedTopic.theme;
        answerText.textContent = randomSelectedAnswer;

        // 選ばれた答えを配列から削除
        // 配列が0になったら、お題そのものを削除
        randomSelectedTopic.answers.splice(randomAnswerIndex, 1);
        if (randomSelectedTopic.answers.length === 0) {
            TOPICS.splice(randomTopicIndex, 1);
        }
    }

    openModal();
}

// 答えの表示/非表示
function toggleAnswerVisibility() {
    answerText.classList.toggle("visible");
    isVisible = answerText.classList.contains("visible");
    const buttonLabel = isVisible ? "答えを非表示" : "答えを表示";
    answerButton.textContent = buttonLabel;
}
answerButton.addEventListener("click", toggleAnswerVisibility);

// 石の色を変更する
function changeStoneColor(e, stone) {
    if (!currentTeam) return;

    if (canMakeEmptyCell) {
        emptyCell(e, stone);
        return;
    }

    removeEmptyClass(stone);
    reverseStone(stone);
    countStones();
}

// empty クラスの消去
function removeEmptyClass(stone) {
    const isEmpty = stone.classList.contains("empty");

    if(!isEmpty) return;
    stone.classList.remove("empty");
}

// 石を裏返す
function reverseStone(stone) {
    const oppositeTeam = COLOR_TABLE[currentTeam].opposite;

    if (stone.classList.contains(currentTeam)) {
        stone.classList.remove(currentTeam);
        stone.classList.add(oppositeTeam);
        stone.style.backgroundColor = COLOR_TABLE[oppositeTeam].stoneColor;
    } else {
        stone.classList.remove(oppositeTeam);
        stone.classList.add(currentTeam);
        stone.style.backgroundColor = COLOR_TABLE[currentTeam].stoneColor;
    }
}

// チームカラーの切り替え
function switchTeamColor() {
    if (!currentTeam) return;

    canMakeEmptyCell = false;

    currentTeam = COLOR_TABLE[currentTeam].opposite;
    showCurrentTeamColor(currentTeam);
}

// モーダルの表示
function openModal() {
    modalBackground.classList.add("open");
}

closeButton.addEventListener("click", closeModal);
function closeModal() {
    modalBackground.classList.remove("open");
    answerText.classList.remove("visible");
}

// keydownイベントの一括管理
document.addEventListener("keydown", (e) => handleKeydownEvents(e));
function handleKeydownEvents(e) {
    if (e.key === "Delete") startEmptyMode();
    if (e.key === "Enter" || e.key === " ") switchTeamColor();
    if (e.key === "Escape") escapeEmptyMode();
}