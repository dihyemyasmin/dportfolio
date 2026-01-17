let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = `<li class="list-group-item text-center text-muted">Your cart is empty</li>`;
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Delete</button>
      </li>`;
  });

  cartTotal.textContent = "Total: $" + total.toFixed(2);
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

// Populate cart on page load
updateCartUI();
