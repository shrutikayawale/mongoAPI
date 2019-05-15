let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./db');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => response.sendFile(path.resolve(__dirname + '/index.html')));

//Route to get all products list 
app.get('/getProducts', (request, response) => {
    (Object.keys(request.query).length > 0) ? query = {"name": {"$regex": request.query.name, "$options": "i"}} : query = {};
    
    db.mongoGetUsers(query, 'products')
            .then(result => {
                response.send(200, result);
            })
            .catch(error => {
                response.send(200, `Error`);
            })
});

/*route to get products based on product id
e.g. https://domain-name/1414/getProducts/5cdbb9a552ba6ba2fafd8155?name=iphone
https://domain-name/1414/getProducts/5cdbb9a552ba6ba2fafd8155
**/
app.get('/getProducts/:id', (request, response) => {
    let prodId = request.params.id;
    (Object.keys(request.query).length > 0) ? 
    query = { "prodId" : prodId , "desc": {"$regex": request.query.name, "$options": "i"}} : 
    query = { "prodId" : prodId };
    db.mongoGetDetails(prodId, query)
            .then(result => {
                response.send(200,result);
            })
            .catch(error => {
                response.send(200, `Error`);
            })
});

(init = () => {
    app.listen(1414, () => {
        console.log(`server started on 1414`);
    });
})();


