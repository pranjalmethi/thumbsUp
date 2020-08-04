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
----------------------

For Login:<br />
----------
curl --location --request POST 'http://localhost:8080/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "1",
    "password": "2"
}'

For generating Thumbnail:<br />
-------------------------
curl --location --request GET 'http://localhost:8080/thumbnail?uri=https://cdn.fileinfo.com/img/ss/lg/jpg_44.jpg' \
--header 'authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTY1NDEwODQsImV4cCI6MTU5NjU1OTA4NH0.TDsLldTvAMRl1yJRqBNO36o5BvlOUBI9R72OETEppD8' \

For generating jsonPatch:<br />
-------------------------
curl --location --request GET 'http://localhost:8080/jsonPatch' \
--header 'authToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1OTY1NDEwODQsImV4cCI6MTU5NjU1OTA4NH0.TDsLldTvAMRl1yJRqBNO36o5BvlOUBI9R72OETEppD8' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonObject": {
        "baz": "qux",
        "foo": "bar"
    },
    "jsonPatch": {
        "op": "replace",
        "path": "/baz",
        "value": "boo"
    }
}'
