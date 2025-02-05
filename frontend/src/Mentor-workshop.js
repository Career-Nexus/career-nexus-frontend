
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".join-btn").forEach(button => {
        button.addEventListener("click", () => {
            alert("You have successfully joined the session!");
        });
    });
    
    document.getElementById("feedback-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you for your feedback!");
        document.getElementById("comments").value = "";
    });
});
