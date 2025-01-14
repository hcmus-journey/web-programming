import { displayNotification } from "./Notification.js";

function showSaveButton() {
  document.getElementById("saveButton").style.display = "block";
}

async function saveChanges(orderId, shippingStatus, paymentStatus) {
    document.getElementById("saveButton").style.display = "none";
    fetch(`/admin/orders/${orderId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shippingStatus,
            paymentStatus,
        }),
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Failed to save changes");
        }
        return response.json();
    }).then((data) => {
        if (data.success) {
            displayNotification("Changes saved successfully", "success");
        } else {
            displayNotification(data.message, "error");
        }
    }).catch((error) => {
        console.error("Error:", error);
        displayNotification("An error occurred while saving changes", "error");
    });
    
}

window.saveChanges = saveChanges;
window.showSaveButton = showSaveButton;