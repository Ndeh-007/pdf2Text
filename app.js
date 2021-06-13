const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); 
const http = require('http'); 


const app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//create engine
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// get request definition
// returns the text extracted from the pdf file
app.get('/', (req, res) => {
  let fs = require('fs');
  var request = require('request');
  let PDFParser = require("pdf2json");
  let pdfParser = new PDFParser(this, 1);
  let value = '';
  var pdfUrl = req.query.pdfURL;

  pdfParser.on("pdfParser_dataError", errData => {res.send({err: errData.parserError});console.error(errData.parserError)});
  pdfParser.on("pdfParser_dataReady", pdfData => { 
    value = pdfParser.getRawTextContent();
    console.log(value)
    res.send("Reading...")
    res.send({value})
  });
  request({ url: pdfUrl, encoding: null }, (error, response, body) => pdfParser.parseBuffer(body));

  console.log(req.query)
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  let fs = require('fs');
  var request = require('request');
  let PDFParser = require("pdf2json");
  let pdfParser = new PDFParser(this, 1);
  let value = '';
  var pdfUrl = req.query.pdfURL;

  pdfParser.on("pdfParser_dataError", errData => {res.send({err: errData.parserError});console.error(errData.parserError)});
  pdfParser.on("pdfParser_dataReady", pdfData => { 
    value = pdfParser.getRawTextContent();
    console.log(value)
    res.send("Reading...")
    res.send({value})
  });
  request({ url: pdfUrl, encoding: null }, (error, response, body) => pdfParser.parseBuffer(body));

  console.log(req.query)
})


app.post('/', (req, res) => {
  console.log(req.query)
  res.send(req.query)
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
