// 盤面の生成(CSS変数を参照)
function generateBoard() {
    const rootStyle = window.getComputedStyle(document.documentElement);
    const cell = Number(rootStyle.getPropertyValue("--cell").trim());
    const repeatCount = cell ** 2;
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

// element
const colorButtonWrapper = document.getElementById("color_button_wrapper");
const stoneCells = Array.from(document.querySelectorAll(".stone-cell"));
const stones = Array.from(document.querySelectorAll(".stone"));
const modalBackground = document.getElementById("modal_background");

// button
const emptyButton = document.getElementById("empty_button");
const colorButtons = document.querySelectorAll(".color-button");
const closeButton = document.getElementById("close");

// 固定値
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
        isValid: true,
    },
    {
        theme: "動物の名前",
        answers: ["犬", "猫", "ライオン", "ゾウ", "キリン", "パンダ", "ゴリラ", "うさぎ", "クジラ", "サメ",],
        isValid: true,
    },
    {
        theme: "和食の名前",
        answers: ["天ぷら", "おにぎり", "うどん", "そば", "肉じゃが", "親子丼", "茶碗蒸し", "味噌汁"],
        isValid: true,
    },
    {
        theme: "洋食の名前",
        answers: ["ハンバーグ", "オムライス", "ナポリタン", "グラタン", "コロッケ", "ドリア", "カレーライス", "ビーフシチュー"],
        isValid: true,
    },
    {
        theme: "中華料理の名前",
        answers: ["餃子", "チャーハン", "麻婆豆腐", "酢豚", "春巻き", "天津飯", "青椒肉絲", "回鍋肉"],
        isValid: true,
    },
    {
        theme: "野菜の名前",
        answers: ["トマト", "きゅうり", "にんじん", "キャベツ", "大根", "じゃがいも", "玉ねぎ", "ピーマン"],
        isValid: true,
    },
    {
        theme: "寿司ネタの名前",
        answers: ["まぐろ", "サーモン", "えび", "いくら", "うに", "たまご", "はまち", "ほたて"],
        isValid: true,
    },
    {
        theme: "飲料の名前",
        answers: ["水", "コーラ", "オレンジジュース", "コーヒー", "紅茶", "緑茶", "牛乳", "スポーツドリンク"],
        isValid: true,
    },
    {
        theme: "職業の名前",
        answers: ["医者", "教師", "警察官", "消防士", "看護師", "料理人", "美容師", "弁護士"],
        isValid: true,
    },
    {
        theme: "虫の名前",
        answers: ["カブトムシ", "クワガタ", "セミ", "チョウ", "トンボ", "バッタ", "カマキリ", "テントウムシ"],
        isValid: true,
    },
    {
        theme: "有名人の名前",
        answers: ["大谷翔平", "羽生結弦", "明石家さんま", "ビートたけし", "木村拓哉", "綾瀬はるか", "福山雅治", "イチロー"],
        isValid: true,
    },
    {
        theme: "キャラクターの名前",
        answers: ["ドラえもん", "ピカチュウ", "ミッキーマウス", "アンパンマン", "孫悟空", "ルフィ", "マリオ", "スヌーピー"],
        isValid: true,
    },
    {
        theme: "飲食チェーン店の名前",
        answers: ["マクドナルド", "すき家", "吉野家", "松屋", "サイゼリヤ", "ガスト", "くら寿司", "丸亀製麺"],
        isValid: true,
    },
    {
        theme: "ボードゲームの名前",
        answers: ["人生ゲーム", "オセロ", "将棋", "囲碁", "チェス", "モノポリー", "UNO", "すごろく"],
        isValid: true,
    },
    {
        theme: "デザートの名前",
        answers: ["プリン", "ケーキ", "アイスクリーム", "パフェ", "ゼリー", "シュークリーム", "パンケーキ", "ティラミス"],
        isValid: true,
    },
    {
        theme: "お菓子の名前",
        answers: ["ポテトチップス", "チョコレート", "クッキー", "ポッキー", "じゃがりこ", "せんべい", "グミ", "キャラメル"],
        isValid: true,
    },
    {
        theme: "文房具の名前",
        answers: ["鉛筆", "消しゴム", "ボールペン", "ノート", "定規", "はさみ", "のり", "ホッチキス"],
        isValid: true,
    },
    {
        theme: "スポーツの名前",
        answers: ["サッカー", "野球", "バスケットボール", "テニス", "水泳", "卓球", "バレーボール", "ゴルフ"],
        isValid: true,
    },
    {
        theme: "花の名前",
        answers: ["桜", "ひまわり", "チューリップ", "バラ", "コスモス", "あじさい", "たんぽぽ", "すみれ"],
        isValid: true,
    },
    {
        theme: "乗り物の名前",
        answers: ["電車", "新幹線", "自動車", "バス", "飛行機", "船", "自転車", "バイク"],
        isValid: true,
    },
    {
        theme: "学校にあるもの",
        answers: ["黒板", "机", "椅子", "教科書", "ランドセル", "体育館", "校庭", "給食"],
        isValid: true,
    },
    {
        theme: "歴史上の人物",
        answers: ["織田信長", "豊臣秀吉", "徳川家康", "坂本龍馬", "聖徳太子", "卑弥呼", "紫式部", "福沢諭吉"],
        isValid: true,
    },
    {
        theme: "電化製品の名前",
        answers: ["テレビ", "冷蔵庫", "洗濯機", "電子レンジ", "掃除機", "エアコン", "ドライヤー", "炊飯器"],
        isValid: true,
    },
    {
        theme: "自然現象の名前",
        answers: ["雨", "雪", "雷", "虹", "地震", "台風", "津波", "火山噴火"],
        isValid: true,
    },
    {
        theme: "ケガや病気の名前",
        answers: ["風邪", "骨折", "やけど", "頭痛", "腹痛", "インフルエンザ", "捻挫", "花粉症"],
        isValid: true,
    },
    {
        theme: "楽器の名前",
        answers: ["ピアノ", "ギター", "ドラム", "バイオリン", "フルート", "トランペット", "サックス", "ハーモニカ"],
        isValid: true,
    },
    {
        theme: "コンビニで買えるもの",
        answers: ["おにぎり", "弁当", "サンドイッチ", "飲み物", "お菓子", "アイス", "雑誌", "ティッシュ"],
        isValid: true,
    },
    {
        theme: "単位の名前",
        answers: ["メートル", "キログラム", "リットル", "台", "房", "冊"],
        isValid: true,
    },
    {
        theme: "日用品の名前",
        answers: ["歯ブラシ", "タオル", "ティッシュ", "トイレットペーパー", "石けん", "シャンプー", "洗剤", "傘"],
        isValid: true,
    },
    {
        theme: "春に関係あるもの",
        answers: ["桜", "入学式", "卒業式", "花見", "花粉症", "新学期", "たんぽぽ", "ひな祭り"],
        isValid: true,
    },
    {
        theme: "夏に関係あるもの",
        answers: ["海", "プール", "花火", "夏祭り", "かき氷", "セミ", "ひまわり", "浴衣"],
        isValid: true,
    },
    {
        theme: "秋に関係あるもの",
        answers: ["紅葉", "栗", "さつまいも", "きのこ", "秋刀魚", "月見", "運動会", "ハロウィン"],
        isValid: true,
    },
    {
        theme: "冬に関係あるもの",
        answers: ["雪", "こたつ", "クリスマス", "お正月", "おでん", "鍋", "スキー", "雪だるま"],
        isValid: true,
    },
    {
        theme: "人体に関係あるもの",
        answers: ["頭", "目", "耳", "鼻", "口", "手", "足", "心臓"],
        isValid: true,
    },
];

// 変数
let currentTeam = null;
let team1 = null;
let team2 = null;
let canMakeEmptyCell = false;

// ボタン選択フェーズ
function addButtonColor() {
    const buttonColor1 = colorButtons[0].id;
    const buttonColor2 = colorButtons[1].id;
    colorButtons[0].style.backgroundColor = COLOR_TABLE[buttonColor1].stoneColor;
    colorButtons[1].style.backgroundColor = COLOR_TABLE[buttonColor2].stoneColor;
}
addButtonColor();

// チームカラーの表示
colorButtons.forEach((button) => button.addEventListener("click", (e) => {
    currentTeam = e.target.id;
    team1 = currentTeam;
    team2 = COLOR_TABLE[currentTeam].opposite;
    showCurrentTeamColor(currentTeam);
    showTeamColors(currentTeam);
    colorButtonWrapper.style.height = "0";
    qtyText.style.display = "block";
    
    stones[14].classList.remove("empty");
    stones[15].classList.remove("empty");
    stones[20].classList.remove("empty");
    stones[21].classList.remove("empty");
    stones[14].classList.add("red");
    stones[15].classList.add("blue");
    stones[20].classList.add("blue");
    stones[21].classList.add("red");
    stones[14].style.backgroundColor = COLOR_TABLE[team1].stoneColor;
    stones[15].style.backgroundColor = COLOR_TABLE[team2].stoneColor;
    stones[20].style.backgroundColor = COLOR_TABLE[team2].stoneColor;
    stones[21].style.backgroundColor = COLOR_TABLE[team1].stoneColor;

    countStones();
}));
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
        
    clearHighlight();
    cell.classList.add("selected");

    topicText.textContent = TOPICS[i];
    openModal();
}

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
}

// keydownイベントの一括管理
document.addEventListener("keydown", handleKeydownEvents);
function handleKeydownEvents(e) {
    if (e.key === "Delete") startEmptyMode();
    if (e.key === "Enter" || e.key === " ") switchTeamColor();
    if (e.key === "Escape") escapeEmptyMode();
}