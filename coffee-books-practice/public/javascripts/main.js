

window.onload = ()=>{
  let map;
  
  function startMap() {

    const defaultPlace = {
      lat: 41.3977381,
      lng: 2.190471916
    };

    const mapContainer = document.getElementById('map');
    const mapProp = {
      zoom: 10,
      center: defaultPlace
    }

    map = new google.maps.Map(mapContainer, mapProp);

    const markers = [];
    
    const initialMarker = new google.maps.Marker({
      position: {
        lat: defaultPlace.lat,
        lng: defaultPlace.lng
      },
      map: map,
      title: "initial-marker"
    });
    markers.push(initialMarker);


    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const user_position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        map.setCenter(user_position)
        const userMarker = new google.maps.Marker({
          position: user_position,
          map: map,
          title: "User is here"
        });
        markers.push(userMarker);
      
      }, function() {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }


    getPlaces();

    function getPlaces() {
      axios.get(`http://localhost:3000/places`)
      .then(response => {
        setPlaces(response.data)
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
          map: map,
          title: place.name
        });
        markers.push(pin);
      });
    }

    const geocoder = new google.maps.Geocoder()
    document.getElementById('submitGeo').addEventListener('click', ()=>{
      geocodeAddress(geocoder, map);
    });

    function geocodeAddress(geocoder, resultsMap) {
      let address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, (result, status)=>{
        if(status === 'OK') {
          console.log(result)
          // resultsMap.setCenter(result[0].geometry.location);
          // let marker = new google.map.Marker({
          //   map: resultsMap,
          //   position: result[0].geometry.location,
          //   title: 'title'
          // });
          // document.getElementById('latitude').value = result[0].geometry.location.lat();
          // document.getElementById('longitude').value = result[0].geometry.location.lng();
        } else {
          alert(`Geocode was not successfull for the following reason: ${status}`)
        };
      });
    }
  
  }
  
  startMap();

}

  