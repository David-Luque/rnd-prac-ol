// ITERATION 1

function updateSubtotal(product) {
  //const price = Number(product.getElementsByClassName('price')[0].getElementsByTagName('span')[0].innerHTML);
  const price = Number(product.querySelector('.price span').innerHTML);
  //const quantity = Number(product.querySelector('.quantity input').getAttribute('value'));
  const quantity = Number(product.querySelector('.quantity input').value);
  const subTotalAmount = price * quantity;
  const subtotalDOM = product.querySelector('.subtotal span');
  subtotalDOM.innerHTML = subTotalAmount;
  
  return subTotalAmount;
}

function calculateAll() {

  let totalAccumulate = 0;

  // ITERATION 2
  const products = document.querySelectorAll('.product');

  for(let i = 0; i < products.length; i++){
    updateSubtotal(products[i]);
    totalAccumulate += updateSubtotal(products[i]);
  }

  // ITERATION 3
  const totalValue = document.querySelector('#total-value span');
  totalValue.innerHTML = totalAccumulate;

}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  //... your code goes here
}

// ITERATION 5

function createProduct() {
  //... your code goes here
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
});
