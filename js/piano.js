            // DOM

            const dom = {

                titleText: document.getElementById("title"),

                currentSoundText: document.getElementById("current_sound"),

                soundArea: document.getElementById("sounds"),

                autoPlayButton: document.getElementById("autoplay_button"),

                toggleSoundNameButton: document.getElementById("toggle_soundname_button"),                

            };



            // 手動演奏によるUIを消すためのミリ秒

            const ERASE_MS = 1000;



            // 各鍵盤データ

            const KEY_DEFS = {

                natural: [

                    {

                        id: "do",

                        audioSrc: "sounds/maou_se_inst_piano1_1do.m4a",

                        buttonClass: "natural",

                    },

                    {

                        id: "re",

                        audioSrc: "sounds/maou_se_inst_piano1_2re.m4a",

                        buttonClass: "natural",

                    },

                    { 

                        id: "mi",

                        audioSrc: "sounds/maou_se_inst_piano1_3mi.m4a",

                        buttonClass: "natural",

                    },

                    {

                        id: "fa",

                        audioSrc: "sounds/maou_se_inst_piano1_4fa.m4a",

                        buttonClass: "natural",

                    },

                    { 

                        id: "so",

                        audioSrc: "sounds/maou_se_inst_piano1_5so.m4a",

                        buttonClass: "natural",

                    },

                    { 

                        id: "ra",

                        audioSrc: "sounds/maou_se_inst_piano1_6ra.m4a",

                        buttonClass: "natural",

                    },

                    { 

                        id: "si",

                        audioSrc: "sounds/maou_se_inst_piano1_7si.m4a",

                        buttonClass: "natural",

                    },

                    { 

                        id: "higher_do",

                        audioSrc: "sounds/maou_se_inst_piano1_8do.m4a",

                        buttonClass: "natural",

                    },

                ],

                sharp: [

                    { 

                        id: "sharp_do",

                        audioSrc: "sounds/maou_se_inst_piano1_1do_pitch_plus_1.m4a",

                        buttonClass: "sharp",

                    },

                    {

                        id: "sharp_re",

                        audioSrc: "sounds/maou_se_inst_piano1_2re_pitch_plus_1.m4a",

                        buttonClass: "sharp",

                    },

                    { 

                        id: "sharp_fa",

                        audioSrc: "sounds/maou_se_inst_piano1_4fa_pitch_plus_1.m4a",

                        buttonClass: "sharp",

                    },

                    { 

                        id: "sharp_so",

                        audioSrc: "sounds/maou_se_inst_piano1_5so_pitch_plus_1.m4a",

                        buttonClass: "sharp",

                    },

                    { 

                        id: "sharp_ra",

                        audioSrc: "sounds/maou_se_inst_piano1_6ra_pitch_plus_1.m4a",

                        buttonClass: "sharp",

                    },

                ],

            };



            // DOM, Audio, ボタンをKEY_DEFSから生成して保持

            const keyRegistry = {

                natural: KEY_DEFS.natural.map((def) => ({

                    id: def.id,

                    kind: "natural",

                    element: document.getElementById(def.id),

                    button: null,

                    audio: new Audio(def.audioSrc),

                })),

                sharp: KEY_DEFS.sharp.map((def) => ({

                    id: def.id,

                    kind: "sharp",

                    element: document.getElementById(def.id),

                    button: null,

                    audio: new Audio(def.audioSrc),

                })),

            };



            // ボタン配列

            const naturalKeyButtons = Array.from(

                document.getElementsByClassName("natural")

            );

            const sharpKeyButtons = Array.from(

                document.getElementsByClassName("sharp")

            );

            const naturalSoundNames = Array.from(

                document.getElementsByClassName("sound-name")

            );



            // 鍵盤DOM

            const naturalKeyElements = keyRegistry.natural.map((k) => k.element);

            const sharpKeyElements = keyRegistry.sharp.map((k) => k.element);



            // ボタンとregistryとの紐づけ

            keyRegistry.natural.forEach((k, index) => {

                k.button = naturalKeyButtons[index] || null;

            });

            keyRegistry.sharp.forEach((k, index) => {

                k.button = sharpKeyButtons[index] || null;

            });



            // キー参照

            function getKeyRef(kind, index) {

                const list =

                    kind === "natural" ? keyRegistry.natural : keyRegistry.sharp;

                return list[index] || null;

            }



            // 楽譜データ

            function note(kind, index, durationMs) {

                return { kind, index, durationMs };

            }

            function rest(durationMs) {

                return { kind: "rest", index: -1, durationMs };

            }



            const SONGS = [

                {

                    id: "twinkle",

                    title: "きらきら星",

                    score: [

                        note("natural", 0, 500),

                        rest(500),

                        note("natural", 0, 500),

                        rest(500),

                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 5, 500),

                        rest(500),

                        note("natural", 5, 500),

                        rest(500),

                        note("natural", 4, 2000),



                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 1, 500),

                        rest(500),

                        note("natural", 1, 500),

                        rest(500),

                        note("natural", 0, 2000),



                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 1, 2000),



                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 1, 2000),



                        note("natural", 0, 500),

                        rest(500),

                        note("natural", 0, 500),

                        rest(500),

                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 4, 500),

                        rest(500),

                        note("natural", 5, 500),

                        rest(500),

                        note("natural", 5, 500),

                        rest(500),

                        note("natural", 4, 2000),



                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 3, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 2, 500),

                        rest(500),

                        note("natural", 1, 500),

                        rest(500),

                        note("natural", 1, 500),

                        rest(500),

                        note("natural", 0, 4000),

                    ],

                },

                {

                    id: "tulip",

                    title: "チューリップの歌",

                    score: [

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 1000),

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 1000),

                        note("natural", 4, 500),

                        note("natural", 2, 500),

                        note("natural", 1, 500),

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 500),

                        note("natural", 1, 1000),



                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 1000),

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 1000),

                        note("natural", 4, 500),

                        note("natural", 2, 500),

                        note("natural", 1, 500),

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 500),

                        note("natural", 0, 1000),



                        note("natural", 4, 250),

                        rest(250),

                        note("natural", 4, 250),

                        rest(250),

                        note("natural", 2, 250),

                        rest(250),

                        note("natural", 4, 250),

                        rest(250),

                        note("natural", 5, 250),

                        rest(250),

                        note("natural", 5, 250),

                        rest(250),

                        note("natural", 4, 1000),



                        note("natural", 2, 250),

                        rest(250),

                        note("natural", 2, 250),

                        rest(250),

                        note("natural", 1, 250),

                        rest(250),

                        note("natural", 1, 250),

                        rest(250),

                        note("natural", 0, 4000),

                    ],

                },

                {

                    id: "yuyake",

                    title: "夕焼け小焼け",

                    score: [

                        note("natural", 4, 500),

                        note("natural", 4, 500),

                        note("natural", 4, 500),

                        note("natural", 5, 500),

                        note("natural", 4, 500),

                        note("natural", 4, 500),

                        note("natural", 4, 500),

                        note("natural", 2, 500),

                        note("natural", 0, 500),

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 500),

                        note("natural", 1, 2000),



                        note("natural", 2, 1000),

                        note("natural", 2, 500),

                        note("natural", 4, 500),

                        note("natural", 5, 500),

                        note("natural", 7, 500),

                        note("natural", 7, 500),

                        note("natural", 5, 500),

                        note("natural", 4, 500),

                        note("natural", 4, 500),

                        note("natural", 5, 500),

                        note("natural", 4, 500),

                        note("natural", 7, 2000),



                        note("natural", 7, 1000),

                        note("natural", 7, 500),

                        note("natural", 5, 500),

                        note("natural", 7, 500),

                        note("natural", 7, 500),

                        note("natural", 4, 500),

                        note("natural", 4, 500),

                        note("natural", 5, 500),

                        note("natural", 4, 500),

                        note("natural", 5, 500),

                        note("natural", 4, 500),

                        note("natural", 2, 2000),

                        

                        note("natural", 4, 500),

                        note("natural", 2, 500),

                        note("natural", 1, 500),

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 1, 500),

                        note("natural", 0, 500),

                        note("natural", 1, 500),

                        note("natural", 2, 500),

                        note("natural", 4, 500),

                        note("natural", 5, 500),

                        note("natural", 4, 500),

                        note("natural", 7, 4000),

                    ],

                },

                {

                    id: "doremi",

                    title: "ドレミの歌",

                    score: [

                        note("natural", 0, 750),

                        note("natural", 1, 250),

                        note("natural", 2, 750),

                        note("natural", 0, 250),

                        note("natural", 2, 500),

                        note("natural", 0, 500),

                        note("natural", 2, 1000),



                        note("natural", 1, 750),

                        note("natural", 2, 250),

                        note("natural", 3, 250),

                        note("natural", 3, 250),

                        note("natural", 2, 250),

                        note("natural", 1, 250),

                        note("natural", 3, 2000),



                        note("natural", 2, 750),

                        note("natural", 3, 250),

                        note("natural", 4, 750),

                        note("natural", 2, 250),

                        note("natural", 4, 500),

                        note("natural", 2, 500),

                        note("natural", 4, 1000),



                        note("natural", 3, 750),

                        note("natural", 4, 250),

                        note("natural", 5, 250),

                        note("natural", 5, 250),

                        note("natural", 4, 250),

                        note("natural", 3, 250),

                        note("natural", 5, 2000),



                        note("natural", 4, 750),

                        note("natural", 0, 250),

                        note("natural", 1, 250),

                        note("natural", 2, 250),

                        note("natural", 3, 250),

                        note("natural", 4, 250),

                        note("natural", 5, 2000),



                        note("natural", 5, 750),

                        note("natural", 1, 250),

                        note("natural", 2, 250),

                        note("sharp", 2, 250),

                        note("natural", 4, 250),

                        note("natural", 5, 250),

                        note("natural", 6, 2000),



                        note("natural", 6, 750),

                        note("natural", 2, 250),

                        note("sharp", 2, 250),

                        note("sharp", 3, 250),

                        note("natural", 5, 250),

                        note("natural", 6, 250),

                        note("natural", 7, 1500),



                        note("natural", 6, 250),

                        note("sharp", 4, 250),

                        note("natural", 5, 500),

                        note("natural", 3, 500),

                        note("natural", 6, 500),

                        note("natural", 4, 500),

                        note("natural", 7, 4000),

                    ],

                },

            ];



            // 各変数

            const state = {

                timers: {                       // タイマー変数群

                    manualEraseTimerId : null,  // 手動演奏によるUIを消す用のタイマー

                    autoPlayTimerId: null,      // 自動演奏用タイマー

                },

                autoPlay: {                     // 自動演奏群

                    isAutoPlaying: false,       // 自動演奏中の状態

                    currentSong: null,          // 現在の楽曲

                    scoreIndex: 0,              // 自動演奏の進行状況

                },

                isHidden: false,                // 鍵盤の音名表示状態

            };



            // 見た目(UI)の処理

            // 音名の表示/非表示

            function toggleSoundName() {

                if (!state.isHidden) {

                    state.isHidden = true;

                    naturalSoundNames.forEach((btn) => btn.style.display = "none");

                } else if (state.isHidden) {

                    state.isHidden = false;

                    naturalSoundNames.forEach((btn) => btn.style.display = "block");

                }

                setToggleSoundNameButtonText(state.isHidden ? "音名表示: ON " : "音名表示: OFF");

                setToggleSoundNameButtonUI();

            }

            // 音名表示エリアの非表示

            function clearSoundArea() {

                dom.currentSoundText.textContent = "";

            }



            // 鍵盤の色付けの非表示

            function clearKeyHighlight() {

                naturalKeyElements.forEach((el) => el.classList.remove("active"));

                sharpKeyElements.forEach((el) => el.classList.remove("sharp_active"));

            }



            // 手動演奏によるUIを1秒後に消す

            function scheduleErase() {

                state.timers.manualEraseTimerId = setTimeout(() => {

                    clearKeyHighlight();

                    clearSoundArea();

                }, ERASE_MS);

            }



            // 自動演奏に伴う鍵盤のクリックを遮断

            function setKeysEnabled(enabled) {

                dom.soundArea.classList.toggle("disabled", !enabled);

                const pointer = enabled ? "auto" : "none";

                naturalKeyButtons.forEach((btn) => (btn.style.pointerEvents = pointer));

                sharpKeyButtons.forEach((btn) => (btn.style.pointerEvents = pointer));

            }



            // ボタンの表示文字の変更

            // 自動演奏ボタン

            function setAutoPlayButtonButtonText(text) {

                dom.autoPlayButton.value = text;

                dom.autoPlayButton.textContent = text;

            }

            // 音名表示/非表示ボタン

            function setToggleSoundNameButtonText(text) {

                dom.toggleSoundNameButton.value = text;

                dom.toggleSoundNameButton.textContent = text;

            }



            // ON/OFFボタンのUI

            function setToggleSoundNameButtonUI() {

                dom.toggleSoundNameButton.classList.toggle("on", state.isHidden);

                dom.toggleSoundNameButton.classList.toggle("off", !state.isHidden);

            }



            // 自動演奏によるUI表示

            function setAutoPlayUI(isPlaying, songTitle="") {

                dom.autoPlayButton.classList.toggle("autoplay", !isPlaying);

                dom.autoPlayButton.classList.toggle("stop", isPlaying);

                setAutoPlayButtonButtonText(isPlaying ? "■ 演奏中止" : "▶自動演奏");

                dom.titleText.textContent = isPlaying

                    ? `自動演奏中です：${songTitle}`

                    : "";

                if (isPlaying) {

                    setKeysEnabled(false);

                    return;

                }

                    clearKeyHighlight();

                    clearSoundArea();

                    setKeysEnabled(true);

            }



            // 音源の再生

            function playAudio(audio) {

                audio.currentTime = 0;

                audio.play();

            }



            // 音名表示エリア

            function showCurrentSound(buttonEl) {

                dom.currentSoundText.textContent = `♪${buttonEl.textContent}`;

            }



            // 鍵盤にactiveクラスを付与し、色付けを行う

            function highlightKey(kind, index) {

                clearKeyHighlight();

                if (kind === "natural") {

                    naturalKeyElements[index]?.classList.add("active");

                    return;

                } else if (kind === "sharp") {

                    sharpKeyElements[index]?.classList.add("sharp_active");

                }

            }



            // 音出しの処理

            function renderNote(kind, index) {

                const keyRef = getKeyRef(kind, index);

                if (!keyRef) {

                    return;

                }



                playAudio(keyRef.audio);

                if (keyRef.button) {

                    showCurrentSound(keyRef.button);

                }

                highlightKey(kind,index);

            }



            // 自動演奏の1ステップ処理

            function performNoteStep(step) {

                if (step.kind === "rest") {

                    clearSoundArea();

                    clearKeyHighlight();

                    return;

                }

                renderNote(step.kind, step.index);

            }



            // 手動演奏

            function handleManualPlay(kind, index) {

                if (state.autoPlay.isAutoPlaying) {

                    return;

                }

                clearTimeout(state.timers.manualEraseTimerId);

                renderNote(kind, index);

                scheduleErase();

            }



            naturalKeyButtons.forEach(

                (btn, i) => btn.addEventListener("click", () => handleManualPlay("natural", i))

            );

            sharpKeyButtons.forEach(

                (btn, i) => btn.addEventListener("click", () => handleManualPlay("sharp", i))

            );



            // 楽曲の選定

            function selectSongAtRandom() {

                const randomIndex = Math.floor(Math.random() * SONGS.length);

                return SONGS[randomIndex];

            }



            // 演奏の進行

            function playNextScoreStep() {

                const { isAutoPlaying, currentSong, scoreIndex } = state.autoPlay;

                if (!isAutoPlaying || !currentSong) {

                    stopAutoPlay();

                    return;

                }

                if (scoreIndex >= currentSong.score.length) {

                    stopAutoPlay();

                    return;

                }



                const step = state.autoPlay.currentSong.score[state.autoPlay.scoreIndex];

                performNoteStep(step);

                

                state.autoPlay.scoreIndex += 1;

                state.timers.autoPlayTimerId = setTimeout(

                    playNextScoreStep,

                    step.durationMs

                );

            }



            // 自動演奏の開始

            function startAutoPlay() {

                clearTimeout(state.timers.manualEraseTimerId);

                if (state.autoPlay.isAutoPlaying) {

                    return;

                }



                state.autoPlay.isAutoPlaying = true;

                state.autoPlay.scoreIndex = 0;

                state.autoPlay.currentSong = selectSongAtRandom();



                setAutoPlayUI(true, state.autoPlay.currentSong.title);

                playNextScoreStep();

            }



            // 演奏中止

            function stopAutoPlay() {

                clearTimeout(state.timers.autoPlayTimerId);

                state.timers.autoPlayTimerId =  null;



                state.autoPlay.isAutoPlaying = false;

                state.autoPlay.currentSong = null;

                state.autoPlay.scoreIndex = 0;



                setAutoPlayUI(false);

            }



            // ボタン押下時の処理(条件によって自動演奏/演奏中止)

            function toggleAutoPlay() {

                if (state.autoPlay.isAutoPlaying) {

                    stopAutoPlay();

                    return;

                }

                startAutoPlay();

            }



            // ボタンとクリックイベントの紐づけ

            dom.autoPlayButton.addEventListener("click", toggleAutoPlay);

            dom.toggleSoundNameButton.addEventListener("click", toggleSoundName);