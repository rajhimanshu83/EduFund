const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const StockHistory = require('./models/StockHistories');
const Stock = require('./models/Stock');
const mongoose = require('mongoose');
const moment = require('moment');
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db,{ useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));
// let url = "mongodb://username:password@localhost:27017/";

const stockCompanies = [
    {companyname:"Agilent Technologies, Inc",symbol:"A"},
    {companyname:"ATA Creativity Global",symbol:"AACG"},
    {companyname:"American Airlines Group, Inc",symbol:"AAL"},
    {companyname:"Altisource Asset Management Corp",symbol:"AAMC"},
    {companyname:"Acer Therapeutics Inc",symbol:"ACER"},

]
csvtojson()
  .fromFile("ACER.csv")
  .then(csvData => {
    // console.log(csvData);
    // console.log(moment("2000-10-06").format());
    // stockCompanies.map(company => {
    //     const newCompany = new Stock({
    //         companyname: company.companyname,
    //         symbol: company.symbol
    //     });
    //     newCompany
    //               .save()
    //               .then((com) => console.log(`${com.companyname} created`))
    //               .catch((err) => console.log(err));
    // })
    // csvData.map(history => {
    //     const newHistory = new StockHistory({
    //         date: moment(history.Date).format(),
    //         volume: history.Volume,
    //         open: history.Open,
    //         close: history.Close,
    //         high: history.High,
    //         low: history.Low,
    //         adjustedClosePrice: history['Adj Close'],
    //         symbol: "ACER"
    //     });
    //     newHistory
    //               .save()
    //               .then((history) => console.log(`ACER created`))
    //               .catch((err) => console.log(err));
    // })
    // StockHistory.deleteMany({symbol:"AAL"}).then(function(){ 
    //     console.log("Data deleted"); // Success 
    // }).catch(function(error){ 
    //     console.log(error); // Failure 
    // });
    
    
  });