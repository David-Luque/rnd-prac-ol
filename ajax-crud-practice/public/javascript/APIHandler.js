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
    .then(data =>{
      console.log(`created successfylly ${data}`);
      document.getElementById("send-data").style.backgroundColor = 'green';
    })
    .catch(err => {
      console.log(err)
      document.getElementById("send-data").style.backgroundColor = 'red';
    })
  }

  updateOneRegister(register) {
    if(!register){
      axios.get(`${this.BASE_URL}/characters/${register}`)
      .then(res => console.log(res))
    } else {
      console.log('truly')
    }
    // axios.put(this.BASE_URL, register)
    // .then(data => console.log(`updated successfylly ${data}`))
    // .catch(err => console.log(err))
  }

  deleteOneRegister(id) {
    axios.get(`${this.BASE_URL}/characters/${id}`)
    .then(res => {
      if(res){
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
