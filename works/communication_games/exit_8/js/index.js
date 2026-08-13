// ==========
// DATA
// ==========

// HTMLの原本
const baseHTML = `
    <header>
        <div class="header-left">
            <h1 class="header-logo"><span>T</span>aro Shuro's Portfolio</h1>
        </div>
        <div class="header-right">
            <ul class="clear-fix">
                <li><a href="#self-introduction">自己紹介</a></li>
                <li><a href="#sample">実装サンプル</a></li>
                <li id="only_cleared"></li>
            </ul>
        </div>
        <div class="clear"></div>
        <div id="modal_background" class="modal-background">
            <div id="modal" class="modal">
                <div id="close" class="close">
                    <span></span>
                    <span></span>
                </div>
                <h5>異変一覧</h5>
                <ol id="anomalies"></ol>
            </div>
        </div>
    </header>
    <main>
        <div class="top-image"></div>
        <div class="toast-notice" id="toast_notice">異変を検知しました。</div>
        <button type="button" id="prev">引き返す</button>
        <div class="container">
            <div class="self-introduction" id="self-introduction">
                <h2 class ="main-logo">自己紹介<span>Self Introduction</span></h2>
                <div class="introduction-text">
                    <p>私の名前は<span>就労太郎</span>です。アメリカ合衆国出身で現在はディーキャリアITエキスパートにて、プログラミング学習に取り組んでおります。<br />
                    どうぞよろしくお願いいたします。</p>
                </div>
                <img src="images/img01.jpg" class="introduction-image" alt="" />
            </div>
            <div class="signs">
                <div class="current-exit">
                    <ul>
                        <li>出口<span>Exit</span></li>
                        <li id="current_exit"></li>
                        <li>ディーキャリア<span>d-career</span></li>
                        <li>ディーエンカレッジ<span>d-encourage</span></li>
                        <li>ココミライト<span>Cocomilight</span></li>
                    <ul>
                </div>
                <img class="guide" src="images/guide.jpg" alt="" />
            </div>
            <div class="contents">
                <div class="content-box">
                    <h3 class="contents-logo">好きなもの・趣味<span>Favorites</span></h3>
                    <ul class="list favorites">
                      <li>スポーツ観戦</li>
                      <li>読書</li>
                      <li>アウトドア</li>
                    </ul>
                </div>
                <div class="content-box">
                    <h3 class="contents-logo">Webサイト<span>Web Sites</span></h3>
                    <ul class="list websites">
                        <li><a href="https://dd-career.com/" target="_blank" rel="noopener noreferrer">ディーキャリア</a></li>
                        <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">Google</a></li>
                        <li><a href="https://www.yahoo.co.jp/" target="_blank" rel="noopener noreferrer">Yahoo! Japan</a></li>
                    </ul>
                </div>
            </div>
        <div class="sample" id="sample">
            <h2 class="main-logo">実装サンプル<span>Sample</span></h2>
            <div class="gallery">
                <h3 class="logo">画像ギャラリー</h3>
                <div class="gallery-pics">
                    <div class="gallery-pic">
                        <img src="images/gallery01.jpg" alt="宇宙飛行士と月" />
                        <h4 class="pic-title">宇宙飛行士と月</h4>
                        <p>幻想的な色彩の月と雲の前に、宇宙飛行士が立っています。</p>
                    </div>
                    <div class="gallery-pic">
                        <img src="images/gallery02.jpg" alt="朝日と石" />
                        <h4 class="pic-title">朝日と石</h4>
                        <p>積み重ねられた石を、朝日が照らしています。</p>
                    </div>
                    <div class="gallery-pic">
                        <img src="images/gallery03.jpg" alt="鏡のような湖" />
                        <h4 class="pic-title">鏡のような湖</h4>
                        <p>空と海がどちらかわからなくなるような、鏡のような湖です。</p>
                    </div>
                    <div class="gallery-pic">
                        <img src="images/gallery04.jpg" alt="ハートの風船" />
                        <h4 class="pic-title">ハートの風船</h4>
                        <p>青空をバックに、たくさんの色とりどりのハートの風船が浮いています。</p>
                    </div>
                </div>
            </div>
            <h3 class="logo">お問い合わせフォーム</h3>
            <div class="question-forms">
                <div class="must">必須</div><div class="form-title">名前</div>
                <input class="form" id="name_form" type="text" />
                <div class="must">必須</div><div class="form-title">メールアドレス</div>
                <input class="form" id="address_form" type="text" />
                <div class="must">必須</div><div class="form-title">年齢</div>
                <input class="form" id="age_form" type="text" />
                <div class="must">必須</div><div class="form-title">お問い合わせ内容</div>
                <input class="form" id="content_text_form" type="text" />
                <input class="btn" id="send" type="submit" value="送信" />
            </div>
            <div class="javascript">
                <h3 class="logo">JavaScript課題</h3>
                <button class="btn" id="button" type="button">実行！</button>
            </div>
        </div>
        <button type="button" id="next">進む</button>
    </main>
    <footer>
        <p>Copyright &copy; 2022 Taro Shuro</p>
    </footer>
`;

// JavaScript課題
const characters = [
    { name: "たろー", age: 24 },
    { name: "すもも", age: 22 },
    { name: "ことら", age: 17 },
    { name: "はな", age: 15 },
];

const numbers = [
    29342,
    45342,
    23419283,
    148458552
];

const ADULT_AGE = 20;

let hasAnomaly52 = false;
let hasAnomaly53 = false;

let devideNumber = 7;

function showClickEvent() {
    console.log("課題①");
    for (let i = 0; i < characters.length; i++) {
        let isAdult = characters[i].age > ADULT_AGE;
        if (hasAnomaly52 && characters[i].name === "はな") isAdult = true;
        if (isAdult) {
            console.log(
                `${characters[i].name}さんの年齢は${characters[i].age}歳です。${ADULT_AGE}歳を超えています。`
            );
        } else {
            console.log(
                `${characters[i].name}さんの年齢は${characters[i].age}歳です。${ADULT_AGE}歳まで${ADULT_AGE - characters[i].age}年です。`
            );
        }
    }

    console.log("課題②");
    let i = 0;
    while (i < numbers.length) {
        let isOdd = (!hasAnomaly53) ? numbers[i] % 2 === 1 : numbers[i] % 2 === 0;
        if (isOdd) {
            console.log(
                `${numbers[i]}は奇数です。7で割ったあまりは${numbers[i] % devideNumber}です。`
            );
            i++;
        } else {
            console.log(
                `${numbers[i]}は偶数です。7で割ったあまりは${numbers[i] % devideNumber}です。`
            );
            i++;
        }
    }
};

// ==========
// LOGIC
// ==========

// 変数
let isAnomaly = false;
let exitCount = 0;
let previousTheme = null;
let hasCleared = false;

// 固定値
const MAX_COUNT = 8;
const ANOMALY_PROBABILITY = 0.7;

// ページ生成
function createPage() {
    document.body.innerHTML = baseHTML;
    document.getElementById("only_cleared").innerHTML = hasCleared ? `<a id="anomaly_list" href="javascript: void(0);">異変一覧</a>` : "";
    if (hasCleared)  {
        document.getElementById("anomaly_list").addEventListener("click", showUnlockedAnomalyList);
        document.getElementById("anomalies").innerHTML = createAnomalyList();
    }
    document.getElementById("prev").addEventListener("click", (e) => {
        if (isAnomaly) goToNextStage();
        else goBackToFirstLevel();
    });
    document.getElementById("next").addEventListener("click", (e) => {
        if (isAnomaly) goBackToFirstLevel();
        else goToNextStage();
    });
    document.getElementById("current_exit").textContent = `${exitCount} →`;
    document.getElementById("button").addEventListener("click", showClickEvent);
}
createPage();

// 次のページの読み込み
function loadNextPage() {
    clearAllStates();
    document.body.classList.add("fadeout");
    setTimeout(() =>  {
        window.scrollTo(0, 0);
        document.body.className = "";
        isAnomaly = (exitCount === 0 || exitCount > MAX_COUNT) ? false : decideAnomalyBoolean();
        createPage();
        previousTheme = makeAnomaly();

        if (exitCount > MAX_COUNT) showTrueClearEffect();
    }, 500);
}

// 次のステージに進む
function goToNextStage() {
    exitCount ++;
    loadNextPage();
}

// 最初のステージに戻る
function goBackToFirstLevel() {
    const previousAnomalyMessage = previousTheme
        ? `前回の異変は「${previousTheme}」でした。`
        : "前回は異変がありませんでした。";
    exitCount = 0;
    ANOMALIES.forEach((anomaly) => anomaly.isValid = true);
    loadNextPage();
    console.log(previousAnomalyMessage);
}

// 状態リセット
function clearAllStates() {
    if (hasAnomaly52) hasAnomaly52 = false;
    if (hasAnomaly53) hasAnomaly53 = false;
    devideNumber = 7;
    characters[1].age = 22;
    document.title = "Taro Shuro's Portfolio";
    window.removeEventListener("scroll", handleToastNotice);
    console.clear();
}

// クリア画面の表示
function showTrueClearEffect() {
    if (!hasCleared) hasCleared = true;
    document.getElementById("current_exit").textContent = `${MAX_COUNT} →`;
    document.querySelector(".introduction-image").src = "images/clear.jpg";
    document.getElementById("prev").addEventListener("click", goBackToFirstLevel);
    document.getElementById("next").addEventListener("click", goBackToFirstLevel);
}

// 解禁済み「異変」リストの作成
function createAnomalyList() {
    return ANOMALIES.map((anomaly) => `
        <li>${anomaly.isUnlocked ? anomaly.theme : "???"}</li>
    `).join("");
}

// 解禁済み「異変」リストの表示(クリア後)
function showUnlockedAnomalyList() {
    if (!hasCleared) return;

    const modalBackground = document.getElementById("modal_background");
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    modalBackground.classList.add("open");
    document.body.classList.add("no-scroll");

    const closeButton = document.getElementById("close");
    closeButton.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if(e.key === "Escape") {
            closeModal();
        }
    });
}

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

function closeModal() {
    const modalBackground = document.getElementById("modal_background");
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.paddingRight = "";
    modalBackground.classList.remove("open");
    document.body.classList.remove("no-scroll");
}

// 異変状態の決定(7割の確率で異変が起きる)
isAnomaly = exitCount === 0 ? false : decideAnomalyBoolean();   // 最初の一回は確定で異変が起こらない
function decideAnomalyBoolean() {
    return Math.random() < ANOMALY_PROBABILITY;
}

// 異変一覧(マスター)
const ANOMALIES = [
    {
        theme: "CSS崩壊",
        function: breakAllStyles,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "背景色が少しずつ変わっていく",
        function: changeBackgroundColorGradually,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "コンテンツ間の余白が狭い",
        function: decreaseMargin,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "フォントの書式が違う",
        function: changeFontFamily,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "文字サイズが少し大きい",
        function: changeFontSize,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "うそのクリア表示がある",
        function: showFalseClearEffect,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "スクロールできない",
        function: disableScrollBar,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "マウスカーソルが指にならない",
        function: changeCursorPointer,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "文字間隔が少し広い",
        function: changeLetterSpacing,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "トースト通知が出てくる",
        function: makeToastNotice,
        isValid: true,
        isUnlocked: false,
    },
    { 
        theme: "ヘッダーの高さが違う",
        function: changeHeaderHeight, 
        isValid: true,
        isUnlocked: false,
    },
    { 
        theme: "'Taro Shuro's Portfolio' の文字が変わっている",
        function: changeH1Content,
        isValid: true,
        isUnlocked: false,
    },
    { 
        theme: "'Taro' の 'T' の色が消えている",
        function: clearH1SpanColor,
        isValid: true,
        isUnlocked: false,
    },
    { 
        theme: "タイトルが「やっほー！ぼく異変だよー！」",
        function: changePageTitle,
        isValid: true,
        isUnlocked: false,
    },
    { 
        theme: "ヘッダーメニューが消えている",
        function: deleteHeaderMenu,
        isValid: true,
        isUnlocked: false,
    },
    { 
        theme: "背景画像の表示位置が違う",
        function: changeBackgroundPosition,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ヘッダーの透明度がなくなっている",
        function: clearHeaderOpacity,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ヘッダーメニューの表示が逆",
        function: reverseHeaderMenu,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボーダー線が少し厚みがある",
        function: changeBorderWidth,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "'ディーキャリア' が 'ティーキャリア' になっている",
        function: changeDToT,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "自己紹介文の行間が違う",
        function: changeLineHeight,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "木の画像が少しずつ大きくなる",
        function: changeImgSizeGradually,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "木の画像が上下反転している",
        function: invertImg,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "レイアウトがぐちゃぐちゃ",
        function: mixLayout,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボックスの角丸がなくなっている",
        function: unsetBorderRadius,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボックスに影がついている",
        function: addBoxShadow,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "'好きなもの' と 'Webサイト' の配色が逆",
        function: reverseContentColors,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボーダー線の形状が違う",
        function: changeBorderShape,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "リストが黒丸から数字になっている",
        function: changeUlToOl,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "'Google' の 'o' が1こ多い",
        function: addExtraO,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "外部リンクの行き先が違う",
        function: changeLinkHref,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "'Sample' が 'Simple' になっている",
        function: changeAToI,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "作品画像がすべて同じ",
        function: showTheSameWorkImg,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "作品画像が違う",
        function: changeWorkImg,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "作品画像が回転する",
        function: rotateWorkImg,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "作品名がバラバラ",
        function: mixWorkNames,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "画像と作品名の間に余白がある",
        function: makeMarginUnderImg,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "作品の紹介文が違う",
        function: changeWorkText,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "'必須' が '任意' になっている",
        function: changeRequiredToOptional,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "必須マークが5秒に1回揺れる",
        function: shakeRequiredMark,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "フォームハイライトが赤色",
        function: changeFormHighlight,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "送信ボタンを押すとフォームにメッセージが表示される",
        function: showMessageInForm,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "'JavaScript課題' の見出しが大きい",
        function: changeHeadSize,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "実行！ の '！' が '？' になっている",
        function: changeExclamationMark,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボタン効果が付いている",
        function: addButtonEffects,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボタンにボーダー線がついている",
        function: addButtonBorder,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボタンを押してもコンソールが出ない",
        function: unsetButtonEventListener,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "フッターの文字の位置が少しズレている",
        function: shiftFooterText,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "フッターの色が違う",
        function: changeFooterColor,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "フッターの©︎が®︎になっている",
        function: changeCopyrightMark,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "フッターの西暦が2202",
        function: changeFooterYear,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "コンソールの 'すもも' の年齢がおかしい",
        function: changeSumomosAge,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "コンソールの 'はな' が未成年なのに成人の表記になっている",
        function: changeHanasEvaluation,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "コンソールの偶奇の表記が間違っている",
        function: reverseOddAndEven,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "コンソールの数を7で割った余りが間違っている",
        function: changeCalcResult,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ロゴの色が違う",
        function: changeH1Color,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "ボタンラベルが変わる",
        function: changeButtonLabel,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "コンソールの実行ボタンが消える",
        function: deleteConsoleButton,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "フォーム名の順番を変える",
        function: changeFormOrders,
        isValid: true,
        isUnlocked: false,
    },
    {
        theme: "作品画像の順番が違う",
        function: changeWorkImgOrders,
        isValid: true,
        isUnlocked: false,
    },
];

// 異変をつくる
function makeAnomaly() {
    if (!isAnomaly)  {
        return null;
    }
    
    let currentAnomaly = selectCollaboratorsAnomaly();

    if (!currentAnomaly) {
        let randomIndex = Math.floor(Math.random() * ANOMALIES.length);
        do {
            randomIndex = Math.floor(Math.random() * ANOMALIES.length);
        } while (!ANOMALIES[randomIndex].isValid);

        currentAnomaly = ANOMALIES[randomIndex];
    }

    currentAnomaly.function();
    currentAnomaly.isValid = false;
    if (!currentAnomaly.isUnlocked) currentAnomaly.isUnlocked = true;

    return currentAnomaly.theme;
}
previousTheme = makeAnomaly();

// 協力者が作成した異変を必ず出す
function selectCollaboratorsAnomaly() {
    if (exitCount < 5) return null;

    const COLLABORATORS_ANOMALIES = ANOMALIES.slice(55, 60);

    if (COLLABORATORS_ANOMALIES.some((anomaly) => anomaly.isUnlocked === true)) return null;

    const random = Math.floor(Math.random() * COLLABORATORS_ANOMALIES.length);

    return COLLABORATORS_ANOMALIES[random];
}


// CSS崩壊
function breakAllStyles() {
    document.querySelector(".contents").classList.add("anomaly-css-break");
    document.getElementById("sample").classList.add("anomaly-css-break");
}

// 背景色を少しずつ変える
function changeBackgroundColorGradually() {
    document.body.classList.add("anomaly-background-color");
}

// 余白を狭くする
function decreaseMargin() {
    document.querySelectorAll("h2").forEach((h2) => h2.classList.add("anomaly"));
    document.querySelectorAll("h3").forEach((h3) => h3.classList.add("anomaly"));
}

// フォントの書式が違う
function changeFontFamily() {
    document.body.classList.add("anomaly-font-family");
}

// 文字サイズが少し大きい
function changeFontSize() {
    document.querySelectorAll("p").forEach((p) => p.classList.add("anomaly"));
}

// うそのクリア表示
function showFalseClearEffect() {
    document.getElementById("current_exit").textContent = NaN;
    document.querySelector(".introduction-image").src = "images/false_clear.jpg";
}

// スクロールできない
function disableScrollBar() {
    document.body.classList.add("anomaly-scroll-bar");
}

// マウスカーソルが指にならない
function changeCursorPointer() {
    document.querySelectorAll("a").forEach((a) => a.classList.add("anomaly"));
}

// 文字間隔が少し広い
function changeLetterSpacing() {
    document.body.classList.add("anomaly-letter-spacing");
}

// トースト通知が出てくる
function handleToastNotice() {
    if (window.scrollY > 1500) {
        document.getElementById("toast_notice").classList.add("anomaly");
    }
}

function makeToastNotice() {
    window.addEventListener("scroll", handleToastNotice);
}

// ヘッダーの高さが違う
function changeHeaderHeight() {
    document.querySelector("header").classList.add("anomaly-height");
}

// 'Taro Shuro's Portfolio' の文字が変わっている
function changeH1Content() {
    document.querySelector("h1").innerHTML = `
        <span>T</span>aku Shimamoto's Portfolio
    `;
}

// 'Taro' の 'T' の色が消えている
function clearH1SpanColor() {
    document.querySelector("header span").classList.add("anomaly");
}

// タイトルが違う
function changePageTitle() {
    document.title = "やっほー！ぼく異変だよー！";
}

// ヘッダーメニューが消える
function deleteHeaderMenu() {
    document.querySelector(".header-right").classList.add("anomaly");
}

// 背景画像の位置が違う
function changeBackgroundPosition() {
    document.querySelector(".top-image").classList.add("anomaly");
}

// ヘッダーの透明度がなくなる
function clearHeaderOpacity() {
    document.querySelector("header").classList.add("anomaly-opacity");
}

// ヘッダーメニューの表示が逆
function reverseHeaderMenu() {
    document.querySelector(".clear-fix").innerHTML = `
        <li><a href="#sample">実装サンプル</a></li>
        <li><a href="#self-introduction">自己紹介</a></li>
    `;
}

// ボーダー線に少し厚みがある
function changeBorderWidth() {
    document.querySelectorAll("h3").forEach((h3) => h3.classList.add("anomaly-border-width"));
}

// ディーキャリアがティーキャリアになっている
function changeDToT() {
    document.querySelector(".introduction-text").innerHTML = `
        <p>
            私の名前は<span>就労太郎</span>です。アメリカ合衆国出身で現在はティーキャリアITエキスパートにて、プログラミング学習に取り組んでおります。<br />
            どうぞよろしくお願いいたします。
        </p>
    `;
}

// 自己紹介文の行間が違う
function changeLineHeight() {
    document.querySelector(".introduction-text").classList.add("anomaly");
}

// 木の画像が少しずつ大きくなる
function changeImgSizeGradually() {
    document.querySelector(".introduction-image").classList.add("anomaly-scale");
}

// 木の画像が上下反転している
function invertImg() {
    document.querySelector(".introduction-image").classList.add("anomaly-inverted");
}

// レイアウトがぐちゃぐちゃ
function mixLayout() {
    anomalyHTML = `
    <header>
        <div class="header-left">
            <h1 class="header-logo"><span>T</span>aro Shuro's Portfolio</h1>
        </div>
        <div class="header-right">
            <ul class="clear-fix">
                <li><a href="#self-introduction">自己紹介</a></li>
                <li><a href="#sample">実装サンプル</a></li>
            </ul>
        </div>
        <div class="clear"></div>
    </header>
    <main>
        <div class="top-image"></div>
        <button type="button" id="prev">引き返す</button>
        <div class="container">
            <div class="self-introduction" id="self-introduction">
                <h2 class ="main-logo">自己紹介<span>Self Introduction</span></h2>
                <div class="introduction-text">
                    <p>私の名前は<span>就労太郎</span>です。アメリカ合衆国出身で現在はディーキャリアITエキスパートにて、プログラミング学習に取り組んでおります。<br />
                    どうぞよろしくお願いいたします。</p>
                </div>
                <img src="images/img01.jpg" class="introduction-image" alt="" />
            </div>
            <h3 class="logo">画像ギャラリー</h3>
            <div class="gallery-pics">
                <div class="gallery-pic">
                    <img src="images/gallery01.jpg" alt="宇宙飛行士と月" />
                    <h4 class="pic-title">宇宙飛行士と月</h4>
                    <p>幻想的な色彩の月と雲の前に、宇宙飛行士が立っています。</p>
                </div>
                <div class="gallery-pic">
                    <img src="images/gallery02.jpg" alt="朝日と石" />
                    <h4 class="pic-title">朝日と石</h4>
                    <p>積み重ねられた石を、朝日が照らしています。</p>
                </div>
                <div class="gallery-pic">
                    <img src="images/gallery03.jpg" alt="鏡のような湖" />
                    <h4 class="pic-title">鏡のような湖</h4>
                    <p>空と海がどちらかわからなくなるような、鏡のような湖です。</p>
                </div>
                <div class="gallery-pic">
                    <img src="images/gallery04.jpg" alt="ハートの風船" />
                    <h4 class="pic-title">ハートの風船</h4>
                    <p>青空をバックに、たくさんの色とりどりのハートの風船が浮いています。</p>
                </div>
            </div>
            <h3 class="logo">JavaScript課題</h3>
            <button class="btn" id="button" type="button">実行！</button>
            <div class="contents">
                <div class="content-box">
                    <h3 class="contents-logo">好きなもの・趣味<span>Favorites</span></h3>
                    <ul class="list favorites">
                      <li>スポーツ観戦</li>
                      <li>読書</li>
                      <li>アウトドア</li>
                    </ul>
                </div>
                <div class="content-box">
                    <h3 class="contents-logo">Webサイト<span>Web Sites</span></h3>
                    <ul class="list websites">
                        <li><a href="https://dd-career.com/" target="_blank" rel="noopener noreferrer">ディーキャリア</a></li>
                        <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">Google</a></li>
                        <li><a href="https://www.yahoo.co.jp/" target="_blank" rel="noopener noreferrer">Yahoo! Japan</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="sample" id="sample">
            <h2 class="main-logo">実装サンプル<span>Sample</span></h2>
            <div class="gallery">
            </div>
            <h3 class="logo">お問い合わせフォーム</h3>
            <div class="question-forms">
                <div class="must">必須</div><div class="form-title">名前</div>
                <input class="form" id="name_form" type="text" />
                <div class="must">必須</div><div class="form-title">メールアドレス</div>
                <input class="form" id="address_form" type="text" />
                <div class="must">必須</div><div class="form-title">年齢</div>
                <input class="form" id="age_form" type="text" />
                <div class="must">必須</div><div class="form-title">お問い合わせ内容</div>
                <input class="form" id="content_text_form" type="text" />
                <input class="btn" id="send" type="submit" value="送信" />
            </div>
        </div>
        <button type="button" id="next">進む</button>
    </main>
    <footer>
        <p>Copyright &copy; 2022 Taro Shuro</p>
    </footer>
`;
    document.body.innerHTML = anomalyHTML;
    document.getElementById("prev").addEventListener("click", (e) => {
        if (isAnomaly) goToNextStage();
        else goBackToFirstLevel();
    });
    document.getElementById("next").addEventListener("click", (e) => {
        if (isAnomaly) goBackToFirstLevel();
        else goToNextStage();
    });
}

// ボックスの角丸がなくなっている
function unsetBorderRadius() {
    document.querySelectorAll(".content-box").forEach((box) => box.classList.add("anomaly-radius"));
}

// ボックスに影がついている
function addBoxShadow() {
    document.querySelectorAll(".content-box").forEach((box) => box.classList.add("anomaly-shadow"));
}

// '好きなもの' と 'Webサイト' の配色が逆
function reverseContentColors() {
    document.querySelector(".favorites").classList.add("anomaly-color");
    document.querySelector(".websites").classList.add("anomaly-color");
}

// ボーダー線の形状が違う
function changeBorderShape() {
    document.querySelectorAll(".contents-logo").forEach((logo) => logo.classList.add("anomaly"));
}   

// リストが黒丸から数字になっている
function changeUlToOl() {
    document.querySelector(".contents").innerHTML = `
        <div class="content-box">
            <h3 class="contents-logo">好きなもの・趣味<span>Favorites</span></h3>
            <ol class="list favorites">
              <li>スポーツ観戦</li>
              <li>読書</li>
              <li>アウトドア</li>
            </ol>
        </div>
        <div class="content-box">
            <h3 class="contents-logo">Webサイト<span>Web Sites</span></h3>
            <ol class="list websites">
                <li><a href="https://dd-career.com/" target="_blank" rel="noopener noreferrer">ディーキャリア</a></li>
                <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">Google</a></li>
                <li><a href="https://www.yahoo.co.jp/" target="_blank" rel="noopener noreferrer">Yahoo! Japan</a></li>
            </ol>
        </div>
    `;
}

//'Google' の 'o' が1こ多い
function addExtraO() {
    document.querySelector(".websites li:nth-of-type(2) a").textContent = "Gooogle";
}

// 外部リンクの行き先が違う
function changeLinkHref() {
    document.querySelector(".websites li:first-of-type a").href = "https://taku-shimamoto.github.io/portfolio/index.html";
}

// 'Sample' が 'Simple' になっている
function changeAToI() {
    document.querySelector(".sample h2 span").textContent = "Simple";
}

// 作品画像がすべて同じ
function showTheSameWorkImg() {
    document.querySelectorAll(".gallery-pic img").forEach((img) => img.src = "images/gallery01.jpg");
}

// 作品画像が違う
function changeWorkImg() {
    document.querySelector(".gallery-pic:nth-of-type(3) img").src = "images/shimamoto.png";
    document.querySelector(".gallery-pic:nth-of-type(3) h4").textContent = "今回の仕掛け人";
    document.querySelector(".gallery-pic:nth-of-type(3) p").textContent = "今回の仕掛け人は島本でした。こんな理不尽な異変ばかりつくる人を許してはいけません。";
}

// 作品画像が回転する
function rotateWorkImg() {
    document.querySelector(".gallery-pic:nth-of-type(2) img").classList.add("anomaly");
}

// 作品名がバラバラ
function mixWorkNames() {
    const workNames = document.querySelectorAll("h4");
    workNames[0].textContent = "ハートの風船";
    workNames[1].textContent = "鏡のような湖";
    workNames[2].textContent = "宇宙飛行士と月";
    workNames[3].textContent = "朝日と石";
}

// 画像と作品名の間に余白がある
function makeMarginUnderImg() {
    document.querySelector(".gallery-pics").classList.add("anomaly");
}

// 作品の紹介文が違う
function changeWorkText() {
    const workTexts = document.querySelectorAll(".gallery-pic p");
    workTexts[0].textContent = "幻想的な色彩の月と雲の前に、知らない人が立っています。";
    workTexts[1].textContent = "積み重ねられた石を、夕日が照らしています。";
    workTexts[2].textContent = "空と海がどちらかわからなくなるような、湖のような鏡です。";
    workTexts[3].textContent = "青空をバックに、たくさんの色とりどりのハートの異変が浮いています。";
}

// '必須' が '任意' になっている
function changeRequiredToOptional() {
    document.querySelectorAll(".must").forEach((must) => must.textContent = "任意");
}

// 必須マークが5秒に1回揺れる
function shakeRequiredMark() {
    document.querySelector(".must").classList.add("anomaly");
}

// フォームハイライトが赤色
function changeFormHighlight() {
    document.querySelectorAll("input[type='text']").forEach((form) => form.classList.add("anomaly"));
}

// 送信ボタンを押すとフォームにメッセージを表示する
function showMessageInForm() {
    document.getElementById("send").addEventListener("click", () => {
        document.querySelector(".form:nth-of-type(3)").value = "異変探し、頑張ってる？？？";
    });
}

// 'JavaScript課題' の見出しが大きい
function changeHeadSize() {
    document.querySelector(".javascript").innerHTML = `
        <h2 class="main-logo">JavaScript課題<span>JavaScript</span></h2>
        <button class="btn" id="button" type="button">実行！</button>
    `;
}

// 実行！ の '！' が '？' になっている
function changeExclamationMark() {
    document.getElementById("button").textContent = "実行？";
}

// ボタン効果がついている
function addButtonEffects() {
    document.querySelectorAll(".btn").forEach((btn) => btn.classList.add("anomaly-effect"));
}

// ボタンにボーダー線がついている
function addButtonBorder() {
    document.querySelectorAll(".btn").forEach((btn) => btn.classList.add("anomaly-border"));
}

// ボタンを押してもコンソールが出ない
function unsetButtonEventListener() {
    let clickCount = 0;
    document.getElementById("button").removeEventListener("click", showClickEvent);
    document.getElementById("button").addEventListener("click", () => {
        clickCount ++;
        if (clickCount === 5) console.log("どうしたの？");
        if (clickCount === 6) console.log("え？JavaScript課題が出てこないって？");
        if (clickCount === 7) console.log("うーん、異変ちゃんのしわざじゃないかなぁ...？");
        if (clickCount === 8) console.log("心配だったら引き返してみてごらん！");
    });
}

// フッターの文字位置が少しずれる
function shiftFooterText() {
    document.querySelector("footer p").classList.add("anomaly");
}

// フッターの色が違う
function changeFooterColor() {
    document.querySelector("footer").classList.add("anomaly");
}

// フッターの©︎が®︎になっている
function changeCopyrightMark() {
    document.querySelector("footer p").textContent = "Copyright Ⓡ 2022 Taro Shuro";
}

// フッターの西暦が2202
function changeFooterYear() {
    document.querySelector("footer p").textContent = `Copyright © 2202 Taro Shuro`;
}

// コンソールの 'すもも' の年齢がおかしい
function changeSumomosAge() {
    characters[1].age = undefined;
}

// コンソールの 'はな' が未成年なのに成人の表記になっている
function changeHanasEvaluation() {
    hasAnomaly52 = true;
}

// コンソールの偶奇の表記が間違っている
function reverseOddAndEven() {
    hasAnomaly53 = true;
}

// コンソールの数を7で割った余りが間違っている
function changeCalcResult() {
    devideNumber = numbers[0];
}

// ロゴの色が違う
function changeH1Color() {
    document.querySelector("h1").style.color = "#ccc";
}

// ボタンラベルが違う
function changeButtonLabel() {
    document.querySelector("#button").textContent = "Console!";
}

// コンソールの実行ボタンが消える
function deleteConsoleButton() {
    document.querySelector("#button").addEventListener("click", (e) => {
        e.target.style.display = "none";
    });
}

// フォーム名の順番が違う
function changeFormOrders() {
    const forms = document.querySelectorAll(".form-title");
    forms[0].textContent = "年齢";
    forms[1].textContent = "名前";
    forms[2].textContent = "メールアドレス";
    forms[3].textContent = "お問い合わせ内容";

}

// 作品画像の順番が違う
function changeWorkImgOrders() {
    const workImgs = document.querySelectorAll(".gallery-pic img");
    workImgs[0].src = "images/gallery01.jpg";
    workImgs[1].src = "images/gallery03.jpg";
    workImgs[2].src = "images/gallery02.jpg";
    workImgs[3].src = "images/gallery04.jpg";
}