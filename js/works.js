const viewButtons = Array.from(document.querySelectorAll(".view"));
const viewMoreButton = document.getElementById("view_more");

viewButtons.forEach((button) => button.addEventListener("click", () => {
    if (button.id === "portfolio_view") {
        location.href = "../index.html";
        return;
    }
    window.open(button.dataset.href, "_blank");
}));
viewMoreButton.addEventListener("click", () => location.href = "communication_games/index.html");