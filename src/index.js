import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing styles
import './index.css';

// Importing components
import App from './App';

// Making a blank request
const requestURL = "https://gist.githubusercontent.com/patrickvaler/9a408a5b72090cc915ff773979fea88d/raw/0ca62983129d53abef7f5b44e1fbc5cd0506ae8f/emoji-data-list.json"
const request = new XMLHttpRequest()
request.responseType = "json"


function transferStarted() {
  console.log('The transfer is started.')
}

function transferFailed() {
  console.log('An error was occured while transferring the file.')
}

function transferCanceled() {
  console.log('The transfer has been cancelled by the user.')
}

function transferComplete() {
  console.log('The transfer is complete.')
}

// Adding event listeners to the request
request.addEventListener('loadstart', transferStarted)
request.addEventListener('error', transferFailed)
request.addEventListener('abort', transferCanceled)
request.addEventListener('load', transferComplete)

// Sending the request
request.open('GET', requestURL)
request.send()

// Grabbing JSON
let emojis = {}
request.onload = (attr) => {
  emojis = request.response
  
  // Renderring the root
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <App emojis={emojis}/>
  );
}





