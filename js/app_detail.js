// 画像スライダー
const track = document.getElementById("slider_track");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dots = Array.from(document.querySelectorAll(".dot"));

let currentIndex = 0;
let slideTimerId = null;
const DURATION_MS = 4000;

function showSlide(i) {
    currentIndex = i;        
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

function resetTimer() {
    if (slideTimerId) {
        clearInterval(slideTimerId);
        slideTimerId = null;
    }

    slideTimerId = setInterval(() => {
        currentIndex = (currentIndex + 1) % dots.length;
        showSlide(currentIndex);
    }, DURATION_MS);
}

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    showSlide(currentIndex);
    resetTimer();
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % dots.length;
    showSlide(currentIndex);
    resetTimer();
});

dots.forEach((dot, i) => dot.addEventListener("click", () => {
    showSlide(i);
    resetTimer();
}));

showSlide(currentIndex);
resetTimer();

// ボタン
const viewButton = document.getElementById("view");
viewButton.addEventListener("click", () => location.href = "app.html");