const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  /* BUGGED LINES 
     for (let i = 0; i <= cartItems.length; i++) { // Bug: <= should be <*/
  /*FIXED LINE*/
  for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
 /*BUGGED LINE*
  return total - total * discountRate; // Bug: Missing validation for discountRate
} */
/*FIXED LINE*/
if (typeof discountRate !== 'number'|| discountRate < 0 || discountRate > 1) {
  return total;
}
return total - total * discountRate;
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  /*ADDED LINE*/
  if (typeof total !== 'number'|| isNaN(total)) { total = 0;}
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

/*Validate Fixes:
○ Test the corrected program with the given cart and a few edge cases*/
//EMPTY CART
console.log("Empty Cart:", calculateTotal([]))
console.log("Empty Cart Receipt:", generateReceipt([], 0))
//CART W/ ONE ITEM
const oneItemCart = [{name: "Phone", price: 500}]
const oneItemTotal = calculateTotal(OneItemCart)
const oneItemDiscounted = applyDiscount(oneItemTotal, 0.2)
console.log("One Item Receipt: ", generateReceipt(oneItemCart, oneItemDiscounted));
// A discountRate of 0 or 1.
console.log("0% Discount:", applyDiscount(100,0));
console.log("100% Discount:", applyDiscount(100,1));
