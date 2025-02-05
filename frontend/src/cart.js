const removeButtons = document.querySelectorAll('.remove-item');

removeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();
    alert('Item removed from cart!');
    // Recalculate subtotal logic can go here.
  });
});
