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
  console.log('target:', target);
  
  const items = document.getElementsByTagName('tbody')[0];
  //console.log(cart)
  items.removeChild((target.parentNode).parentNode);

  calculateAll();

}

// ITERATION 5

function createProduct() {
  const newProduct = document.getElementsByClassName('create-product')[0];
  const newName = newProduct.getElementsByTagName('input')[0].value;
  const newPrice = newProduct.getElementsByTagName('input')[1].value;
  
  const productList = document.getElementsByTagName('tbody')[0];
  const newListProduct = document.createElement('tr');
  
  newListProduct.setAttribute('class', 'product');
  
  const name = document.createElement('td');
  name.setAttribute('class', 'name');
  const span = document.createElement('span');
  span.innerHTML = newName;
  
  const price = document.createElement('td');
  price.setAttribute('class', 'price')
  price.innerHTML = "$";
  const span2 = document.createElement('span');
  span2.innerHTML = newPrice;
  price.appendChild(span2);

  const quantity = document.createElement('td');
  quantity.setAttribute('class', 'quantity')
  const input = document.createElement('input');
  input.setAttribute('type', 'number');
  input.setAttribute('value', '0');
  input.setAttribute('min', '0');
  input.setAttribute('placeholder', 'Quantity');
  quantity.appendChild(input);

  const subtotal = document.createElement('td');
  subtotal.setAttribute('class', 'subtotal');
  subtotal.innerHTML = "$";
  const span3 = document.createElement('span');
  span3.innerHTML = "0";
  subtotal.appendChild(span3);
  
  const action = document.createElement('td');
  action.setAttribute('class', 'action')
  const button = document.createElement('button');
  button.setAttribute('class', 'btn btn-remove');
  button.innerHTML = "Remove";
  button.addEventListener('click', event => removeProduct(event));
  action.appendChild(button);

  newListProduct.appendChild(name);
  newListProduct.appendChild(price);
  newListProduct.appendChild(quantity);
  newListProduct.appendChild(subtotal);
  newListProduct.appendChild(action);
  
  
  productList.appendChild(newListProduct);
  
  console.log(newListProduct.childNodes);

  // newListProduct.innerHTML = (
  //   // <td class="name">
  //   //   <span>Beach towel</span>
  //   //   </td>
  //   //   <td class="price">$<span>12.50</span></td>
  //   //   <td class="quantity">
  //   //   <input type="number" value="0" min="0" placeholder="Quantity" />
  //   //   </td>
  //   //   <td class="subtotal">$<span>0</span></td>
  //   //   <td class="action">
  //   //   <button class="btn btn-remove">Remove</button>
  //   // </td>
  // )
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.product .btn-remove');
  for(let i = 0; i < removeButtons.length; i++){
    removeButtons[i].addEventListener('click', (event) => {
      removeProduct(event)
    });
  }
  createButton = document.getElementById('create');
  createButton.addEventListener('click', ()=>{
    createProduct();
  });
});
