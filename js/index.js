const request = require('request');
const http = require("http");
const URL = 'https://auto.ria.com/uk/legkovie/tesla/?page=1';
let str = ''

const getHTML = (HTMLBody) =>{
  const start = HTMLBody.indexOf('<section class="ticket-item');
  const end = HTMLBody.indexOf('<script type="text/basis-template" data-device="desktop"');
  for(let i = start; i < end; i++){
    str =`${str}${HTMLBody[i]}`;
  };
};

const splitStringAndGetDAta = (stringToSplit, separator) => {
  const arrayOfStrings = stringToSplit.trim().split(separator);

  arrayOfStrings.forEach((element) => {
    let model = element.split('<span class="blue bold">').pop().split('</span>')
    let priseUSD = element.split('data-currency="USD">').pop().split('</span>')
    let priseUAH = element.split('<span data-currency="UAH">').pop().split('</span>')
    let year = element.split('data-year="').pop().split('" data-expire-date')

    console.log(model[0])
    console.log(priseUSD[0])
    console.log(priseUAH[0])
    console.log(year[0])
  });
};

const server = http.createServer((req, res) => {

  request(URL, (error, response, body) => {
    if (error) throw error; // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
    getHTML(body);
    var space = '<div class="hide debug1504 searchItem_v4"';
    plitStringAndGetDAta(str, space);

    res.setHeader("Content-Type", "text/html");
    res.end(`
    <!DOCTYPE HTML>
    <html>
     <head>
      <meta charset="utf-8">
      <title>Information about available Tesla vehicles</title>
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
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
       <tr><td>Model</td><td></td><td></td><td></td></tr>
      </table>
     </body>
    </html>`);
  });
});

server.listen(3000, () => {
  console.log('Server listen >>>>>>  3000')
});