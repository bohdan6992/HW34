const request = require('request');
const fs = require('fs');
const http = require("http");
const { Console } = require('console');
const moment = require('moment');
const URL = 'https://auto.ria.com/uk/legkovie/tesla/?page=1';
const tempArrHTML = [];
const tempArrCSV = [];
let str = ''
let strCSV = ''
let strHTML = ''

const getHTML = (HTMLBody) =>{
  const start = HTMLBody.indexOf('<section class="ticket-item');
  const end = HTMLBody.indexOf('<script type="text/basis-template" data-device="desktop"');
  for(let i = start; i < end; i++){
    str =`${str}${HTMLBody[i]}`;
  };
};

const splitStringAndGetDataAndCreateTables = (stringToSplit, separator) => {
  const arrayOfStrings = stringToSplit.trim().split(separator);

  arrayOfStrings.forEach((element) => {
    let model = element.split('<span class="blue bold">').pop().split('</span>')
    let priseUSD = element.split('data-currency="USD">').pop().split('</span>')
    let priseUAH = element.split('<span data-currency="UAH">').pop().split('</span>')
    let year = element.split('data-year="').pop().split('" data-expire-date')

    const tempCarObj = {
      model: model[0],
      priseUSD: priseUSD[0],
      priseUAH: priseUAH[0],
      year: year[0]
    };
    tempArrCSV.push(tempCarObj)
    tempArrHTML.push(tempCarObj)
  });

  tempArrCSV.forEach((item) => {
    strCSV = `${strCSV}${item.model}${item.year}${item.priseUSD}${item.priseUAH}\n`
  });

  tempArrHTML.forEach((item) => {
    strHTML = `${strHTML}<tr><td>${item.model}</td><td>${item.year}</td><td>${item.priseUSD}</td><td>${item.priseUAH}</td></tr>\n`
  }); 
};

const generateFileName = () =>{
  return `./product/products_${moment().format('YYYY-MM-DD-hhmmss')}.csv`;
}

request(URL, (error, response, body) => {
  if (error) throw error; // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  getHTML(body);
  var space = '<div class="hide debug1504 searchItem_v4"';
  splitStringAndGetDataAndCreateTables(str, space);
});

const server = http.createServer((req, res) => {
  if (req.url === '/tesla'){
    res.setHeader('Content-Type', 'text/html');
    res.write(`<a href='/tesla'>Uodate table</a>`)
    const fileName = generateFileName();
    fs.writeFileSync(fileName, strCSV);
    res.write(`
    <!DOCTYPE HTML>
    <html>
     <head>
      <meta charset="utf-8">
      <title>Tesla</title>
     </head>
     <body>
      <table border="1">
       <caption>Tesla vehicles</caption>
       <tr>
        <th>Model</th>
        <th>Year</th>
        <th>Price (USD)</th>
        <th>Price (UAH)</th>
       </tr>
       ${strHTML}
      </table>
     </body>
    </html>`);
    res.write(`<a href='${fileName}' download>Download table</a>`)
  };
  res.end();
});

server.listen(3000, () => {
  console.log('Server listen >>>>>>  3000')
});