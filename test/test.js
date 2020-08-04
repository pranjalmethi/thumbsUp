var assert   = require("assert");
let chai     = require("chai");
let chaiHttp = require("chai-http");
let server   = "http://localhost:8080";
let expect   = chai.expect;
chai.use(chaiHttp);

describe ("API Calls", function(){

    var authToken = '';

    // LOGIN
    before("Should fetch auth token",  (done) => {
         chai.request(server)
            .post("/login")            
            .send({ "username": 'pranjal', "password": 'test123' })
            .end((err, res) => {
                authToken=res.body.authToken;
                expect(res).to.have.status(200);
                done()
            })        
    })

    // FETCH THUMBNAIL
    it ("Should fetch thumbnail of the image used in url", (done)=>{
        var result= chai.request(server)
            .get("/thumbnail")
            .set('authToken', authToken)
            .query({uri: 'https://static.wixstatic.com/media/177d37_d8c2218580d345d4a41e786cc4c2b679~mv2.png/v1/fill/w_481,h_464,al_c,q_85,usm_0.66_1.00_0.01/kard%20fan.webp'})
            .end((err,res)=>{
                expect(res).to.have.status(200)
                expect(res).to.have.header('Content-Type','image/jpeg')
                done()
            })
    })

    // PATCH JSON
    it ("Should patch the JSON", (done)=>{
        var jsonObj={
            "baz": "qux",
            "foo": "bar"
          };
        var jsonPatchObj={ "op": "replace", "path": "/baz", "value": "boo" };
        chai.request(server)
            .get("/jsonPatch")
            .set('authToken', authToken)
            .send({jsonObject:jsonObj,jsonPatch:jsonPatchObj})
            .end((err, res)=>{                    
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body).to.eql({baz: 'boo', foo: 'bar' })
                done()
            })
    })
})