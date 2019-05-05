import requests
from requests.auth import HTTPBasicAuth
url = "https://sandbox.api.visa.com/merchantsearch/v1/search"
payload  = "{\n    \"searchAttrList\": {\n        \"merchantName\": \"STARBUCKS\",\n        \"merchantCity\": \"SAN FRANCISCO\",\n        \"merchantState\": \"CA\",\n        \"merchantPostalCode\": \"94127\",\n        \"merchantCountryCode\": \"840\"\n    },\n    \"responseAttrList\": [\n        \"GNSTANDARD\"\n    ],\n    \"searchOptions\": {\n        \"wildCard\": [\n            \"merchantName\"\n        ],\n        \"maxRecords\": \"5\",\n        \"matchIndicators\": \"true\",\n        \"matchScore\": \"true\",\n        \"proximity\": [\n            \"merchantName\"\n        ]\n    },\n    \"header\": {\n        \"requestMessageId\": \"Request_001\",\n        \"startIndex\": \"0\",\n        \"messageDateTime\": \"2019-05-04T15:27:39.903\"\n    }\n}"
autho = 'https://api.github.com/user'

headers = {
 'Accept': "application/json",
 'Content-Type': "application/json"
 }
response = requests.request("POST", url, data=payload, headers=headers, auth=HTTPBasicAuth('userid', 'password'),
 verify = '/Users/jaydesai/Desktop/nsbwcerts/merchapi/DigiCertGlobalRootCA.pem', #Replace
 cert = ('/Users/jaydesai/Desktop/nsbwcerts/merchapi/cert.pem',   '/Users/jaydesai/Desktop/nsbwcerts/merchapi/key_4bdd731a-6778-4755-9e0e-8d9a95d65412.pem')) #Replace
print(response.text)