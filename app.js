var authorizeNetApi = require("./authorize-net");
var visaApi = require("./visa").merchant_search_api;
var authCredentials = require('./credentials.json');
const http = require('http');
var customerProfileId;
var customerProfileJson;
const port=process.env.PORT || 3000;


var visa = new visaApi(authCredentials);
var express = require('express');
var app = express();

// authorizeNetApi.createCustomerProfile(function(response){
//  this.customerProfileId = response.getCustomerProfileId();
//  this.customerProfileJson = authorizeNetApi.getCustomerProfile(this.customerProfileId, function(){});
// });


app.get('/merchant-search', function (req, res) {
    // req.params = {"merchantName":"STARBUCKS","zipCode":"94127"};
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.send("Hello World");
    var merchantData;
    visa.merchantSearch(getParameters(req.params))
    .then(function(result) {
        // Put your custom logic here
        console.log('\n Response: ' + JSON.stringify(result.response));
        res.send(JSON.stringify(result.response));
        console.log('\n Response Status: ' + JSON.stringify(result.response.statusCode));
        console.log('\n--------------- Above product is Merchant Search ---------------');
        console.log('\n--------------- API is Merchant Search Api ---------------');
        console.log('\n--------------- EndPoint is merchantSearch ---------------');
        console.log('\n\n');
    })
    .catch(function(error) {
        console.log('\n Response: ' + JSON.stringify(error.response));
        console.log('\n Response Status: ' + JSON.stringify(error.response.statusCode));
        console.log('\n--------------- Above product is Merchant Search ---------------');
        console.log('\n--------------- API is Merchant Search Api ---------------');
        console.log('\n--------------- EndPoint is merchantSearch ---------------');
        console.log('\n\n');
    });

function sendResponse(result){

}
function getParameters(params) {
    var parameters = {
        // "x-client-transaction-id": "{enter appropriate value}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    parameters.payload = {
        "responseAttrList": ["GNSTANDARD"],
        "header": {
            "messageDateTime": "2016-05-02T02:33:55.903",
            "startIndex": "0",
            "requestMessageId": "Request_001"
        },
        "searchOptions": {
            "matchScore": "true",
            // "proximity": ["merchantName"],
            // "wildCard": ["merchantName"],
            "maxRecords": "5",
            "matchIndicators": "true"
        },
        "searchAttrList": {
            "merchantPostalCode": params.zipCode,
            "merchantCity": "SAN FRANCISCO",
            "merchantState": "CA",
            "merchantName": params.merchantName,
            "merchantCountryCode": "840"
        }
    };

    return parameters;
}


    // res.end(''+customerProfileJson);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Content-Type', 'text/html');

//     visa.merchantSearch(getParameters())
//     .then(function(result) {
//         // Put your custom logic here
//         console.log('\n Response: ' + JSON.stringify(result.response));
//         console.log('\n Response Status: ' + JSON.stringify(result.response.statusCode));
//         console.log('\n--------------- Above product is Merchant Search ---------------');
//         console.log('\n--------------- API is Merchant Search Api ---------------');
//         console.log('\n--------------- EndPoint is merchantSearch ---------------');
//         console.log('\n\n');
//     })
//     .catch(function(error) {
//         console.log('\n Response: ' + JSON.stringify(error.response));
//         console.log('\n Response Status: ' + JSON.stringify(error.response.statusCode));
//         console.log('\n--------------- Above product is Merchant Search ---------------');
//         console.log('\n--------------- API is Merchant Search Api ---------------');
//         console.log('\n--------------- EndPoint is merchantSearch ---------------');
//         console.log('\n\n');
//     });

// function getParameters() {
//     var parameters = {
//         // "x-client-transaction-id": "{enter appropriate value}",
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//     };
//     parameters.payload = {
//         "responseAttrList": ["GNSTANDARD"],
//         "header": {
//             "messageDateTime": "2016-05-02T02:33:55.903",
//             "startIndex": "0",
//             "requestMessageId": "Request_001"
//         },
//         "searchOptions": {
//             "matchScore": "true",
//             // "proximity": ["merchantName"],
//             // "wildCard": ["merchantName"],
//             "maxRecords": "5",
//             "matchIndicators": "true"
//         },
//         "searchAttrList": {
//             "merchantPostalCode": "94127",
//             "merchantCity": "SAN FRANCISCO",
//             "merchantState": "CA",
//             "merchantName": "STARBUCKS",
//             "merchantCountryCode": "840"
//         }
//     };

//     return parameters;
// }

// 	res.end(''+customerProfileJson);
// });
// server.listen(port,() => {
// console.log('Server running at port '+port);
// });

