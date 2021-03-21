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




  document.getElementById("search-update").addEventListener('click', ()=>{
    //console.log('click')
    const charId = document.querySelector('#edit-character-form input').value;
    //console.log(charId)
    charactersAPI.fillUpdateRegister(charId);
  })

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    //console.log('submit')
    const updatedInputs = document.querySelectorAll('#edit-character-form input')
    const updatedCharacter = {
      id: updatedInputs[0].value,
      name: updatedInputs[1].value,
      occupation: updatedInputs[2].value,
      weapon: updatedInputs[3].value,
      cartoon: updatedInputs[4].value
    }
    charactersAPI.updateOneRegister(updatedCharacter)
  });



  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const createInputs = document.querySelectorAll('#new-character-form input');
    //console.log(createInputs);
    const newCharacter = {
      [createInputs[0].name]: createInputs[0].value,
      [createInputs[1].name]: createInputs[1].value,
      [createInputs[2].name]: createInputs[2].value,
      [createInputs[3].name]: createInputs[3].value
    };
    console.log(newCharacter);
    //charactersAPI.createOneRegister(newCharacter);
  });
});
