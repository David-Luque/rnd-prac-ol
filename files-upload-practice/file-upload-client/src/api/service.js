import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:5000/api'
    // withCredentials: true // // => need this when having the users in the app
});

const errorHandler = (err)=>{
    //console.log(err);
    throw err;
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    service,
    handleUpload(theFile) {
        return service.post('upload', theFile)
        .then(res => res.data)
        .catch(errorHandler)
    },
    saveNewThing(newThing) {
        return service.post('/things/create', newThing)
        .then(res => res.data)
        .catch(errorHandler)
    }
};