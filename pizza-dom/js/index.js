let basePrice = 10;
let ingredients = {
  pepperoni: { name: 'pepperoni', price: 1 },
  mushrooms: { name: 'Mushrooms', price: 1 },
  greenPeppers: { name: 'Green Peppers', price: 1 },
  whiteSauce: { name: 'White sauce', price: 3 },
  glutenFreeCrust: { name: 'Gluten-free crust', price: 5 }
};

let state = {
  pepperoni: true,
  mushrooms: true,
  greenPeppers: true,
  whiteSauce: false,
  glutenFreeCrust: false
};

function renderEverything() {
  renderPepperoni();
  renderMushrooms();
  renderGreenPeppers();
  renderWhiteSauce();
  renderGlutenFreeCrust();

  renderButtons();
  renderPrice();
}

function renderPepperoni() {
  document.querySelectorAll('.pep').forEach(onePep => {
    if (state.pepperoni) {
      onePep.style.visibility = 'visible';
    } else {
      onePep.style.visibility = 'hidden';
    }
  });
}

function renderMushrooms() {
  document.querySelectorAll('.mushroom').forEach(mushy => {
    if(state.mushrooms){
      mushy.style.visibility = 'visible';
    } else {
      mushy.style.visibility = 'hidden';
    }
  })
}

function renderGreenPeppers() {
  document.querySelectorAll('.green-pepper').forEach(greenP => {
    if(state.greenPeppers){
      greenP.style.visibility = 'visible';
    } else {
      greenP.style.visibility = 'hidden';
    }
  })
}

function renderWhiteSauce() {
  const sauceWhite = document.getElementsByClassName('sauce')[0];
  if(state.whiteSauce){
    sauceWhite.setAttribute('class', 'sauce sauce-white');
  } else {
    sauceWhite.setAttribute('class', 'sauce');
  }
}

function renderGlutenFreeCrust() {
  const crust = document.getElementsByClassName('crust')[0];
  if(state.glutenFreeCrust){
    crust.setAttribute('class', 'crust crust-gluten-free');
  } else {
    crust.setAttribute('class', 'crust');
  }
}

function renderButtons() {
  if(state.pepperoni){
    document.getElementsByClassName('btn btn-pepperoni')[0]
    .setAttribute('class', 'btn btn-pepperoni active');
  } else {
    document.getElementsByClassName('btn btn-pepperoni')[0]
    .setAttribute('class', 'btn btn-pepperoni');
  };

  if(state.mushrooms){
    document.getElementsByClassName('btn btn-mushrooms')[0]
    .setAttribute('class', 'btn btn-mushrooms active');
  } else {
    document.getElementsByClassName('btn btn-mushrooms')[0]
    .setAttribute('class', 'btn btn-mushrooms');
  };

  if(state.greenPeppers){
    document.getElementsByClassName('btn btn-green-peppers')[0]
    .setAttribute('class', 'btn btn-green-peppers active');
  } else {
    document.getElementsByClassName('btn btn-green-peppers')[0]
    .setAttribute('class', 'btn btn-green-peppers');
  };

  if(state.whiteSauce){
    document.getElementsByClassName('btn btn-sauce')[0]
    .setAttribute('class', 'btn btn-sauce active');
  } else {
    document.getElementsByClassName('btn btn-sauce')[0]
    .setAttribute('class', 'btn btn-sauce');
  };

  if(state.glutenFreeCrust){
    document.getElementsByClassName('btn btn-crust')[0]
    .setAttribute('class', 'btn btn-crust active');
  } else {
    document.getElementsByClassName('btn btn-crust')[0]
    .setAttribute('class', 'btn btn-crust');
  };
}

function renderPrice() {
  const panelPrice = document.getElementsByClassName('panel price')[0];
  const priceList = panelPrice.getElementsByTagName('ul');
  const items = panelPrice.getElementsByTagName('li');
  const totalPrice = panelPrice.getElementsByTagName('strong')[0];

  basePrice = 10;
  
  for(const ingr in ingredients){
    if(state[ingr]){
      basePrice += ingredients[ingr].price;
    }
  }
  totalPrice.innerHTML = `$${basePrice}`;
  
  if(state.pepperoni){
    items[0].style.display = 'block';
  } else {
    items[0].style.display = 'none';
  }

  if(state.mushrooms){
    items[1].style.display = 'block';
  } else {
    items[1].style.display = 'none';
  }

  if(state.greenPeppers){
    items[2].style.display = 'block';
  } else {
    items[2].style.display = 'none';
  }

  if(state.whiteSauce){
    items[3].style.display = 'block';
  } else {
    items[3].style.display = 'none';
  }

  if(state.glutenFreeCrust){
    items[4].style.display = 'block';
  } else {
    items[4].style.display = 'none';
  }
}


renderEverything();


document.querySelector('.btn.btn-pepperoni').addEventListener('click', () => {
  state.pepperoni = !state.pepperoni;
  renderEverything();
});

document.querySelector('.btn.btn-mushrooms').addEventListener('click', ()=>{
  state.mushrooms = !state.mushrooms;
  renderEverything();
});

document.querySelector('.btn.btn-green-peppers').addEventListener('click', ()=>{
  state.greenPeppers = !state.greenPeppers;
  renderEverything();
});

document.querySelector('.btn.btn-sauce').addEventListener('click', ()=> {
  state.whiteSauce = !state.whiteSauce;
  renderEverything();
});

document.querySelector('.btn.btn-crust').addEventListener('click', ()=>{
  state.glutenFreeCrust = !state.glutenFreeCrust;
  renderEverything();
});
