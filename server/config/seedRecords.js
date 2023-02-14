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
  return res.albums.items[0];
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

function randomPrice() {
  let r = Math.random()*25;
  r = Math.round(r*100)/100;
  return r;
}

function randomComment() {
  const comments = ['Mint', 'Good', 'Poor', 'Very Poor', 'Very Good'];
  const random = Math.floor(Math.random()*5);
  return comments[random];
}

async function outputJSON() {
  let objList = [];
  for (let i = 0; i < 100; i++) {
    if (i===59) {
      continue;
    }
    let albumItem = await getAlbum(seedData[i].artist, seedData[i].title);
    // Can create a new object with the new title
    let newObj = {
      'artist': albumItem.artists[0].name,
      'albumTitle': albumItem.name,
      'imageUrl': albumItem.images[1].url,
      'price': randomPrice(),
      'dateListed': albumItem.release_date,
      'totalTracks': albumItem.total_tracks,
      'spotifyId': albumItem.id,
      'spotifyUri': albumItem.uri,
      'comments': randomComment(),
      'quantity': Math.floor(Math.random()*10)
    };
    objList.push(newObj);
  }
  return objList;
}

async function writeJSON() {
  const objList = await outputJSON();
  const data = JSON.stringify(objList);
  fs.writeFileSync('dataSeed.json', data);
}

writeJSON();
