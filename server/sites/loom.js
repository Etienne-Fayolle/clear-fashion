const axios = require('axios');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data, {'xmlMode': true});

  return $('.product-grid__item')
    .map((i, element) => {
      const link = `https://www.loom.fr${$(element)
        .find('.product-title a')
        .attr('href')}`;

      return {
        link,
        'brand': 'loom',
        'price': parseInt(
          $(element)
            .find('.money')
            .text()
        ),
        'name': $(element)
          .find('.product-title')
          .text()
          .trim()
          .replace(/\s/g, ' '),
        'photo': $(element)
          .find('noscript img.product_card__image')
          .attr('src'),
        '_id': uuidv5(link, uuidv5.URL)
      };
    })
    .get();
};

module.exports.scrape = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};
