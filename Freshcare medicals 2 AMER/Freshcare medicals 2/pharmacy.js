document.addEventListener("DOMContentLoaded", () => {
    const cartItemsTable = document.getElementById("cart-items");
    const grandTotalCell = document.getElementById("grand-total");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage
  
    // Function to update the cart table
    function updateCartTable() {
      cartItemsTable.innerHTML = ""; // Clear current table rows
      let grandTotal = 0;
  
      cart.forEach((item, index) => {
        const row = document.createElement("tr");
  
        // Item Name
        const itemNameCell = document.createElement("td");
        itemNameCell.textContent = item.name;
  
        // Quantity
        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
  
        // Price
        const priceCell = document.createElement("td");
        priceCell.textContent = `Rs. ${item.price.toFixed(2)}`;
  
        // Total Price for the Item
        const totalCell = document.createElement("td");
        const total = item.price * item.quantity;
        totalCell.textContent = `Rs. ${total.toFixed(2)}`;
  
        // Delete Button for the Item
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => removeFromCart(index));
        deleteCell.appendChild(deleteButton);
  
        // Append all cells to the row
        row.appendChild(itemNameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(totalCell);
        row.appendChild(deleteCell);
  
        cartItemsTable.appendChild(row);
  
        // Add to grand total
        grandTotal += total;
      });
  
      // Update the grand total in the footer
      grandTotalCell.textContent = `Rs. ${grandTotal.toFixed(2)}`;
      localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    }
  
    // Function to remove an item from the cart
    function removeFromCart(index) {
      cart.splice(index, 1); // Remove the item from the cart array
      updateCartTable(); // Refresh the cart table
    }
  
    // Event listener for all "Add to Cart" buttons
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productCard = e.target.closest(".product-card");
  
        const name = productCard.querySelector(".product-info p").textContent; // Medicine Name
        const priceText = productCard.querySelector(".product-info p:nth-child(2)").textContent;
        const price = parseFloat(priceText.replace("Price: Rs. ", "").trim()); // Extract price
        const quantityInput = productCard.querySelector(".quantity");
        const quantity = parseInt(quantityInput.value);
  
        // Check if quantity is valid
        if (quantity < 1 || isNaN(quantity)) {
          alert("Please enter a valid quantity.");
          return;
        }
  
        // Add product to cart or update quantity if it already exists
        const existingItem = cart.find((item) => item.name === name);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ name, price, quantity });
        }
  
        // Update the cart table
        updateCartTable();
      });
    });
  
    // Initial load of cart data from localStorage
    updateCartTable();
  
    // Event listener for the "Place Order" button
    document.querySelector(".btn-submit").addEventListener("click", () => {
      window.location.href = "order.html"; // Redirect to the Order page
    });
  });
  