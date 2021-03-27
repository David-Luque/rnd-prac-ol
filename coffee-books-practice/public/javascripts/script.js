window.onload = ()=>{
  
  function startMap() {

    const viewMap = document.getElementById('map');

    const defaultPlace = {
      lat: 41.3977381,
      lng: 2.190471916
    };

    const markers = [];

    map = new google.maps.Map(viewMap, 
      {
        zoom: 10,
        center: defaultPlace
      }
    );

    const defaultMarker = new google.maps.Marker({
      position: {
        lat: defaultPlace.lat,
        lng: defaultPlace.lng
      },
      map: viewMap,
      title: "default marker"
    })

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const user_position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(`center: ${userPosition}`)
        viewMap.setCenter(user_position)
      
        const userMarker = new google.maps.Marker({
          position: user_position,
          map: viewMap,
          title: "user is here"
        });
      
      }, function() {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }


    getPlaces();

    function getPlaces() {
      axios.get(`http://localhost:${process.env.PORT}/places`)
      .then(response => {
        console.log(response);
        setPlaces(response.data.places)
      })
      .catch(err => console.log(err))
    }
  
    function setPlaces(places) {
      places.forEach(place => {
        const center = {
          lat: place.location.coordinates[0],
          lng: place.location.coordinates[1]
        };
        const pin = new google.maps.Marker({
          position: center,
          map: viewMap,
          title: place.name
        });
        markers.push(pin);
      });
    }

    const geocoder = new google.maps.Geocoder()
    document.getElementById('submitGeo').addEventListener('click', ()=>{
      geocodeAddress(geocoder, viewMap);
    });

    function geocodeAddress(geocoder, resultMap) {
      let address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, (result, status)=>{
        if(status === OK){
          resultMap.setCenter(result[0].geometry.location);
          let marker = new google.map.Marker({
            map: resultMap,
            position: result[0].geometry.location,
            title: //address
          });
          document.getElementById('latitude').value = result[0].geometry.location.lat();
          document.getElementById('longitude').value = result[0].geometry.location.lng();
        } else {
          alert(`Geocode was not successfull for the following reason: ${status}`)
        };
      });
    }
  
  }
  
  startMap();

}

  