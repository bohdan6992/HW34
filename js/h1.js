const request = require('request');
const https = require('https')
const fs = require('fs');
const URL = 'https://auto.ria.com/uk/legkovie/tesla/?page=1'
let str = ''

const getHTML = (HTMLBody) =>{
  const start = HTMLBody.indexOf('<section class="ticket-item');
  const end = HTMLBody.indexOf('<script type="text/basis-template" data-device="desktop"');
  console.log(start, end);
  for(let i = start; i < end; i++){
    str =`${str}${HTMLBody[i]}`;
  };
  // console.log(str);
};

const splitString = (stringToSplit, separator) => {
  const arrayOfStrings = stringToSplit.trim().split(separator);

  arrayOfStrings.forEach((element) => {
    var model = element.split('<span class="blue bold">').pop().split('</span>')
    var priseUSD = element.split('data-currency="USD">').pop().split('</span>')
    var priseUAH = element.split('<span data-currency="UAH">').pop().split('</span>')
    var year = element.split('data-year="').pop().split('" data-expire-date')

    console.log(model[0])
    console.log(priseUSD[0])
    console.log(priseUAH[0])
    console.log(year[0])
  })
}


request(URL, (error, response, body) => {
  if (error) throw error; // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  getHTML(body);
  var space = '<div class="hide debug1504 searchItem_v4"';
  splitString(str, space);
});
