const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {   
    charactersAPI.getFullList();
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const searchId = document.querySelectorAll('.operations input')[0].value;
    charactersAPI.getOneRegister(searchId);
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const deleteId = document.querySelectorAll('.operations input')[1].value;
    charactersAPI.deleteOneRegister(deleteId);
  });

  document.getElementById('send-update').addEventListener('click', ()=>{
    const id = document.querySelector('#edit-character-form input').value;
    charactersAPI.getOneRegister(searchId);
  })

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('submit')
    const updateInputs = document.querySelectorAll('#edit-character-form input');
    const idInput = updateInputs[0].value;
    charactersAPI.updateOneRegister(idInput);

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const createInputs = document.querySelectorAll('#new-character-form input');
    const newCharacter = {
      name: createInputs[0].value,
      occupation: createInputs[1].value,
      weapon: createInputs[2].value,
      cartoon: createInputs[3].value
    };
    console.log(newCharacter)
    charactersAPI.createOneRegister(newCharacter);
  });
});
