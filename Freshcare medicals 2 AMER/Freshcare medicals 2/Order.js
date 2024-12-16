// Get references to the order table and grand total element
const orderItems = document.getElementById("order-items");
const orderGrandTotalElement = document.getElementById("order-grand-total");

// Function to display cart items on the Order page
function displayOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage
  let grandTotal = 0;

  // Loop through the cart items and add them to the table
  cart.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>Rs. ${item.price.toFixed(2)}</td>
      <td>Rs. ${(item.price * item.quantity).toFixed(2)}</td>
    `;
    orderItems.appendChild(row);
    grandTotal += item.price * item.quantity;
  });

  // Display the grand total
  orderGrandTotalElement.textContent = `Rs. ${grandTotal.toFixed(2)}`;
}

// Call the function when the page loads
window.onload = displayOrderSummary;

document.addEventListener("DOMContentLoaded", () => {
  const paymentMethodSelect = document.getElementById("payment-method");
  const cardDetailsDiv = document.getElementById("card-details");
  const form = document.querySelector(".pharmacy-form");
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content"); // Where the thank you message will be displayed
  const closeBtn = document.querySelector(".close-btn");

  // List of card detail input IDs
  const cardInputIds = ["card-number", "card-expiry", "card-cvv", "card-name"];

  // Function to toggle card details visibility and required attribute
  function toggleCardDetails(show) {
    cardDetailsDiv.style.display = show ? "block" : "none";
    cardInputIds.forEach((id) => {
      document.getElementById(id).required = show;
    });
  }

  // Event listener for payment method change
  paymentMethodSelect.addEventListener("change", () => {
    toggleCardDetails(paymentMethodSelect.value === "credit-debit");
  });

  // Show popup with form details on form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent actual form submission

    // Gather form data
    const formData = new FormData(form);
    let summaryHTML = `
      <h2>Thank You for Your Order!</h2>
      <p><strong>Name:</strong> ${formData.get("name")}</p>
      <p><strong>Email:</strong> ${formData.get("email")}</p>
      <p><strong>Phone:</strong> ${formData.get("phone")}</p>
      <p><strong>Address:</strong> ${formData.get("address")}</p>
      <p><strong>Payment Method:</strong> ${formData.get("payment-method")}</p>
    `;

    if (formData.get("payment-method") === "credit-debit") {
      summaryHTML += `
        <h3>Card Details</h3>
        <p><strong>Card Number:</strong> ${formData.get("card-number")}</p>
        <p><strong>Expiry Date:</strong> ${formData.get("card-expiry")}</p>
        <p><strong>Cardholder Name:</strong> ${formData.get("card-name")}</p>
      `;
    }

    // Add the user details summary into the popup
    popupContent.innerHTML = summaryHTML;

    // Show the popup
    popup.style.display = "flex";

    // Close the popup and show a thank you message after a delay
    setTimeout(() => {
      popup.style.display = "none"; // Close the popup
    }, 5000); // Delay before hiding the popup

  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close popup if clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});