// ボタンリンク
const profileLinkButton = document.getElementById("profile_more");
const worksLinkButton = document.getElementById("works_more");

profileLinkButton.addEventListener("click", () => {
    location.href = "profile.html";
});

worksLinkButton.addEventListener("click", () => {
    location.href = "works/index.html";
});

// お問い合わせフォーム
const submitButton = document.getElementById("submit_button");
document.getElementById("contact_form").addEventListener("submit", function(e) {
    e.preventDefault();

    submitButton.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_nhg8s9f";

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            submitButton.value = "Send Email";
            alert("Sent!");
        }, (err) => {
            submitButton.value = "Send Email";
            alert(JSON.stringify(err));
    });
});