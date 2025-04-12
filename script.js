
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(product) {
  let cart = getCart();
  cart.push(product);
  saveCart(cart);
  showMessage(product + " تم إضافته للسلة.");
}
function removeFromCart(product) {
  let cart = getCart();
  const index = cart.indexOf(product);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
    showCart();

    // الرسالة الحمراء
    const message = document.createElement("div");
    message.textContent = product + " تم إزالته من السلة.";
    message.style.position = "fixed";
    message.style.top = "20px";
    message.style.right = "20px";
    message.style.backgroundColor = "#ff4d4d";
    message.style.color = "white";
    message.style.padding = "10px 20px";
    message.style.borderRadius = "5px";
    message.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
    message.style.zIndex = "1000";
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 2000);
  }
}
function showCart() {
  const cart = getCart();
  const cartList = document.getElementById("cart-items");
  if (!cartList) return;
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<li>السلة فارغة.</li>";
    return;
  }
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item + " ";
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "إزالة";
    removeBtn.onclick = () => removeFromCart(item);
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded", showCart);
function showMessage(msg) {
  const messageBox = document.getElementById("message");
  if (!messageBox) return;
  messageBox.textContent = msg;
  messageBox.classList.add("show");

  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 2000);
}
