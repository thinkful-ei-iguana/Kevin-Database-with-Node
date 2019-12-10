require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function searchByName(searchTerm) {
  knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .first()
    .then(result => {
      console.log(result);
    });
}

searchByName('bacon');

function paginateTable(pageNumber) {
  const perPage = 6;
  const offset = perPage * (pageNumber -1);
  knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .limit(perPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

paginateTable(3);


function addedSince(daysAgo) {
  knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('date_added',
      '>', 
      knexInstance.raw('now() - \'?? days\'::INTERVAL', daysAgo))
    .then(result => {
      console.log(result);
    });
}

addedSince(2);

function totalCost() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

totalCost();