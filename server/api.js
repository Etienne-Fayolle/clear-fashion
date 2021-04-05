const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db/index');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products', async(request, response) => {
	let page = parseInt(request.query.page);
  let size = parseInt(request.query.size);
  let debut = parseInt((page-1)*size);

	const result = await db.find({});
	let prod =[];	
	try{
		if(page==null)
		{
			page=1;
		}
		if(size==null)
		{
			size=12;
		}
		for(i=debut; i< debut+size;i++){

			if(result[i] != null){
 				prod.push(result[i]);
 			}
 		}

		response.send({"page" :true,"success" :true, "data" : { "meta" :{"currentPage":page, "pageSize":size, "pageCount":prod.length, "count":result.length}, "result":prod}});
		//response.send({'a': prod});
	}catch(e){
		response.send(e);
	}
})




app.get('/products/search', async (request, response) => {
  let limit = request.query.limit;
  let brand = request.query.brand;
  let price = request.query.price;
  if(brand != null && price != null && limit != null)
  {
    limit = parseInt(limit);
    price = parseInt(price);
    const result = await db.find({'brand': brand, 'price': {$lt : price}}, limit);
    return response.send(result);
  }
  if(brand != null && price != null)
  {
    price = parseInt(price);
    const result = await db.find({'brand': brand, 'price': {$lt : price}}, 12);
    return response.send(result);
  }
  if(brand != null && limit != null)
  {
    limit = parseInt(limit);
    const result = await db.find({'brand': brand}, limit);
    return response.send(result);
  }
  if(price != null && limit != null)
  {
    limit = parseInt(limit);
    price = parseInt(price);
    const result = await db.find({'price': {$lt : price}}, limit);
    return response.send(result);
  }
  if(brand != null)
  {
    const result = await db.find({'brand': brand}, 12);
    return response.send(result);
  }
  if(price != null)
  {
    price = parseInt(price);
    const result = await db.find({'price': {$lt : price}}, 12);
    return response.send(result);
  }
  if(limit != null)
  {
    limit = parseInt(limit);
    const result = await db.find({}, limit);
    return response.send(result);
  }
  const result = await db.find();
  return response.send(result) 
});


app.get('/products/:id', async (request, response) => {
  console.log('/id')
  const result = await db.find({'_id': `${request.params.id}`});
  response.send(result);
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
