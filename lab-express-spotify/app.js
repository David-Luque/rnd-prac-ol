require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});
spotifyApi
.clientCredentialsGrant()
.then(data => spotifyApi.setAccessToken(data.body['access_token']))
.catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:

app.get('/', (req, res, next)=>{
    res.render('home');
})

app.get('/artist-search', (req, res)=>{
    const artist =req.query.artist;
    spotifyApi.searchArtists(artist)
    .then(data => {
        console.log('The received data from the API: ', data.body);
        res.render('artist-search-results', data.body);
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
})

app.get('/albums/:artistId', (req, res)=>{
    const { artistId } = req.params
    spotifyApi.getArtistAlbums(artistId)
    .then(data => {
        res.send(data)
        console.log('Artist albums', data.body);
    })
    .catch(err => {
        console.error(err);
    })
})

app.get('/tracks/:albumId', (req, res)=>{
    const {albumId} = req.params;
    spotifyApi.getAlbumTracks(albumId, { limit : 5, offset : 1 })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        console.log('Error!', err);
    });

})

app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
