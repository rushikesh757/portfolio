document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const successMessage = document.getElementById("successMessage");
    const feedbackDisplay = document.getElementById("feedbackDisplay");

    // Display stored feedback when page loads
    displayFeedback();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validation: Name not empty
        if (name === "") {
            alert("Name should not be empty!");
            return;
        }

        // Validation: Valid email format
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address!");
            return;
        }

        // Create feedback object
        const feedback = {
            name: name,
            email: email,
            message: message
        };

        // Get existing feedback from localStorage
        let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];

        // Add new feedback
        feedbackList.push(feedback);

        // Save back to localStorage
        localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

        // Show success message
        successMessage.textContent = "Feedback submitted successfully!";

        // Clear form
        form.reset();

        // Refresh displayed feedback
        displayFeedback();
    });

    function displayFeedback() {
        feedbackDisplay.innerHTML = "";

        let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];

        feedbackList.forEach(function (fb) {
            const feedbackDiv = document.createElement("div");

            feedbackDiv.innerHTML = `
                <h4>${fb.name}</h4>
                <p>${fb.message}</p>
            `;

            feedbackDisplay.appendChild(feedbackDiv);
        });
    }

});
