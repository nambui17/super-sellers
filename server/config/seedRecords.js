const seedData = require('./seedData.json');
const fs = require('fs');
const fetch = require('node-fetch');
require('dotenv').config();
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_SECRET;

async function authorize() {
  let myHeaders = new fetch.Headers();
  myHeaders.append(
    'Authorization',
    `Basic ${btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)}`
  );
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  var urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  let res = await fetch(
    'https://accounts.spotify.com/api/token',
    requestOptions
  );
  res = await res.json();
  return res.access_token;
}

async function getAlbum(artist, title) {
  const token = await authorize();
  const artistURL = getArtistURL(artist);
  const titleURL = getTitleURL(title);
  const spotifyURL = `https://api.spotify.com/v1/search?q=${titleURL}&type=album&${artistURL}&type=artist&limit=1&market=US&access_token=${token}`;
  const response = await fetch(spotifyURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res = await response.json();
  return res.albums.items;
}

function getArtistURL(artist) {
  let url = artist.split(' ');
  url = url.join('+');
  return url;
}

function getTitleURL(title) {
  let url = title.split(' ');
  url = url.join('+');
  return url;
}

async function outputJSON() {
  let objList = [];
  for (let i=0; i<21;i++) {
    let albumItem = await getAlbum(seedData[i].artist, seedData[i].title);
    let newObj = {
        ...seedData[i],
        spotifyId: albumItem[0].id,
        uri: albumItem[0].uri,
        image: albumItem[0].images[1].url,
    }
    objList.push(newObj);
  }
  console.log(objList);
}
outputJSON();
