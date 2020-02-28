'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;
const { handleTodosPage, handleData, handleremoveData } = require('./data/handlers');
const { stock, customers } = require('./data/promo');
let userInput = {};
let app = express();

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
    app.use(morgan('tiny'))
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: false }))
    app.set('view engine', 'ejs')
    



const handleOrder = (req, res) => {
    let status;
    // user input
    let address = req.body.address;
    let country = req.body.country;
    let province = req.body.province;
    let givenName = req.body.givenName;
    let surname = req.body.surname;
    let item = req.body.order;
    let shirtSize = req.body.size;
    //order Object (GLOBAL)
    userInput.item = item;
    userInput.givenName = givenName;
    userInput.surname = surname;
    userInput.address = address;
    userInput.country = country;
    userInput.province = province;
    userInput.shirtSize = shirtSize;
    // Stock
    let socks = stock.socks;
    let bottles = stock.bottles;
    let smShirts = stock.shirt.small
    let mdShirts = stock.shirt.medium
    let lgShirts = stock.shirt.medium
    
    customers.forEach(customer => {
        if (customer.givenName === givenName || customer.address === address) {
            status = 505;
        } else {
            status = 400;
        }
    })
    if (country !== "Canada") {
        status = 650;
    } else if (shirtSize === "medium" && mdShirts === "0"
        || item === "socks" && socks === "0"
        || item === "bottles" && bottles === "0"
    ) {
        status = 450;
    }
    if (item === "undefined" || shirtSize === "undefined" && item === "shirt") {
        status = "000"
    }
    if (status === 505) {
        return res.json({ 'status': 'error', 'error': '550' });
    } else if (status === 450) {
        return res.json({ 'status': 'error', 'error': '450' });
    } else if (status === 650) {
        return res.json({ 'status': 'error', 'error': '650' });
    } else if (status === "000") {
        return res.json({ 'status': 'error', 'error': '000' });
    } else {
        return res.json({ 'status': 'success' });
    }
}
const handleSuccess = (req, res) => {
    res.render('pages/order-success', {
        // userInput: userInput
    })

}


    app.post('/order', handleOrder)
    app.get('/order-success', handleSuccess)


    app.get('/', handleTodosPage)
    app.post('/addItem', handleData)
    app.post('/removeItem', handleremoveData)
    app.get('*', (req, res) => {
        res.status(404);
        res.render('pages/fo-o-fo', {
            path: req.originalUrl,
        });
    })
    
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
