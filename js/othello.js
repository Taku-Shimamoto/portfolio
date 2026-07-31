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
            "水平思考クイズ",   // difficult(左上)
            "くだものの名前",
            "動物の名前",
            "和食の名前",
            "水平思考クイズ",     // difficult(右上)
            "洋食の名前",
            "中華料理の名前",
            "野菜の名前",
            "寿司ネタの名前",
            "飲料の名前",
            "職業の名前",
            "虫の名前",
            "水平思考クイズ",  // difficult(中央)
            "有名人の名前",
            "キャラクターの名前",
            "飲食チェーン店の名前",
            "ボードゲームの名前",
            "デザートの名前",
            "お菓子の名前",
            "文房具の名前",
            "水平思考クイズ", // difficult(左下)
            "スポーツの名前",
            "花の名前",
            "乗り物の名前",
            "水平思考クイズ", // difficult(右下)
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
            stones[21].classList.add("red");
            stones[15].classList.add("blue");
            stones[20].classList.add("blue");
            stones[14].style.backgroundColor = COLOR_TABLE[team1].stoneColor;
            stones[21].style.backgroundColor = COLOR_TABLE[team1].stoneColor;
            stones[15].style.backgroundColor = COLOR_TABLE[team2].stoneColor;
            stones[20].style.backgroundColor = COLOR_TABLE[team2].stoneColor;
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

            topicText.textContent = "";
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
        document.addEventListener("keydown", (e) => hundleKeydownEvents(e));
        function hundleKeydownEvents(e) {
            if (e.key === "Delete") startEmptyMode();
            if (e.key === "Enter" || e.key === " ") switchTeamColor();
            if (e.key === "Escape")  {
                clearHighlight();
                escapeEmptyMode();
            }
        }