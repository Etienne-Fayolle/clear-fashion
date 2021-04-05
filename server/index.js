const parseDomain = require('parse-domain');
const sources = require('require-all')(`${__dirname}/sources`);

module.exports = async link => {
  const {'domain': source} = parseDomain(link);
  const products = await sources[source].scrape(link);

  return products;
};

const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://dbScrapping:gKSWIaTNMj9szltH@cluster0.4acwf.mongodb.net/myFirstDatabase';
const MONGODB_DB_NAME = 'clearfashion';

const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
const db =  client.db(MONGODB_DB_NAME)

const products = [];

const collection = db.collection('products');
const result = collection.insertMany(products);

console.log(result);