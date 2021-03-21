class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {
    axios.get(`${this.BASE_URL}/characters`)
    .then(response => {
      const charContainer = document.getElementsByClassName('characters-container')[0];
      charContainer.innerHTML = '';
      response.data.forEach(entry => {
        charContainer.innerHTML += `
        <div class="character-info">
          <div class="id">ID: ${entry.id}</div>
          <div class="name">Name: ${entry.name}</div>
          <div class="occupation">Occupation: ${entry.occupation}</div>
          <div class="cartoon">Is a Cartoon?: ${entry.cartoon}</div>
          <div class="weapon">Weapon: ${entry.weapon}</div>
        </div>
        `
      })
    })
    .catch(err => console.log(`ERROR: ${err}`))
  }

  getOneRegister(id) {
    axios.get(`${this.BASE_URL}/characters/${id}`)
    .then(response =>{
      const charContainer = document.getElementsByClassName('characters-container')[0];
      charContainer.innerHTML = `
      <div class="character-info">
        <div class="id">ID: ${response.data.id}</div>
        <div class="name">Name: ${response.data.name}</div>
        <div class="occupation">Occupation: ${response.data.occupation}</div>
        <div class="cartoon">Is a Cartoon?: ${response.data.cartoon}</div>
        <div class="weapon">Weapon: ${response.data.weapon}</div>
      </div>
      `
    })
    .catch(err => {
      console.log(err)
    })
  }

  createOneRegister (register) {
    axios.post(`${this.BASE_URL}/characters`, register)
    .then(response =>{
      console.log(`created successfylly ${response}`);
      document.getElementById("send-data").style.backgroundColor = 'green';
    })
    .catch(err => {
      console.log(err)
      document.getElementById("send-data").style.backgroundColor = 'red';
    })
  }

  fillUpdateRegister(id) {
    axios.get(`${this.BASE_URL}/characters/${id}`)
    .then(response => {
      const formInputs = document.querySelectorAll('#edit-character-form input')
      formInputs[0].value = id;
      formInputs[1]. value = response.data.name;
      formInputs [2].value = response.data.occupation;
      formInputs[3].value = response.data.weapon;
      if(response.data.cartoon) {
        formInputs[4].setAttribute('checked', 'true')
      }
      console.log(formInputs[4])
      document.getElementById('send-update').style.backgroundColor = 'transparent';
    })
    .catch(err => console.log(err))
  }

  updateOneRegister(register) {
    axios.put(`${this.BASE_URL}/characters/${register.id}`, register)
    .then(response =>{
      console.log(response.data)
      document.getElementById('send-update').style.backgroundColor = 'green';
    })
    .catch(err =>{
      console.log(err)
      document.getElementById('send-update').style.backgroundColor = 'red';
    })
  }

  deleteOneRegister(id) {
    axios.get(`${this.BASE_URL}/characters/${id}`)
    .then(response => {
      if(response){
        axios.delete(`${this.BASE_URL}/characters/${id}`)
        .then(() => {
          console.log('successfully deleted');
          document.getElementById("delete-one").style.backgroundColor = 'green';
        })
        .catch(err => {
          console.log(`error deleting: ${elem.data.name}`);
          console.log(err);
          document.getElementById("delete-one").style.backgroundColor = 'red';
        })
      }
    })
    .catch(err => {
      console.log(err)
      document.getElementById("delete-one").style.backgroundColor = 'red';
    })
  }
}
