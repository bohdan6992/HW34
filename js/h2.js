const request = require('request');
const https = require('https')
const fs = require('fs');
const URL = 'https://dou.ua'
let str = ''

const getHTML = (HTMLBody) =>{
  const start = HTMLBody.indexOf('Радимо почитати');
  const end = HTMLBody.indexOf('2005—2021');
  console.log(start, end);
  for(let i = start; i < end; i++){
    str =`${str}${HTMLBody[i]}`;
  };
};

const getAndPushImagesURL = () => {
  URLArr =[];
  reg = /src="([^"]*)/;
  for(let i = 1; i < 20; i=i+2){
    URLArr.push(str.split(reg)[i]);
  }
  console.log(URLArr);
};


request(URL, function (error, response, body) {
  if (error) throw error; // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  getHTML(body);
  getAndPushImagesURL();
  downloadAndSavePhotos();
});
