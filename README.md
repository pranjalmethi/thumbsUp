# thumbsUp

To install dependencies run - npm install
To start server run - nodemon start
Default port - 8080

API's:
-------
1) Method: POST path:/login <br />
   Request Body:<br />
   {<br />
    "username": string<br />
    "password": string<br />
   }<br />
   Response Schema:<br />
   Code:200<br />
   Body:<br />
   {<br />
    "username":string<br />
    "authToken":string<br />
   }<br />
   <br />
2) Method: GET path:/thumbnail<br />
   params: uri (valid url string of the image)<br />
   Header: authToken(your JWT Key)<br />
   <br />
   Response:<br />
   Code: 200<br />
   Content-Type: image/jpeg<br />
   Body: binary stream<br />
   <br />
3) Method: GET path:/jsonPatch<br />
   Header: authToken(your JWT Key)<br />
   Body: {jsonObject:your JSON object, jsonPatch: your patch string object}<br />
   <br />
   Response:<br />
   Code:200<br />
   Body:{your patched object}<br />
   <br />
   <br />
Working curl requests:<br />
----------------------<br />
For Login:<br />
----------<br />
curl --location --request POST 'http://localhost:8080/login' \<br />
--header 'Content-Type: application/json' \<br />
--data-raw '{<br />
    "username": "1",<br />
    "password": "2"<br />
}'<br />

For generating Thumbnail:<br />
-------------------------
curl --location --request GET 'http://localhost:8080/thumbnail?uri=https://cdn.fileinfo.com/img/ss/lg/jpg_44.jpg' \<br />
--header 'authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTY1NDEwODQsImV4cCI6MTU5NjU1OTA4NH0.TDsLldTvAMRl1yJRqBNO36o5BvlOUBI9R72OETEppD8' \<br />
<br />
For generating jsonPatch:<br />
-------------------------<br />
curl --location --request GET 'http://localhost:8080/jsonPatch' \<br />
--header 'authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTY1NDEwODQsImV4cCI6MTU5NjU1OTA4NH0.TDsLldTvAMRl1yJRqBNO36o5BvlOUBI9R72OETEppD8' \<br />
--header 'Content-Type: application/json' \<br />
--data-raw '{<br />
    "jsonObject": {<br />
        "baz": "qux",<br />
        "foo": "bar"<br />
    },<br />
    "jsonPatch": {<br />
        "op": "replace",<br />
        "path": "/baz",<br />
        "value": "boo"<br />
    }<br />
}'<br />
