var authorizeNetApi = require("./authorize-net");
var visaApi = require("./visa").merchant_search_api;
var authCredentials = require('./credentials.json');
const http = require('http');
var customerProfileId;
var customerProfileJson;
const port=process.env.PORT || 3000;

// authorizeNetApi.createCustomerProfile(function(response){
// 	this.customerProfileId = response.getCustomerProfileId();
// 	this.customerProfileJson = authorizeNetApi.getCustomerProfile(this.customerProfileId, function(){});
// });



// import { MerchantSearch } from 'visa-sdk';
 
// const credentials = {
//     userId: "M1HP85WZ75OTCLVMW28221bG6oj8OoHdecdxXfVZVDrDrhd90",
//     password: "LDcP9O3F4AE8M4C7A1gV4feK8ezl7hu1",
//     certificate_passphrase: process.env.CERTIFICATE_PASSPHRASE,
//     certificate_file_path: process.env.CERTIFICATE_FILE
// };
 
// const query: MerchantSearch.Query = {
//     searchAttrList: {
//         merchantName: "STARBUCKS",
//         merchantCity: "SAN FRANCISCO",
//         merchantState: "CA",
//         merchantPostalCode: 94127,
//         merchantCountryCode: 840
//     },
//     responseAttrList: [
//         "GNSTANDARD"
//     ],
//     searchOptions: {
//         wildCard: [
//             "merchantName"
//         ],
//         maxRecords: 5,
//         matchIndicators: true,
//         matchScore: true,
//         proximity: [
//             "merchantName"
//         ]
//     },
//     header: {
//         requestMessageId: "Request_001",
//         startIndex: 0,
//         messageDateTime: "2019-05-04T20:17:52.903"
//     }
// };
// merchantSearch.search(query).then(({ body, response }) => {
//     console.log(response.statusCode)
//     console.log(body.merchantSearchServiceResponse.response)
// });

var visa = new visaApi(authCredentials);

// path invoked is '/merchantsearch/v1/search';
visa.merchantSearch(getParameters())
    .then(function(result) {
        // Put your custom logic here
        console.log('\n Response: ' + JSON.stringify(result.response));
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

function getParameters() {
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
            "merchantPostalCode": "94127",
            "merchantCity": "SAN FRANCISCO",
            "merchantState": "CA",
            "merchantName": "STARBUCKS",
            "merchantCountryCode": "840"
        }
    };

    return parameters;
}



const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end(''+customerProfileJson);
});
server.listen(port,() => {
console.log('Server running at port '+port);
});

