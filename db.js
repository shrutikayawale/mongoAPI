//We can utilized Mongo using "Mongoose" or "MongoDb" modules

//Using MongoDb
let mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;
let mongoDbUrl = 'mongodb://localhost:27017';

//This function is used to get all details for the products
async function mongoGetUsers (query, collection) {
    let client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
        let db = client.db('homesite');
        try {
            const res = await db.collection(collection).find(query).toArray();
            return res;
        }
        catch (err) {
            client.close();
        }
};

async function mongoGetDetails (id, query) {
    let client = await MongoClient.connect(mongoDbUrl, { useNewUrlParser: true });
        let db = client.db('homesite');
        let data = {};
        try {
            const res1 = await db.collection('products').findOne({_id: new mongodb.ObjectID(id)});

            const res2 = await db.collection('productInfo').find(query).toArray();
                        
            data.product = res1;
            data.prod_variations = res2;
            console.log('data',data)
            return data;
        }
        catch (err) {
            client.close();
        }
};

module.exports = { mongoGetUsers, mongoGetDetails };